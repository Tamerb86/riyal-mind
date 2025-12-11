import { z } from "zod"

/**
 * Schema لإرسال دعوة عائلية
 */
export const createFamilyInviteSchema = z.object({
  inviteeEmail: z.string().email("البريد الإلكتروني غير صحيح"),
  role: z.enum(["ADMIN", "MEMBER", "VIEWER"], {
    errorMap: () => ({ message: "الدور غير صحيح" }),
  }).default("MEMBER"),
})

/**
 * Schema لقبول دعوة
 */
export const acceptFamilyInviteSchema = z.object({
  token: z.string().min(1, "رمز الدعوة مطلوب"),
})

/**
 * Schema لتحديث دور عضو
 */
export const updateFamilyMemberSchema = z.object({
  role: z.enum(["ADMIN", "MEMBER", "VIEWER"], {
    errorMap: () => ({ message: "الدور غير صحيح" }),
  }),
})

/**
 * Schema لحذف عضو
 */
export const deleteFamilyMemberSchema = z.object({
  memberId: z.string().min(1, "معرف العضو مطلوب"),
})

/**
 * Types المشتقة من Schemas
 */
export type CreateFamilyInviteInput = z.infer<typeof createFamilyInviteSchema>
export type AcceptFamilyInviteInput = z.infer<typeof acceptFamilyInviteSchema>
export type UpdateFamilyMemberInput = z.infer<typeof updateFamilyMemberSchema>
export type DeleteFamilyMemberInput = z.infer<typeof deleteFamilyMemberSchema>
