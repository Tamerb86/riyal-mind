import { NextRequest } from "next/server"
import { prisma } from "@/config/db"
import { getAuthSession, handleApiError, successResponse, validateUserId, errorResponse } from "@/lib/api-utils"
import { updateNotificationSchema } from "@/validations/notification"

// PUT /api/notifications/[id] - تحديث إشعار (تحديد كمقروء)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession()
    const notificationId = params.id
    const body = await req.json()

    const existingNotification = await prisma.notification.findUnique({
      where: { id: notificationId },
    })

    if (!existingNotification) {
      return errorResponse("الإشعار غير موجود", 404)
    }

    validateUserId(session.user.id!, existingNotification.userId)

    const validatedData = updateNotificationSchema.parse(body)

    const notification = await prisma.notification.update({
      where: { id: notificationId },
      data: {
        read: validatedData.read,
      },
    })

    return successResponse(notification, "تم تحديث الإشعار")
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/notifications/[id] - حذف إشعار
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession()
    const notificationId = params.id

    const existingNotification = await prisma.notification.findUnique({
      where: { id: notificationId },
    })

    if (!existingNotification) {
      return errorResponse("الإشعار غير موجود", 404)
    }

    validateUserId(session.user.id!, existingNotification.userId)

    await prisma.notification.delete({
      where: { id: notificationId },
    })

    return successResponse({ id: notificationId }, "تم حذف الإشعار")
  } catch (error) {
    return handleApiError(error)
  }
}
