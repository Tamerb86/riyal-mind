import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/config/db"
import { getAuthSession, handleApiError, successResponse } from "@/lib/api-utils"
import { createExpenseSchema, getExpensesQuerySchema } from "@/validations/expense"

// GET /api/expenses - جلب جميع المصاريف للمستخدم مع pagination وفلاتر
export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession()
    const { searchParams } = new URL(req.url)
    
    // التحقق من معاملات الاستعلام
    const query = getExpensesQuerySchema.parse({
      categoryId: searchParams.get("categoryId"),
      startDate: searchParams.get("startDate"),
      endDate: searchParams.get("endDate"),
      limit: searchParams.get("limit"),
      offset: searchParams.get("offset"),
      sortBy: searchParams.get("sortBy"),
      sortOrder: searchParams.get("sortOrder"),
    })

    // بناء شروط البحث
    const where: any = {
      userId: session.user.id,
    }

    if (query.categoryId) {
      where.categoryId = query.categoryId
    }

    if (query.startDate && query.endDate) {
      where.date = {
        gte: new Date(query.startDate),
        lte: new Date(query.endDate),
      }
    }

    // الحصول على العدد الكلي
    const total = await prisma.expense.count({ where })

    // جلب المصاريف مع الترتيب والـ pagination
    const expenses = await prisma.expense.findMany({
      where,
      orderBy: {
        [query.sortBy || "date"]: query.sortOrder || "desc",
      },
      take: query.limit || 50,
      skip: query.offset || 0,
    })

    return successResponse({
      expenses,
      pagination: {
        total,
        offset: query.offset || 0,
        limit: query.limit || 50,
        hasMore: (query.offset || 0) + expenses.length < total,
      },
    })
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/expenses - إضافة مصروف جديد
export async function POST(req: NextRequest) {
  try {
    console.log("=== POST /api/expenses START ===")
    
    const session = await getAuthSession()
    console.log("Session user id:", session?.user?.id)
    
    const body = await req.json()
    console.log("Request body:", body)
    
    const validatedData = createExpenseSchema.parse(body)
    console.log("Validated data:", validatedData)

    const expense = await prisma.expense.create({
      data: {
        userId: session.user.id!,
        categoryId: validatedData.categoryId,
        amount: validatedData.amount,
        description: validatedData.description,
        date: validatedData.date ? new Date(validatedData.date) : new Date(),
        receipt: validatedData.receipt,
        notes: validatedData.notes,
      },
    })

    console.log("Expense created:", expense.id)

    // إنشاء إشعار
    await prisma.notification.create({
      data: {
        userId: session.user.id!,
        type: "EXPENSE_ADDED",
        title: "تم إضافة مصروف جديد",
        description: `تم إضافة مصروف بقيمة ${validatedData.amount} ريال`,
        data: { expenseId: expense.id },
      },
    })

    console.log("=== POST /api/expenses SUCCESS ===")
    return successResponse(expense, "تم إضافة المصروف بنجاح")
  } catch (error) {
    console.error("=== POST /api/expenses ERROR ===", error)
    return handleApiError(error)
  }
}
