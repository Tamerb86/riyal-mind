import { NextRequest } from "next/server"
import { prisma } from "@/config/db"
import { getAuthSession, handleApiError, successResponse, validateUserId, errorResponse } from "@/lib/api-utils"
import { updateBudgetSchema } from "@/validations/budget"

// GET /api/budgets/[id] - جلب ميزانية واحدة
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession()
    const budgetId = params.id

    const budget = await prisma.budget.findUnique({
      where: { id: budgetId },
    })

    if (!budget) {
      return errorResponse("الميزانية غير موجودة", 404)
    }

    validateUserId(session.user.id!, budget.userId)

    // حساب الاستخدام
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

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

    return successResponse({
      ...budget,
      spent,
      remaining,
      percentage: Math.round(percentage),
      status,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

// PUT /api/budgets/[id] - تحديث ميزانية
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession()
    const budgetId = params.id
    const body = await req.json()

    const existingBudget = await prisma.budget.findUnique({
      where: { id: budgetId },
    })

    if (!existingBudget) {
      return errorResponse("الميزانية غير موجودة", 404)
    }

    validateUserId(session.user.id!, existingBudget.userId)

    const validatedData = updateBudgetSchema.parse(body)

    const updatedBudget = await prisma.budget.update({
      where: { id: budgetId },
      data: {
        monthlyAmount: validatedData.monthlyAmount,
      },
    })

    // التحقق من تجاوز الميزانية وإنشاء تنبيه
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const expenses = await prisma.expense.findMany({
      where: {
        userId: session.user.id,
        categoryId: updatedBudget.categoryId,
        date: {
          gte: startOfMonth,
        },
      },
    })

    const spent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const percentage = (spent / updatedBudget.monthlyAmount) * 100

    if (percentage >= 80 && session.user.id) {
      await prisma.notification.create({
        data: {
          userId: session.user.id,
          type: "BUDGET_ALERT",
          title: percentage >= 100 ? "تجاوز الميزانية" : "اقتراب من تجاوز الميزانية",
          description: `لقد استخدمت ${Math.round(percentage)}% من ميزانية هذه الفئة`,
          data: { budgetId: updatedBudget.id, percentage },
        },
      })
    }

    return successResponse(updatedBudget, "تم تحديث الميزانية بنجاح")
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/budgets/[id] - حذف ميزانية
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession()
    const budgetId = params.id

    const existingBudget = await prisma.budget.findUnique({
      where: { id: budgetId },
    })

    if (!existingBudget) {
      return errorResponse("الميزانية غير موجودة", 404)
    }

    validateUserId(session.user.id!, existingBudget.userId)

    await prisma.budget.delete({
      where: { id: budgetId },
    })

    return successResponse({ id: budgetId }, "تم حذف الميزانية بنجاح")
  } catch (error) {
    return handleApiError(error)
  }
}
