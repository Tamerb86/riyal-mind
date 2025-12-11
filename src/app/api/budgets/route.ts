import { NextRequest } from "next/server"
import { prisma } from "@/config/db"
import { getAuthSession, handleApiError, successResponse } from "@/lib/api-utils"
import { createBudgetSchema, getBudgetsQuerySchema } from "@/validations/budget"

// GET /api/budgets - جلب جميع الميزانيات للمستخدم
export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession()
    const { searchParams } = new URL(req.url)
    
    const query = getBudgetsQuerySchema.parse({
      categoryId: searchParams.get("categoryId"),
    })

    const where: any = {
      userId: session.user.id,
    }

    if (query.categoryId) {
      where.categoryId = query.categoryId
    }

    const budgets = await prisma.budget.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    })

    // حساب المصروف لكل ميزانية
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const budgetsWithUsage = await Promise.all(
      budgets.map(async (budget) => {
        const expenses = await prisma.expense.findMany({
          where: {
            userId: session.user.id,
            categoryId: budget.categoryId,
            date: {
              gte: startOfMonth,
            },
          },
        })

        const spent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
        const remaining = budget.monthlyAmount - spent
        const percentage = (spent / budget.monthlyAmount) * 100

        let status: "under" | "near" | "over" = "under"
        if (percentage >= 100) status = "over"
        else if (percentage >= 80) status = "near"

        return {
          ...budget,
          spent,
          remaining,
          percentage: Math.round(percentage),
          status,
        }
      })
    )

    return successResponse(budgetsWithUsage)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/budgets - إضافة ميزانية جديدة
export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()
    const body = await req.json()
    const validatedData = createBudgetSchema.parse(body)

    // التحقق من عدم وجود ميزانية مسبقة لنفس الفئة
    const existingBudget = await prisma.budget.findUnique({
      where: {
        userId_categoryId: {
          userId: session.user.id!,
          categoryId: validatedData.categoryId,
        },
      },
    })

    if (existingBudget) {
      return successResponse(
        null,
        "يوجد ميزانية بالفعل لهذه الفئة. يرجى تحديثها بدلاً من إنشاء واحدة جديدة."
      )
    }

    const budget = await prisma.budget.create({
      data: {
        userId: session.user.id!,
        categoryId: validatedData.categoryId,
        monthlyAmount: validatedData.monthlyAmount,
      },
    })

    return successResponse(budget, "تم إضافة الميزانية بنجاح")
  } catch (error) {
    return handleApiError(error)
  }
}
