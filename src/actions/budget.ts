"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/config/db"
import { auth } from "@/auth"
import type { Budget } from "@prisma/client"

/**
 * الحصول على ميزانية بواسطة ID
 */
export async function getBudgetById(id: string): Promise<Budget | null> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error("غير مصرح")
    }

    const budget = await prisma.budget.findUnique({
      where: { id },
    })

    if (!budget || budget.userId !== session.user.id) {
      return null
    }

    return budget
  } catch (error) {
    console.error("Error fetching budget:", error)
    return null
  }
}

/**
 * الحصول على جميع ميزانيات المستخدم
 */
export async function getUserBudgets(userId: string): Promise<Budget[]> {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.id !== userId) {
      throw new Error("غير مصرح")
    }

    const budgets = await prisma.budget.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })

    return budgets
  } catch (error) {
    console.error("Error fetching budgets:", error)
    return []
  }
}

/**
 * إنشاء ميزانية جديدة
 */
export async function createBudget(data: {
  categoryId: number
  monthlyAmount: number
}): Promise<{ success: boolean; budget?: Budget; error?: string }> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح" }
    }

    // التحقق من عدم وجود ميزانية مسبقة لنفس الفئة
    const existingBudget = await prisma.budget.findUnique({
      where: {
        userId_categoryId: {
          userId: session.user.id,
          categoryId: data.categoryId,
        },
      },
    })

    if (existingBudget) {
      return { 
        success: false, 
        error: "يوجد ميزانية بالفعل لهذه الفئة" 
      }
    }

    const budget = await prisma.budget.create({
      data: {
        userId: session.user.id,
        categoryId: data.categoryId,
        monthlyAmount: data.monthlyAmount,
      },
    })

    revalidatePath("/budgets")
    revalidatePath("/dashboard")

    return { success: true, budget }
  } catch (error) {
    console.error("Error creating budget:", error)
    return { success: false, error: "حدث خطأ أثناء إضافة الميزانية" }
  }
}

/**
 * تحديث ميزانية
 */
export async function updateBudget(
  id: string,
  data: { monthlyAmount: number }
): Promise<{ success: boolean; budget?: Budget; error?: string }> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح" }
    }

    const existingBudget = await prisma.budget.findUnique({
      where: { id },
    })

    if (!existingBudget || existingBudget.userId !== session.user.id) {
      return { success: false, error: "الميزانية غير موجودة أو ليس لديك صلاحية" }
    }

    const budget = await prisma.budget.update({
      where: { id },
      data: { monthlyAmount: data.monthlyAmount },
    })

    revalidatePath("/budgets")
    revalidatePath("/dashboard")

    return { success: true, budget }
  } catch (error) {
    console.error("Error updating budget:", error)
    return { success: false, error: "حدث خطأ أثناء تحديث الميزانية" }
  }
}

/**
 * حذف ميزانية
 */
export async function deleteBudget(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح" }
    }

    const existingBudget = await prisma.budget.findUnique({
      where: { id },
    })

    if (!existingBudget || existingBudget.userId !== session.user.id) {
      return { success: false, error: "الميزانية غير موجودة أو ليس لديك صلاحية" }
    }

    await prisma.budget.delete({
      where: { id },
    })

    revalidatePath("/budgets")
    revalidatePath("/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Error deleting budget:", error)
    return { success: false, error: "حدث خطأ أثناء حذف الميزانية" }
  }
}
