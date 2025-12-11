"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/config/db"
import { auth } from "@/auth"

/**
 * إضافة أو تحديث الدخل
 */
export async function upsertIncome(data: {
  amount: number
  source: string
  type: "primary" | "secondary"
  month?: string
}) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح" }
    }

    const month = data.month || new Date().toISOString().slice(0, 7) // YYYY-MM

    // البحث عن دخل موجود لنفس الشهر والمصدر
    const startOfMonth = new Date(month + '-01')
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0)
    
    const existingIncome = await prisma.income.findFirst({
      where: {
        userId: session.user.id,
        source: data.source,
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    })

    let income

    if (existingIncome) {
      // تحديث الدخل الموجود
      income = await prisma.income.update({
        where: { id: existingIncome.id },
        data: {
          amount: data.amount,
          type: data.type.toUpperCase() as "PRIMARY" | "SECONDARY",
        },
      })
    } else {
      // إنشاء دخل جديد
      income = await prisma.income.create({
        data: {
          userId: session.user.id,
          amount: data.amount,
          source: data.source,
          type: data.type.toUpperCase() as "PRIMARY" | "SECONDARY",
          date: startOfMonth,
        },
      })
    }

    revalidatePath("/dashboard")
    revalidatePath("/income")
    return { success: true, income }
  } catch (error) {
    console.error("Error upserting income:", error)
    return { success: false, error: "حدث خطأ أثناء حفظ الدخل" }
  }
}

/**
 * الحصول على إجمالي الدخل لشهر معين
 */
export async function getTotalIncome(month?: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح", total: 0 }
    }

    const targetMonth = month || new Date().toISOString().slice(0, 7)

    const startOfMonth = new Date(targetMonth + '-01')
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0)
    
    const incomes = await prisma.income.findMany({
      where: {
        userId: session.user.id,
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    })

    const total = incomes.reduce((sum, income) => sum + income.amount, 0)

    return { success: true, total, incomes }
  } catch (error) {
    console.error("Error getting total income:", error)
    return { success: false, error: "حدث خطأ", total: 0 }
  }
}

/**
 * حذف دخل
 */
export async function deleteIncome(id: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح" }
    }

    await prisma.income.delete({
      where: {
        id: id,
        userId: session.user.id,
      },
    })

    revalidatePath("/dashboard")
    revalidatePath("/income")
    return { success: true }
  } catch (error) {
    console.error("Error deleting income:", error)
    return { success: false, error: "حدث خطأ أثناء الحذف" }
  }
}
