import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/config/db"
import { z } from "zod"

// Validation schema for income
const incomeSchema = z.object({
  amount: z.number().positive("المبلغ يجب أن يكون أكبر من صفر"),
  description: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  type: z.enum(["PRIMARY", "SECONDARY", "SHARED"]).default("PRIMARY"),
  groupId: z.string().optional().nullable(),
  date: z.string().optional(),
})

// GET - Fetch all incomes for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "غير مصرح | Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const month = searchParams.get("month") // Format: YYYY-MM
    const year = searchParams.get("year")
    const type = searchParams.get("type") // PRIMARY, SECONDARY, or SHARED
    const groupId = searchParams.get("groupId")

    let dateFilter = {}
    
    if (month) {
      const parts = month.split("-")
      const yearPart = parts[0] || "2025"
      const monthPart = parts[1] || "1"
      const startDate = new Date(parseInt(yearPart), parseInt(monthPart) - 1, 1)
      const endDate = new Date(parseInt(yearPart), parseInt(monthPart), 0, 23, 59, 59)
      dateFilter = {
        date: {
          gte: startDate,
          lte: endDate,
        },
      }
    } else if (year) {
      const startDate = new Date(parseInt(year), 0, 1)
      const endDate = new Date(parseInt(year), 11, 31, 23, 59, 59)
      dateFilter = {
        date: {
          gte: startDate,
          lte: endDate,
        },
      }
    }

    // Build where clause
    const whereClause: any = {
      userId: session.user.id,
      ...dateFilter,
    }

    // Filter by type if specified
    if (type && ["PRIMARY", "SECONDARY", "SHARED"].includes(type)) {
      whereClause.type = type
    }

    // Filter by group if specified
    if (groupId) {
      whereClause.groupId = groupId
    }

    const incomes = await prisma.income.findMany({
      where: whereClause,
      orderBy: {
        date: "desc",
      },
      include: {
        group: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    // Calculate totals by type
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0)
    const primaryIncome = incomes
      .filter((income) => income.type === "PRIMARY")
      .reduce((sum, income) => sum + income.amount, 0)
    const secondaryIncome = incomes
      .filter((income) => income.type === "SECONDARY")
      .reduce((sum, income) => sum + income.amount, 0)
    const sharedIncome = incomes
      .filter((income) => income.type === "SHARED")
      .reduce((sum, income) => sum + income.amount, 0)

    return NextResponse.json({
      incomes,
      totalIncome,
      primaryIncome,
      secondaryIncome,
      sharedIncome,
      count: incomes.length,
    })
  } catch (error) {
    console.error("Error fetching incomes:", error)
    return NextResponse.json(
      { error: "حدث خطأ في جلب البيانات | Error fetching data" },
      { status: 500 }
    )
  }
}

// POST - Create a new income entry
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "غير مصرح | Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = incomeSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.errors[0]?.message || "بيانات غير صالحة" },
        { status: 400 }
      )
    }

    const { amount, description, source, type, groupId, date } = validatedData.data

    // Validate group access if type is SHARED
    if (type === "SHARED") {
      if (!groupId) {
        return NextResponse.json(
          { error: "يجب تحديد مجموعة للدخل المشترك" },
          { status: 400 }
        )
      }

      // Check if user is a member of the group
      const groupMember = await prisma.groupMember.findFirst({
        where: {
          groupId,
          userId: session.user.id,
        },
      })

      if (!groupMember) {
        return NextResponse.json(
          { error: "ليس لديك صلاحية للوصول إلى هذه المجموعة" },
          { status: 403 }
        )
      }
    }

    const income = await prisma.income.create({
      data: {
        userId: session.user.id,
        amount,
        description: description || null,
        source: source || null,
        type: type || "PRIMARY",
        groupId: type === "SHARED" ? groupId : null,
        date: date ? new Date(date) : new Date(),
      },
      include: {
        group: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json({
      message: "تم إضافة الدخل بنجاح | Income added successfully",
      income,
    }, { status: 201 })
  } catch (error) {
    console.error("Error creating income:", error)
    return NextResponse.json(
      { error: "حدث خطأ في إضافة الدخل | Error adding income" },
      { status: 500 }
    )
  }
}
