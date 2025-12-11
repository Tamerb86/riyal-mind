import { NextRequest } from "next/server"
import { prisma } from "@/config/db"
import { getAuthSession, handleApiError, successResponse, validateUserId, errorResponse } from "@/lib/api-utils"
import { updateExpenseSchema } from "@/validations/expense"

// GET /api/expenses/[id] - جلب مصروف واحد
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession()
    const expenseId = params.id

    const expense = await prisma.expense.findUnique({
      where: { id: expenseId },
    })

    if (!expense) {
      return errorResponse("المصروف غير موجود", 404)
    }

    // التحقق من الملكية
    validateUserId(session.user.id!, expense.userId)

    return successResponse(expense)
  } catch (error) {
    return handleApiError(error)
  }
}

// PUT /api/expenses/[id] - تحديث مصروف
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession()
    const expenseId = params.id
    const body = await req.json()

    // التحقق من وجود المصروف
    const existingExpense = await prisma.expense.findUnique({
      where: { id: expenseId },
    })

    if (!existingExpense) {
      return errorResponse("المصروف غير موجود", 404)
    }

    // التحقق من الملكية
    validateUserId(session.user.id!, existingExpense.userId)

    // التحقق من البيانات
    const validatedData = updateExpenseSchema.parse(body)

    // تحديث المصروف
    const updatedExpense = await prisma.expense.update({
      where: { id: expenseId },
      data: {
        ...(validatedData.categoryId && { categoryId: validatedData.categoryId }),
        ...(validatedData.amount !== undefined && { amount: validatedData.amount }),
        ...(validatedData.description !== undefined && { description: validatedData.description }),
        ...(validatedData.date && { date: new Date(validatedData.date) }),
        ...(validatedData.receipt !== undefined && { receipt: validatedData.receipt }),
        ...(validatedData.notes !== undefined && { notes: validatedData.notes }),
      },
    })

    return successResponse(updatedExpense, "تم تحديث المصروف بنجاح")
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/expenses/[id] - حذف مصروف
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession()
    const expenseId = params.id

    // التحقق من وجود المصروف
    const existingExpense = await prisma.expense.findUnique({
      where: { id: expenseId },
    })

    if (!existingExpense) {
      return errorResponse("المصروف غير موجود", 404)
    }

    // التحقق من الملكية
    validateUserId(session.user.id!, existingExpense.userId)

    // حذف المصروف
    await prisma.expense.delete({
      where: { id: expenseId },
    })

    return successResponse({ id: expenseId }, "تم حذف المصروف بنجاح")
  } catch (error) {
    return handleApiError(error)
  }
}
