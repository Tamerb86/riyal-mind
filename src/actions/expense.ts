"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/config/db"
import { auth } from "@/auth"
import type { Expense } from "@prisma/client"

/**
 * الحصول على مصروف بواسطة ID
 */
export async function getExpenseById(id: string): Promise<Expense | null> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error("غير مصرح")
    }

    const expense = await prisma.expense.findUnique({
      where: { id },
    })

    if (!expense || expense.userId !== session.user.id) {
      return null
    }

    return expense
  } catch (error) {
    console.error("Error fetching expense:", error)
    return null
  }
}

/**
 * الحصول على جميع مصاريف المستخدم
 */
export async function getUserExpenses(userId: string): Promise<Expense[]> {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.id !== userId) {
      throw new Error("غير مصرح")
    }

    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    })

    return expenses
  } catch (error) {
    console.error("Error fetching expenses:", error)
    return []
  }
}

/**
 * إنشاء مصروف جديد
 */
export async function createExpense(data: {
  categoryId: number
  amount: number
  description?: string
  date?: Date
  receipt?: string
  notes?: string
}): Promise<{ success: boolean; expense?: Expense; error?: string }> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح" }
    }

    const expense = await prisma.expense.create({
      data: {
        userId: session.user.id,
        categoryId: data.categoryId,
        amount: data.amount,
        description: data.description,
        date: data.date || new Date(),
        receipt: data.receipt,
        notes: data.notes,
      },
    })

    // إنشاء إشعار
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: "EXPENSE_ADDED",
        title: "تم إضافة مصروف جديد",
        description: `تم إضافة مصروف بقيمة ${data.amount} ريال`,
        data: { expenseId: expense.id },
      },
    })

    revalidatePath("/expenses-list")
    revalidatePath("/dashboard")
    revalidatePath("/analytics")

    return { success: true, expense }
  } catch (error) {
    console.error("Error creating expense:", error)
    return { success: false, error: "حدث خطأ أثناء إضافة المصروف" }
  }
}

/**
 * تحديث مصروف
 */
export async function updateExpense(
  id: string,
  data: Partial<{
    categoryId: number
    amount: number
    description: string
    date: Date
    receipt: string
    notes: string
  }>
): Promise<{ success: boolean; expense?: Expense; error?: string }> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح" }
    }

    // التحقق من الملكية
    const existingExpense = await prisma.expense.findUnique({
      where: { id },
    })

    if (!existingExpense || existingExpense.userId !== session.user.id) {
      return { success: false, error: "المصروف غير موجود أو ليس لديك صلاحية" }
    }

    const expense = await prisma.expense.update({
      where: { id },
      data,
    })

    revalidatePath("/expenses-list")
    revalidatePath("/dashboard")
    revalidatePath("/analytics")

    return { success: true, expense }
  } catch (error) {
    console.error("Error updating expense:", error)
    return { success: false, error: "حدث خطأ أثناء تحديث المصروف" }
  }
}

/**
 * حذف مصروف
 */
export async function deleteExpense(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "غير مصرح" }
    }

    // التحقق من الملكية
    const existingExpense = await prisma.expense.findUnique({
      where: { id },
    })

    if (!existingExpense || existingExpense.userId !== session.user.id) {
      return { success: false, error: "المصروف غير موجود أو ليس لديك صلاحية" }
    }

    await prisma.expense.delete({
      where: { id },
    })

    revalidatePath("/expenses-list")
    revalidatePath("/dashboard")
    revalidatePath("/analytics")

    return { success: true }
  } catch (error) {
    console.error("Error deleting expense:", error)
    return { success: false, error: "حدث خطأ أثناء حذف المصروف" }
  }
}
