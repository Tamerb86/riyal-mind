import { NextRequest } from "next/server"
import { prisma } from "@/config/db"
import { getAuthSession, handleApiError, successResponse } from "@/lib/api-utils"
import type { AnalyticsData } from "@/types/api"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// GET /api/analytics - الحصول على بيانات التحليلات الشاملة
export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession()
    const userId = session.user.id!

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59)
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // جلب جميع المصاريف
    const [
      thisMonthExpenses,
      lastMonthExpenses,
      last7DaysExpenses,
      last30DaysExpenses,
      allBudgets,
      allGoals,
    ] = await Promise.all([
      prisma.expense.findMany({
        where: { userId, date: { gte: startOfMonth } },
      }),
      prisma.expense.findMany({
        where: { userId, date: { gte: startOfLastMonth, lte: endOfLastMonth } },
      }),
      prisma.expense.findMany({
        where: { userId, date: { gte: last7Days } },
      }),
      prisma.expense.findMany({
        where: { userId, date: { gte: last30Days } },
      }),
      prisma.budget.findMany({ where: { userId } }),
      prisma.goal.findMany({ where: { userId } }),
    ])

    // حساب الإجماليات
    const totalExpensesThisMonth = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0)
    const totalExpensesLastMonth = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0)
    const totalExpensesLast7Days = last7DaysExpenses.reduce((sum, e) => sum + e.amount, 0)
    const totalExpensesLast30Days = last30DaysExpenses.reduce((sum, e) => sum + e.amount, 0)

    const totalBudget = allBudgets.reduce((sum, b) => sum + b.monthlyAmount, 0)
    const budgetUsed = totalExpensesThisMonth
    const budgetRemaining = totalBudget - budgetUsed
    const savingsRate = totalBudget > 0 ? ((budgetRemaining / totalBudget) * 100) : 0

    // معدل النمو
    const growthRate = totalExpensesLastMonth > 0
      ? ((totalExpensesThisMonth - totalExpensesLastMonth) / totalExpensesLastMonth) * 100
      : 0

    // المصاريف حسب الفئة
    const expensesByCategory: Record<number, { amount: number; count: number }> = {}
    thisMonthExpenses.forEach((expense) => {
      if (!expensesByCategory[expense.categoryId]) {
        expensesByCategory[expense.categoryId] = { amount: 0, count: 0 }
      }
      expensesByCategory[expense.categoryId]!.amount += expense.amount
      expensesByCategory[expense.categoryId]!.count += 1
    })

    // حساب الفئات مع الميزانيات والاتجاهات
    const categories = await Promise.all(
      Object.entries(expensesByCategory).map(async ([categoryIdStr, data]) => {
        const categoryId = parseInt(categoryIdStr)
        const budget = allBudgets.find((b) => b.categoryId === categoryId)
        const budgetAmount = budget?.monthlyAmount || 0
        const percentage = budgetAmount > 0 ? (data.amount / budgetAmount) * 100 : 0

        // حساب الاتجاه
        const lastMonthCategoryExpenses = lastMonthExpenses
          .filter((e) => e.categoryId === categoryId)
          .reduce((sum, e) => sum + e.amount, 0)

        let trend: "up" | "down" | "stable" = "stable"
        if (data.amount > lastMonthCategoryExpenses * 1.1) trend = "up"
        else if (data.amount < lastMonthCategoryExpenses * 0.9) trend = "down"

        return {
          categoryId,
          categoryName: categoryId, // يمكن إضافة اسم الفئة من categories.ts
          amount: data.amount,
          budget: budgetAmount,
          percentage: Math.round(percentage),
          trend,
        }
      })
    )

    // إحصائيات الأهداف
    const completedGoals = allGoals.filter((g) => g.currentAmount >= g.targetAmount)
    const inProgressGoals = allGoals.filter((g) => g.currentAmount < g.targetAmount)
    const totalSaved = allGoals.reduce((sum, g) => sum + g.currentAmount, 0)
    const totalTarget = allGoals.reduce((sum, g) => sum + g.targetAmount, 0)

    const analyticsData: AnalyticsData = {
      summary: {
        totalExpenses: totalExpensesThisMonth,
        totalBudget,
        budgetUsed,
        budgetRemaining,
        savingsRate: Math.round(savingsRate),
      },
      trends: {
        last7Days: totalExpensesLast7Days,
        last30Days: totalExpensesLast30Days,
        lastMonth: totalExpensesLastMonth,
        thisMonth: totalExpensesThisMonth,
        growthRate: Math.round(growthRate * 10) / 10,
      },
      categories: categories.sort((a, b) => b.amount - a.amount),
      goals: {
        total: allGoals.length,
        completed: completedGoals.length,
        inProgress: inProgressGoals.length,
        totalSaved,
        totalTarget,
      },
    }

    return successResponse(analyticsData)
  } catch (error) {
    return handleApiError(error)
  }
}
