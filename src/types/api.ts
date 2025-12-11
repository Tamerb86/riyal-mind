import { Expense, Budget, Goal, Occasion, FamilyMember, FamilyInvite, Notification } from "@prisma/client"

/**
 * صيغة استجابة API العامة
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

/**
 * صيغة استجابة مع pagination
 */
export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    total: number
    offset: number
    limit: number
    hasMore: boolean
  }
  message?: string
}

/**
 * DTOs للمصاريف
 */
export interface ExpenseDTO extends Expense {
  categoryName?: string
}

export interface ExpenseWithStats {
  expenses: ExpenseDTO[]
  stats: {
    total: number
    count: number
    average: number
    byCategory: Record<string, number>
  }
}

/**
 * DTOs للميزانيات
 */
export interface BudgetDTO extends Budget {
  categoryName?: string
  spent?: number
  remaining?: number
  percentage?: number
  status?: "under" | "near" | "over"
}

export interface BudgetWithUsage extends Budget {
  spent: number
  remaining: number
  percentage: number
  status: "under" | "near" | "over"
}

/**
 * DTOs للأهداف
 */
export interface GoalDTO extends Goal {
  progress?: number
  remaining?: number
  daysLeft?: number
  status?: "on-track" | "at-risk" | "completed"
}

export interface GoalWithProgress extends Goal {
  progress: number
  remaining: number
  daysLeft: number | null
  status: "on-track" | "at-risk" | "completed"
}

/**
 * DTOs للمناسبات
 */
export interface OccasionDTO extends Occasion {
  remaining?: number
  percentage?: number
  daysUntil?: number
  status?: "upcoming" | "soon" | "today" | "passed"
}

export interface OccasionWithProgress extends Occasion {
  remaining: number
  percentage: number
  daysUntil: number
  status: "upcoming" | "soon" | "today" | "passed"
}

/**
 * DTOs للعائلة
 */
export interface FamilyMemberDTO extends FamilyMember {
  memberName?: string
  memberEmail?: string
  memberImage?: string
}

export interface FamilyInviteDTO extends FamilyInvite {
  inviterName?: string
  inviterEmail?: string
}

/**
 * DTOs للإشعارات
 */
export interface NotificationDTO extends Notification {
  timeAgo?: string
}

/**
 * DTOs للتحليلات والتقارير
 */
export interface MonthlyStats {
  month: string
  year: number
  totalIncome: number
  totalExpenses: number
  balance: number
  expensesByCategory: Record<string, number>
  topCategories: Array<{
    categoryId: string
    categoryName: string
    amount: number
    percentage: number
  }>
}

export interface AnalyticsData {
  summary: {
    totalExpenses: number
    totalBudget: number
    budgetUsed: number
    budgetRemaining: number
    savingsRate: number
  }
  trends: {
    last7Days: number
    last30Days: number
    lastMonth: number
    thisMonth: number
    growthRate: number
  }
  categories: Array<{
    categoryId: number
    categoryName: number | string
    amount: number
    budget: number
    percentage: number
    trend: "up" | "down" | "stable"
  }>
  goals: {
    total: number
    completed: number
    inProgress: number
    totalSaved: number
    totalTarget: number
  }
}

/**
 * أنواع الفلاتر
 */
export interface DateRangeFilter {
  startDate: string
  endDate: string
}

export interface CategoryFilter {
  categoryId: string
}

export interface PaginationParams {
  limit?: number
  offset?: number
}

export interface SortParams {
  sortBy?: string
  sortOrder?: "asc" | "desc"
}
