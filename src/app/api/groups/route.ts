import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/config/db"

// GET - Fetch all groups for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "غير مصرح | Unauthorized" },
        { status: 401 }
      )
    }

    // Find all groups where user is a member
    const groupMemberships = await prisma.groupMember.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        group: {
          include: {
            members: true,
            _count: {
              select: {
                expenses: true,
                incomes: true,
              },
            },
          },
        },
      },
    })

    const groups = groupMemberships.map((membership) => ({
      ...membership.group,
      userRole: membership.role,
    }))

    return NextResponse.json({
      groups,
      count: groups.length,
    })
  } catch (error) {
    console.error("Error fetching groups:", error)
    return NextResponse.json(
      { error: "حدث خطأ في جلب البيانات | Error fetching data" },
      { status: 500 }
    )
  }
}
