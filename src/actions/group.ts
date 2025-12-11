"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/config/db"
import { auth } from "@/auth"

/**
 * إنشاء مجموعة جديدة
 */
export async function createGroup(data: {
  name: string
  description?: string
  type: "family" | "friends" | "roommates"
}) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح" }
    }

    const group = await prisma.group.create({
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        createdById: session.user.id,
        members: {
          create: {
            userId: session.user.id,
            role: "admin",
            sharePercentage: 100,
          },
        },
      },
      include: {
        members: true,
      },
    })

    revalidatePath("/groups")
    return { success: true, group }
  } catch (error) {
    console.error("Error creating group:", error)
    return { success: false, error: "حدث خطأ أثناء إنشاء المجموعة" }
  }
}

/**
 * الحصول على مجموعات المستخدم
 */
export async function getUserGroups() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح", groups: [] }
    }

    const groupMembers = await prisma.groupMember.findMany({
      where: { userId: session.user.id },
      include: {
        group: {
          include: {
            members: true,
            _count: {
              select: {
                expenses: true,
                members: true,
              },
            },
          },
        },
      },
      orderBy: {
        joinedAt: "desc",
      },
    })

    const groups = groupMembers.map((gm) => gm.group)

    return { success: true, groups }
  } catch (error) {
    console.error("Error fetching groups:", error)
    return { success: false, error: "حدث خطأ", groups: [] }
  }
}

/**
 * إضافة عضو للمجموعة
 */
export async function addGroupMember(data: {
  groupId: string
  userId: string
  sharePercentage?: number
}) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح" }
    }

    // التحقق من أن المستخدم هو admin
    const membership = await prisma.groupMember.findFirst({
      where: {
        groupId: data.groupId,
        userId: session.user.id,
        role: "admin",
      },
    })

    if (!membership) {
      return { success: false, error: "ليس لديك صلاحية" }
    }

    const member = await prisma.groupMember.create({
      data: {
        groupId: data.groupId,
        userId: data.userId,
        sharePercentage: data.sharePercentage || 0,
      },
    })

    revalidatePath("/groups")
    return { success: true, member }
  } catch (error) {
    console.error("Error adding member:", error)
    return { success: false, error: "حدث خطأ أثناء إضافة العضو" }
  }
}

/**
 * إضافة مصروف للمجموعة
 */
export async function addGroupExpense(data: {
  groupId: string
  amount: number
  description?: string
  category?: string
  date?: Date
  splitType?: "equal" | "percentage" | "custom"
  splits?: { userId: string; amount: number }[]
}) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح" }
    }

    // التحقق من عضوية المستخدم
    const membership = await prisma.groupMember.findFirst({
      where: {
        groupId: data.groupId,
        userId: session.user.id,
      },
    })

    if (!membership) {
      return { success: false, error: "لست عضواً في هذه المجموعة" }
    }

    // الحصول على جميع أعضاء المجموعة
    const members = await prisma.groupMember.findMany({
      where: { groupId: data.groupId },
    })

    let splits = data.splits || []

    // إذا لم يتم تحديد التقسيم، نقسم بالتساوي
    if (splits.length === 0 && data.splitType === "equal") {
      const amountPerPerson = data.amount / members.length
      splits = members.map((m) => ({
        userId: m.userId,
        amount: amountPerPerson,
      }))
    }

    const expense = await prisma.groupExpense.create({
      data: {
        groupId: data.groupId,
        paidById: session.user.id,
        amount: data.amount,
        description: data.description,
        category: data.category,
        date: data.date || new Date(),
        splitType: data.splitType || "equal",
        splits: {
          create: splits.map((split) => ({
            userId: split.userId,
            amount: split.amount,
            paid: split.userId === session.user.id, // الدافع دفع نصيبه
          })),
        },
      },
      include: {
        splits: true,
      },
    })

    revalidatePath("/groups")
    return { success: true, expense }
  } catch (error) {
    console.error("Error adding group expense:", error)
    return { success: false, error: "حدث خطأ أثناء إضافة المصروف" }
  }
}

/**
 * الحصول على تقرير المجموعة
 */
export async function getGroupReport(groupId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح" }
    }

    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: true,
        expenses: {
          include: {
            splits: true,
          },
          orderBy: {
            date: "desc",
          },
        },
      },
    })

    if (!group) {
      return { success: false, error: "المجموعة غير موجودة" }
    }

    // حساب المديونيات
    const balances: Record<string, number> = {}
    
    group.members.forEach((member) => {
      balances[member.userId] = 0
    })

    group.expenses.forEach((expense) => {
      expense.splits.forEach((split) => {
        if (split.userId === expense.paidById) {
          // الدافع يستحق المبلغ من الآخرين
          balances[split.userId] = (balances[split.userId] || 0) + expense.amount - split.amount
        } else {
          // المدين يدين للدافع
          balances[split.userId] = (balances[split.userId] || 0) - split.amount
        }
      })
    })

    return { success: true, group, balances }
  } catch (error) {
    console.error("Error getting group report:", error)
    return { success: false, error: "حدث خطأ" }
  }
}

/**
 * تسوية المديونيات
 */
export async function settleDebt(data: {
  groupId: string
  toUserId: string
  amount: number
}) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح" }
    }

    const settlement = await prisma.settlement.create({
      data: {
        groupId: data.groupId,
        fromUserId: session.user.id,
        toUserId: data.toUserId,
        amount: data.amount,
        settled: true,
        settledAt: new Date(),
      },
    })

    revalidatePath("/groups")
    return { success: true, settlement }
  } catch (error) {
    console.error("Error settling debt:", error)
    return { success: false, error: "حدث خطأ أثناء التسوية" }
  }
}
