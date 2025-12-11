"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Check, 
  X, 
  ArrowRight, 
  Sparkles, 
  Zap,
  Crown,
  Shield,
  TrendingUp,
  Users,
  Calendar,
  CreditCard,
  Home
} from "lucide-react"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "المجاني",
      nameEn: "Free",
      icon: Shield,
      price: 0,
      yearlyPrice: 0,
      description: "مثالي للأفراد الذين يبدأون رحلتهم المالية",
      features: [
        { text: "تتبع المصاريف الأساسية", included: true },
        { text: "3 فئات مصاريف", included: true },
        { text: "تقارير شهرية بسيطة", included: true },
        { text: "حساب واحد فقط", included: true },
        { text: "تحليلات متقدمة", included: false },
        { text: "الحساب العائلي", included: false },
        { text: "ميزانيات متعددة", included: false },
        { text: "دعم أولوية", included: false },
      ],
      cta: "ابدأ مجاناً",
      popular: false,
      color: "from-gray-500 to-gray-600"
    },
    {
      name: "الشهري",
      nameEn: "Monthly",
      icon: Zap,
      price: 29,
      yearlyPrice: 290,
      description: "للأفراد والعائلات الذين يريدون تحكماً كاملاً",
      features: [
        { text: "كل ميزات المجاني", included: true },
        { text: "فئات مصاريف غير محدودة", included: true },
        { text: "تقارير متقدمة وتحليلات ذكية", included: true },
        { text: "الحساب العائلي (حتى 5 أفراد)", included: true },
        { text: "ميزانيات متعددة", included: true },
        { text: "تنبيهات ذكية", included: true },
        { text: "تصدير البيانات", included: true },
        { text: "دعم عبر البريد الإلكتروني", included: true },
      ],
      cta: "اشترك الآن",
      popular: true,
      color: "from-emerald-500 to-teal-600"
    },
    {
      name: "السنوي",
      nameEn: "Yearly",
      icon: Crown,
      price: 24,
      yearlyPrice: 290,
      description: "وفر 17% مع الاشتراك السنوي",
      badge: "وفر 60 ر.س",
      features: [
        { text: "كل ميزات الشهري", included: true },
        { text: "خصم 17% على السعر", included: true },
        { text: "الحساب العائلي (حتى 10 أفراد)", included: true },
        { text: "دعم أولوية عبر الهاتف", included: true },
        { text: "استشارات مالية شهرية", included: true },
        { text: "تقارير مخصصة", included: true },
        { text: "نسخ احتياطي تلقائي", included: true },
        { text: "وصول مبكر للميزات الجديدة", included: true },
      ],
      cta: "اشترك سنوياً",
      popular: false,
      color: "from-amber-500 to-orange-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100">
      {/* الهيدر */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                title="العودة للصفحة الرئيسية"
              >
                <Home className="w-5 h-5 text-white" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-emerald-800">ريال مايند</h1>
                <p className="text-sm text-emerald-600">خطط الأسعار</p>
              </div>
            </div>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg"
            >
              ابدأ الآن
            </Link>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* العنوان الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">خطط مرنة لكل احتياجاتك</span>
          </div>
          <h1 className="text-5xl font-bold text-emerald-800 mb-4">
            اختر الخطة المناسبة لك
          </h1>
          <p className="text-xl text-emerald-600 max-w-2xl mx-auto">
            ابدأ مجاناً أو اختر خطة مدفوعة للحصول على ميزات متقدمة وتحكم كامل في مصاريفك
          </p>
        </motion.div>

        {/* مفتاح التبديل بين الشهري والسنوي */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-full p-2 shadow-lg border border-emerald-200">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-emerald-600 to-amber-600 text-white shadow-md"
                  : "text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              الدفع الشهري
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-3 rounded-full font-semibold transition-all relative ${
                billingCycle === "yearly"
                  ? "bg-gradient-to-r from-emerald-600 to-amber-600 text-white shadow-md"
                  : "text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              الدفع السنوي
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                وفر 17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* بطاقات الأسعار */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const displayPrice = billingCycle === "yearly" ? plan.price : plan.price
            const totalYearlyPrice = plan.yearlyPrice

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-xl border-2 overflow-hidden ${
                  plan.popular ? "border-emerald-500 scale-105" : "border-emerald-100"
                }`}
              >
                {/* شارة "الأكثر شعبية" */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-600 to-amber-600 text-white text-center py-2 text-sm font-bold">
                    ⭐ الأكثر شعبية
                  </div>
                )}

                {/* شارة التوفير */}
                {plan.badge && billingCycle === "yearly" && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                    {plan.badge}
                  </div>
                )}

                <div className={`p-8 ${plan.popular ? "pt-16" : ""}`}>
                  {/* الأيقونة */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* الاسم */}
                  <h3 className="text-2xl font-bold text-emerald-800 mb-2">{plan.name}</h3>
                  <p className="text-emerald-600 text-sm mb-6">{plan.description}</p>

                  {/* السعر */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-emerald-800">
                        {billingCycle === "yearly" ? plan.price : displayPrice}
                      </span>
                      <span className="text-emerald-600">ر.س</span>
                      {plan.price > 0 && (
                        <span className="text-emerald-600">/ {billingCycle === "yearly" ? "شهر" : "شهر"}</span>
                      )}
                    </div>
                    {billingCycle === "yearly" && plan.price > 0 && (
                      <p className="text-sm text-emerald-600 mt-2">
                        {totalYearlyPrice} ر.س تُدفع سنوياً
                      </p>
                    )}
                  </div>

                  {/* زر الاشتراك */}
                  <Link
                    href={plan.price === 0 ? "/signup" : "/billing"}
                    className={`block w-full py-4 rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-xl mb-6 ${
                      plan.popular
                        ? "bg-gradient-to-r from-emerald-600 to-amber-600 text-white hover:from-emerald-700 hover:to-amber-700"
                        : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  {/* الميزات */}
                  <div className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "text-emerald-800" : "text-gray-400"}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* قسم الأسئلة الشائعة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-emerald-800 mb-8 text-center">الأسئلة الشائعة</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-emerald-800 mb-2">هل يمكنني تغيير خطتي لاحقاً؟</h3>
              <p className="text-emerald-600 text-sm">
                نعم، يمكنك الترقية أو التخفيض في أي وقت. سيتم احتساب الفرق بشكل تلقائي.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-emerald-800 mb-2">هل هناك فترة تجريبية؟</h3>
              <p className="text-emerald-600 text-sm">
                الخطة المجانية متاحة دائماً بدون حاجة لبطاقة ائتمان. يمكنك تجربة الميزات الأساسية مجاناً.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-emerald-800 mb-2">كيف يتم الدفع؟</h3>
              <p className="text-emerald-600 text-sm">
                نقبل جميع بطاقات الائتمان الرئيسية عبر Stripe. الدفع آمن ومشفر بالكامل.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-emerald-800 mb-2">هل يمكنني إلغاء اشتراكي؟</h3>
              <p className="text-emerald-600 text-sm">
                نعم، يمكنك الإلغاء في أي وقت من لوحة التحكم. لن يتم تحصيل أي رسوم بعد الإلغاء.
              </p>
            </div>
          </div>
        </motion.div>

        {/* دعوة للعمل */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-emerald-600 to-amber-600 rounded-2xl shadow-2xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">جاهز للبدء؟</h2>
          <p className="text-xl mb-8 text-emerald-100">
            انضم إلى آلاف المستخدمين الذين يديرون مصاريفهم بذكاء
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-lg"
          >
            ابدأ مجاناً الآن
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
