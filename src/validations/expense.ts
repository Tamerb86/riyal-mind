import { z } from "zod"

/**
 * Schema لإنشاء مصروف جديد
 */
export const createExpenseSchema = z.object({
  categoryId: z.number().int().positive("يجب اختيار فئة"),
  amount: z.number().positive("المبلغ يجب أن يكون موجباً"),
  description: z.string().nullable().optional(),
  date: z.string().optional(),
  receipt: z.string().url("يجب أن يكون رابط صحيح").nullable().optional(),
  notes: z.string().max(1000, "الملاحظات يجب أن تكون أقل من 1000 حرف").nullable().optional(),
})

/**
 * Schema لتحديث مصروف
 */
export const updateExpenseSchema = z.object({
  categoryId: z.number().int().positive("يجب اختيار فئة").optional(),
  amount: z.number().positive("المبلغ يجب أن يكون موجباً").optional(),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
  receipt: z.string().url("يجب أن يكون رابط صحيح").optional().or(z.literal("")),
  notes: z.string().max(1000, "الملاحظات يجب أن تكون أقل من 1000 حرف").optional(),
})

/**
 * Schema لمعاملات الاستعلام (Query Parameters)
 */
export const getExpensesQuerySchema = z.object({
  categoryId: z.coerce.number().int().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  limit: z.coerce.number().int().positive().max(100).nullable().optional().default(50),
  offset: z.coerce.number().int().min(0).nullable().optional().default(0),
  sortBy: z.enum(["date", "amount", "createdAt"]).nullable().optional().default("date"),
  sortOrder: z.enum(["asc", "desc"]).nullable().optional().default("desc"),
})

/**
 * Types المشتقة من Schemas
 */
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>
export type GetExpensesQuery = z.infer<typeof getExpensesQuerySchema>
