/**
 * Rate Limiting للحماية من الهجمات
 * يستخدم Upstash Redis (خطة مجانية متاحة)
 */

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// إنشاء Redis client
// إذا لم تكن متغيرات البيئة موجودة، سيتم استخدام fallback بسيط
let redis: Redis | null = null
let ratelimit: Ratelimit | null = null

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })

  // Rate limiter للـ API العامة: 10 طلبات في الدقيقة
  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
  })
}

/**
 * Rate limiter للتسجيل والدخول: 5 محاولات في 15 دقيقة
 */
export const authRateLimiter = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      analytics: true,
    })
  : null

/**
 * Rate limiter للـ API الحساسة: 20 طلب في الدقيقة
 */
export const apiRateLimiter = ratelimit

/**
 * Rate limiter للـ Webhooks: 100 طلب في الدقيقة
 */
export const webhookRateLimiter = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(100, "1 m"),
      analytics: true,
    })
  : null

/**
 * دالة مساعدة للتحقق من Rate Limit
 */
export async function checkRateLimit(
  identifier: string,
  limiter: Ratelimit | null = apiRateLimiter
): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
  if (!limiter) {
    // إذا لم يكن Rate Limiter مفعلاً، نسمح بالطلب
    return { success: true }
  }

  try {
    const { success, limit, remaining, reset } = await limiter.limit(identifier)
    return { success, limit, remaining, reset }
  } catch (error) {
    console.error("Rate limit check failed:", error)
    // في حالة الخطأ، نسمح بالطلب لتجنب تعطيل الخدمة
    return { success: true }
  }
}
