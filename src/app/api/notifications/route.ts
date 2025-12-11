import { NextRequest } from "next/server"
import { prisma } from "@/config/db"
import { getAuthSession, handleApiError, successResponse } from "@/lib/api-utils"
import { getNotificationsQuerySchema } from "@/validations/notification"

// GET /api/notifications - جلب جميع الإشعارات للمستخدم
export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession()
    const { searchParams } = new URL(req.url)
    
    const query = getNotificationsQuerySchema.parse({
      read: searchParams.get("read"),
      type: searchParams.get("type"),
      limit: searchParams.get("limit"),
      offset: searchParams.get("offset"),
    })

    const where: any = {
      userId: session.user.id,
    }

    if (query.read !== undefined) {
      where.read = query.read
    }

    if (query.type) {
      where.type = query.type
    }

    const total = await prisma.notification.count({ where })

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      take: query.limit,
      skip: query.offset,
    })

    return successResponse({
      notifications,
      pagination: {
        total,
        offset: query.offset || 0,
        limit: query.limit || 50,
        hasMore: (query.offset || 0) + notifications.length < total,
      },
    })
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/notifications - حذف جميع الإشعارات
export async function DELETE(req: NextRequest) {
  try {
    const session = await getAuthSession()

    await prisma.notification.deleteMany({
      where: {
        userId: session.user.id,
      },
    })

    return successResponse({ deleted: true }, "تم حذف جميع الإشعارات")
  } catch (error) {
    return handleApiError(error)
  }
}
