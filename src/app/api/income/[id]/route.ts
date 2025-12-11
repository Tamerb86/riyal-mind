import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/config/db"

// DELETE - Delete an income entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "غير مصرح | Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = params

    // First check if the income exists and belongs to the user
    const existingIncome = await prisma.income.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingIncome) {
      return NextResponse.json(
        { error: "الدخل غير موجود أو غير مصرح بحذفه | Income not found or unauthorized" },
        { status: 404 }
      )
    }

    // Delete the income
    await prisma.income.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({
      message: "تم حذف الدخل بنجاح | Income deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting income:", error)
    return NextResponse.json(
      { error: "حدث خطأ في حذف الدخل | Error deleting income" },
      { status: 500 }
    )
  }
}

// GET - Get a single income entry
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "غير مصرح | Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = params

    const income = await prisma.income.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!income) {
      return NextResponse.json(
        { error: "الدخل غير موجود | Income not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ income })
  } catch (error) {
    console.error("Error fetching income:", error)
    return NextResponse.json(
      { error: "حدث خطأ في جلب البيانات | Error fetching data" },
      { status: 500 }
    )
  }
}

// PUT - Update an income entry
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "غير مصرح | Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = params
    const body = await request.json()

    // Check if the income exists and belongs to the user
    const existingIncome = await prisma.income.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingIncome) {
      return NextResponse.json(
        { error: "الدخل غير موجود أو غير مصرح بتعديله | Income not found or unauthorized" },
        { status: 404 }
      )
    }

    const updatedIncome = await prisma.income.update({
      where: { id },
      data: {
        amount: body.amount !== undefined ? body.amount : existingIncome.amount,
        description: body.description !== undefined ? body.description : existingIncome.description,
        source: body.source !== undefined ? body.source : existingIncome.source,
        date: body.date ? new Date(body.date) : existingIncome.date,
      },
    })

    return NextResponse.json({
      message: "تم تحديث الدخل بنجاح | Income updated successfully",
      income: updatedIncome,
    })
  } catch (error) {
    console.error("Error updating income:", error)
    return NextResponse.json(
      { error: "حدث خطأ في تحديث الدخل | Error updating income" },
      { status: 500 }
    )
  }
}
