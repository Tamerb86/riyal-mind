import Stripe from "stripe"

// تهيئة Stripe فقط إذا كان المفتاح موجوداً
// هذا يسمح بالبناء بدون المتغيرات البيئية
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("STRIPE_SECRET_KEY is not set. Stripe features will be disabled.")
    return null
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-11-17.clover",
    typescript: true,
  })
}

export const stripe = getStripe()

// معرفات الأسعار من Stripe
export const STRIPE_PLANS = {
  individual_monthly: process.env.STRIPE_PRICE_INDIVIDUAL_MONTHLY || "",
  family_monthly: process.env.STRIPE_PRICE_FAMILY_MONTHLY || "",
  individual_yearly: process.env.STRIPE_PRICE_INDIVIDUAL_YEARLY || "",
  family_yearly: process.env.STRIPE_PRICE_FAMILY_YEARLY || "",
} as const

// أسعار الخطط (بالريال السعودي)
export const PLAN_PRICES = {
  individual_monthly: { price: 15, oldPrice: 20, interval: "month" as const },
  family_monthly: { price: 30, oldPrice: 40, interval: "month" as const },
  individual_yearly: { price: 150, oldPrice: 200, interval: "year" as const },
  family_yearly: { price: 250, oldPrice: 330, interval: "year" as const },
} as const

export type PlanType = keyof typeof STRIPE_PLANS
