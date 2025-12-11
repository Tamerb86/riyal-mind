import { prisma } from "@/config/db"
import type { Expense } from "@prisma/client"

/**
 * الحصول على المصاريف حسب الفئة
 */
export async function getExpensesByCategory(
  userId: string,
  categoryId: number
): Promise<Expense[]> {
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        userId,
        categoryId,
      },
      orderBy: {
        date: "desc",
      },
    })

    return expenses
  } catch (error) {
    console.error("Error fetching expenses by category:", error)
    return []
  }
}

/**
 * الحصول على إجمالي المصاريف حسب الشهر
 */
export async function getTotalExpensesByMonth(
  userId: string,
  month: number,
  year: number
): Promise<number> {
  try {
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0, 23, 59, 59)

    const expenses = await prisma.expense.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    })

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    return total
  } catch (error) {
    console.error("Error calculating total expenses by month:", error)
    return 0
  }
}

/**
 * الحصول على إحصائيات المصاريف
 */
export async function getExpenseStats(userId: string): Promise<{
  total: number
  count: number
  average: number
  byCategory: Record<number, number>
  thisMonth: number
  lastMonth: number
  thisWeek: number
}> {
  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59)
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - 7)

    // جميع المصاريف
    const allExpenses = await prisma.expense.findMany({
      where: { userId },
    })

    const total = allExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const count = allExpenses.length
    const average = count > 0 ? total / count : 0

    // المصاريف حسب الفئة
    const byCategory: Record<number, number> = {}
    allExpenses.forEach((expense) => {
      byCategory[expense.categoryId] = (byCategory[expense.categoryId] ?? 0) + expense.amount
    })

    // هذا الشهر
    const thisMonthExpenses = await prisma.expense.findMany({
      where: {
        userId,
        date: {
          gte: startOfMonth,
        },
      },
    })
    const thisMonth = thisMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    )

    // الشهر الماضي
    const lastMonthExpenses = await prisma.expense.findMany({
      where: {
        userId,
        date: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
      },
    })
    const lastMonth = lastMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    )

    // هذا الأسبوع
    const thisWeekExpenses = await prisma.expense.findMany({
      where: {
        userId,
        date: {
          gte: startOfWeek,
        },
      },
    })
    const thisWeek = thisWeekExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    )

    return {
      total,
      count,
      average,
      byCategory,
      thisMonth,
      lastMonth,
      thisWeek,
    }
  } catch (error) {
    console.error("Error calculating expense stats:", error)
    return {
      total: 0,
      count: 0,
      average: 0,
      byCategory: {},
      thisMonth: 0,
      lastMonth: 0,
      thisWeek: 0,
    }
  }
}

/**
 * الحصول على أعلى الفئات إنفاقاً
 */
export async function getTopSpendingCategories(
  userId: string,
  limit: number = 5
): Promise<Array<{ categoryId: number; total: number; count: number }>> {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId },
    })

    const categoryTotals: Record<number, { total: number; count: number }> = {}

    expenses.forEach((expense) => {
      const current = categoryTotals[expense.categoryId] ?? { total: 0, count: 0 }
      categoryTotals[expense.categoryId] = {
        total: current.total + expense.amount,
        count: current.count + 1,
      }
    })

    const sorted = Object.entries(categoryTotals)
      .map(([categoryId, data]) => ({
        categoryId: Number(categoryId),
        total: data.total,
        count: data.count,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, limit)

    return sorted
  } catch (error) {
    console.error("Error fetching top spending categories:", error)
    return []
  }
}

/**
 * الحصول على اتجاه المصاريف (آخر 6 أشهر)
 */
export async function getExpenseTrend(
  userId: string
): Promise<Array<{ month: string; total: number }>> {
  try {
    const now = new Date()
    const months: Array<{ month: string; total: number }> = []

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59)

      const expenses = await prisma.expense.findMany({
        where: {
          userId,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      })

      const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

      months.push({
        month: date.toLocaleDateString("ar-SA", { month: "long", year: "numeric" }),
        total,
      })
    }

    return months
  } catch (error) {
    console.error("Error fetching expense trend:", error)
    return []
  }
}
