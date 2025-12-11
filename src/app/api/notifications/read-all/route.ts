import { NextRequest } from "next/server"
import { prisma } from "@/config/db"
import { getAuthSession, handleApiError, successResponse } from "@/lib/api-utils"

// PUT /api/notifications/read-all - تحديد جميع الإشعارات كمقروءة
export async function PUT(req: NextRequest) {
  try {
    const session = await getAuthSession()

    const result = await prisma.notification.updateMany({
      where: {
        userId: session.user.id,
        read: false,
      },
      data: {
        read: true,
      },
    })

    return successResponse(
      { count: result.count },
      `تم تحديد ${result.count} إشعار كمقروء`
    )
  } catch (error) {
    return handleApiError(error)
  }
}
