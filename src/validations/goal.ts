import { z } from "zod"

/**
 * Schema لإنشاء هدف جديد
 */
export const createGoalSchema = z.object({
  name: z.string().min(1, "اسم الهدف مطلوب").max(100, "اسم الهدف يجب أن يكون أقل من 100 حرف"),
  targetAmount: z.number().positive("المبلغ المستهدف يجب أن يكون موجباً"),
  currentAmount: z.number().min(0, "المبلغ الحالي لا يمكن أن يكون سالباً").default(0).optional(),
  deadline: z.string().datetime().optional(),
  icon: z.string().optional(),
  category: z.string().optional(),
  description: z.string().max(500, "الوصف يجب أن يكون أقل من 500 حرف").optional(),
})

/**
 * Schema لتحديث هدف
 */
export const updateGoalSchema = z.object({
  name: z.string().min(1, "اسم الهدف مطلوب").max(100, "اسم الهدف يجب أن يكون أقل من 100 حرف").optional(),
  targetAmount: z.number().positive("المبلغ المستهدف يجب أن يكون موجباً").optional(),
  currentAmount: z.number().min(0, "المبلغ الحالي لا يمكن أن يكون سالباً").optional(),
  deadline: z.string().datetime().optional(),
  icon: z.string().optional(),
  category: z.string().optional(),
  description: z.string().max(500, "الوصف يجب أن يكون أقل من 500 حرف").optional(),
})

/**
 * Schema لمعاملات الاستعلام
 */
export const getGoalsQuerySchema = z.object({
  category: z.string().optional(),
  status: z.enum(["active", "completed", "all"]).default("active").optional(),
})

/**
 * Types المشتقة من Schemas
 */
export type CreateGoalInput = z.infer<typeof createGoalSchema>
export type UpdateGoalInput = z.infer<typeof updateGoalSchema>
export type GetGoalsQuery = z.infer<typeof getGoalsQuerySchema>
