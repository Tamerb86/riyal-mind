import { z } from "zod"

/**
 * Schema لإنشاء إشعار جديد
 */
export const createNotificationSchema = z.object({
  type: z.enum([
    "EXPENSE_ADDED",
    "BUDGET_ALERT",
    "GOAL_PROGRESS",
    "FAMILY_INVITE",
    "REPORT_READY",
    "OTHER"
  ], {
    errorMap: () => ({ message: "نوع الإشعار غير صحيح" }),
  }),
  title: z.string().min(1, "عنوان الإشعار مطلوب").max(100, "العنوان يجب أن يكون أقل من 100 حرف"),
  description: z.string().max(500, "الوصف يجب أن يكون أقل من 500 حرف").optional(),
  data: z.record(z.any()).optional(),
})

/**
 * Schema لتحديث إشعار (قراءة/عدم قراءة)
 */
export const updateNotificationSchema = z.object({
  read: z.boolean(),
})

/**
 * Schema لمعاملات الاستعلام
 */
export const getNotificationsQuerySchema = z.object({
  read: z.coerce.boolean().optional(),
  type: z.enum([
    "EXPENSE_ADDED",
    "BUDGET_ALERT",
    "GOAL_PROGRESS",
    "FAMILY_INVITE",
    "REPORT_READY",
    "OTHER"
  ]).optional(),
  limit: z.coerce.number().int().positive().max(100).default(50).optional(),
  offset: z.coerce.number().int().min(0).default(0).optional(),
})

/**
 * Types المشتقة من Schemas
 */
export type CreateNotificationInput = z.infer<typeof createNotificationSchema>
export type UpdateNotificationInput = z.infer<typeof updateNotificationSchema>
export type GetNotificationsQuery = z.infer<typeof getNotificationsQuerySchema>
