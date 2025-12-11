import { prisma } from "@/config/db"

type CategoryId = number

/**
 * حساب استخدام الميزانية
 */
export async function calculateBudgetUsage(
  userId: string,
  categoryId: CategoryId
): Promise<{
  budget: number
  spent: number
  remaining: number
  percentage: number
  status: "under" | "near" | "over"
}> {
  try {
    const budget = await prisma.budget.findUnique({
      where: {
        userId_categoryId: {
          userId,
          categoryId: categoryId as number,
        },
      },
    })

    if (!budget) {
      return { budget: 0, spent: 0, remaining: 0, percentage: 0, status: "under" }
    }

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const expenses = await prisma.expense.findMany({
      where: {
        userId,
        categoryId: categoryId as number,
        date: { gte: startOfMonth },
      },
    })

    const spent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const remaining = budget.monthlyAmount - spent
    const percentage = (spent / budget.monthlyAmount) * 100

    let status: "under" | "near" | "over" = "under"
    if (percentage >= 100) status = "over"
    else if (percentage >= 80) status = "near"

    return {
      budget: budget.monthlyAmount,
      spent,
      remaining,
      percentage: Math.round(percentage),
      status,
    }
  } catch (error) {
    console.error("Error calculating budget usage:", error)
    return { budget: 0, spent: 0, remaining: 0, percentage: 0, status: "under" }
  }
}

/**
 * حساب تقدم الهدف
 */
export async function calculateGoalProgress(
  userId: string,
  goalId: string
): Promise<{
  target: number
  current: number
  remaining: number
  percentage: number
  daysLeft: number | null
  status: "on-track" | "at-risk" | "completed"
}> {
  try {
    const goal = await prisma.goal.findUnique({
      where: { id: goalId },
    })

    if (!goal || goal.userId !== userId) {
      return {
        target: 0,
        current: 0,
        remaining: 0,
        percentage: 0,
        daysLeft: null,
        status: "on-track",
      }
    }

    const remaining = goal.targetAmount - goal.currentAmount
    const percentage = (goal.currentAmount / goal.targetAmount) * 100

    let daysLeft: number | null = null
    if (goal.deadline) {
      const now = new Date()
      const deadline = new Date(goal.deadline)
      daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    }

    let status: "on-track" | "at-risk" | "completed" = "on-track"
    if (percentage >= 100) status = "completed"
    else if (daysLeft !== null && daysLeft < 30 && percentage < 70) status = "at-risk"

    return {
      target: goal.targetAmount,
      current: goal.currentAmount,
      remaining,
      percentage: Math.round(percentage),
      daysLeft,
      status,
    }
  } catch (error) {
    console.error("Error calculating goal progress:", error)
    return {
      target: 0,
      current: 0,
      remaining: 0,
      percentage: 0,
      daysLeft: null,
      status: "on-track",
    }
  }
}

/**
 * حساب تقدم المناسبة
 */
export async function calculateOccasionProgress(
  userId: string,
  occasionId: string
): Promise<{
  budget: number
  spent: number
  remaining: number
  percentage: number
  daysUntil: number
  status: "upcoming" | "soon" | "today" | "passed"
}> {
  try {
    const occasion = await prisma.occasion.findUnique({
      where: { id: occasionId },
    })

    if (!occasion || occasion.userId !== userId) {
      return {
        budget: 0,
        spent: 0,
        remaining: 0,
        percentage: 0,
        daysUntil: 0,
        status: "upcoming",
      }
    }

    const budget = occasion.budget || 0
    const spent = occasion.spent
    const remaining = budget - spent
    const percentage = budget > 0 ? (spent / budget) * 100 : 0

    const now = new Date()
    const occasionDate = new Date(occasion.date)
    const daysUntil = Math.ceil((occasionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    let status: "upcoming" | "soon" | "today" | "passed" = "upcoming"
    if (daysUntil < 0) status = "passed"
    else if (daysUntil === 0) status = "today"
    else if (daysUntil <= 7) status = "soon"

    return {
      budget,
      spent,
      remaining,
      percentage: Math.round(percentage),
      daysUntil,
      status,
    }
  } catch (error) {
    console.error("Error calculating occasion progress:", error)
    return {
      budget: 0,
      spent: 0,
      remaining: 0,
      percentage: 0,
      daysUntil: 0,
      status: "upcoming",
    }
  }
}
