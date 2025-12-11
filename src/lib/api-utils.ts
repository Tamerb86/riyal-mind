import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { ZodError } from "zod"

/**
 * الحصول على session أو إرجاع خطأ 401
 */
export async function getAuthSession() {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }
  
  return session
}

/**
 * صيغة استجابة النجاح
 */
export function successResponse<T>(data: T, message?: string) {
  return NextResponse.json({
    success: true,
    data,
    message,
  })
}

/**
 * صيغة استجابة الخطأ
 */
export function errorResponse(error: string | Error, code: number = 500) {
  const message = typeof error === "string" ? error : error.message
  
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: code }
  )
}

/**
 * التحقق من ملكية المورد
 */
export function validateUserId(userId: string, resourceUserId: string) {
  if (userId !== resourceUserId) {
    throw new Error("غير مصرح لك بالوصول لهذا المورد")
  }
  return true
}

/**
 * معالج الأخطاء الشامل
 */
export function handleApiError(error: unknown) {
  console.error("API Error:", error)
  
  // Zod validation errors
  if (error instanceof ZodError) {
    const firstError = error.errors[0]
    return errorResponse(firstError?.message || "بيانات غير صحيحة", 400)
  }
  
  if (error instanceof Error) {
    if (error.message === "Unauthorized") {
      return errorResponse("غير مصرح", 401)
    }
    
    if (error.message.includes("غير مصرح")) {
      return errorResponse(error.message, 403)
    }
    
    // Prisma errors
    if (error.message.includes("Unique constraint")) {
      return errorResponse("البيانات موجودة مسبقاً", 409)
    }
    
    return errorResponse(error.message, 500)
  }
  
  return errorResponse("حدث خطأ غير متوقع", 500)
}
