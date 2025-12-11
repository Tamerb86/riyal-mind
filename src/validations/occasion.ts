import { z } from "zod"

/**
 * Schema لإنشاء مناسبة جديدة
 */
export const createOccasionSchema = z.object({
  name: z.string().min(1, "اسم المناسبة مطلوب").max(100, "اسم المناسبة يجب أن يكون أقل من 100 حرف"),
  type: z.enum(["BIRTHDAY", "WEDDING", "GRADUATION", "HOLIDAY", "OTHER"], {
    errorMap: () => ({ message: "نوع المناسبة غير صحيح" }),
  }),
  date: z.string().datetime("تاريخ المناسبة يجب أن يكون صحيحاً"),
  budget: z.number().positive("الميزانية يجب أن تكون موجبة").optional(),
  spent: z.number().min(0, "المبلغ المصروف لا يمكن أن يكون سالباً").default(0).optional(),
  icon: z.string().optional(),
  description: z.string().max(500, "الوصف يجب أن يكون أقل من 500 حرف").optional(),
})

/**
 * Schema لتحديث مناسبة
 */
export const updateOccasionSchema = z.object({
  name: z.string().min(1, "اسم المناسبة مطلوب").max(100, "اسم المناسبة يجب أن يكون أقل من 100 حرف").optional(),
  type: z.enum(["BIRTHDAY", "WEDDING", "GRADUATION", "HOLIDAY", "OTHER"]).optional(),
  date: z.string().datetime("تاريخ المناسبة يجب أن يكون صحيحاً").optional(),
  budget: z.number().positive("الميزانية يجب أن تكون موجبة").optional(),
  spent: z.number().min(0, "المبلغ المصروف لا يمكن أن يكون سالباً").optional(),
  icon: z.string().optional(),
  description: z.string().max(500, "الوصف يجب أن يكون أقل من 500 حرف").optional(),
})

/**
 * Schema لمعاملات الاستعلام
 */
export const getOccasionsQuerySchema = z.object({
  type: z.enum(["BIRTHDAY", "WEDDING", "GRADUATION", "HOLIDAY", "OTHER"]).optional(),
  upcoming: z.coerce.boolean().default(false).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})

/**
 * Types المشتقة من Schemas
 */
export type CreateOccasionInput = z.infer<typeof createOccasionSchema>
export type UpdateOccasionInput = z.infer<typeof updateOccasionSchema>
export type GetOccasionsQuery = z.infer<typeof getOccasionsQuerySchema>
