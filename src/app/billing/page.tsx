"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  CreditCard, 
  Download,
  CheckCircle2,
  ArrowRight,
  Calendar,
  User,
  Users,
  Sparkles,
  AlertCircle
} from "lucide-react"
import Link from "next/link"

interface Plan {
  id: string
  name: string
  price: number
  oldPrice: number
  features: string[]
  maxUsers: number
  popular?: boolean
}

interface Invoice {
  id: number
  date: string
  amount: number
  status: "paid" | "pending"
  plan: string
}

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState("individual")

  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  const monthlyPlans: Plan[] = [
    {
      id: "individual_monthly",
      name: "فردي شهري",
      price: 22,
      oldPrice: 29,
      maxUsers: 1,
      features: [
        "حساب واحد",
        "مصاريف غير محدودة",
        "تقارير شهرية",
        "تنبيهات ذكية",
        "دعم فني"
      ]
    },
    {
      id: "family_monthly",
      name: "عائلي شهري",
      price: 37,
      oldPrice: 49,
      maxUsers: 5,
      popular: true,
      features: [
        "حتى 5 مستخدمين",
        "إدارة عائلية",
        "تقارير متقدمة",
        "تنبيهات للجميع",
        "أولوية في الدعم",
        "تحليلات الذكاء الاصطناعي"
      ]
    }
  ]

  const yearlyPlans: Plan[] = [
    {
      id: "individual_yearly",
      name: "فردي سنوي",
      price: 187,
      oldPrice: 249,
      maxUsers: 1,
      features: [
        "حساب واحد",
        "مصاريف غير محدودة",
        "تقارير شهرية",
        "تنبيهات ذكية",
        "دعم فني",
        "وفّر 30 ريال سنوياً"
      ]
    },
    {
      id: "family_yearly",
      name: "عائلي سنوي",
      price: 337,
      oldPrice: 449,
      maxUsers: 5,
      popular: true,
      features: [
        "حتى 5 مستخدمين",
        "إدارة عائلية",
        "تقارير متقدمة",
        "تنبيهات للجميع",
        "أولوية في الدعم",
        "تحليلات الذكاء الاصطناعي",
        "وفّر 110 ريال سنوياً"
      ]
    }
  ]

  const plans = billingPeriod === "monthly" ? monthlyPlans : yearlyPlans

  const invoices: Invoice[] = [
    {
      id: 1001,
      date: "2025-10-01",
      amount: 15,
      status: "paid",
      plan: "فردي شهري"
    },
    {
      id: 1002,
      date: "2025-09-01",
      amount: 15,
      status: "paid",
      plan: "فردي شهري"
    },
    {
      id: 1003,
      date: "2025-08-01",
      amount: 20,
      status: "paid",
      plan: "فردي شهري"
    }
  ]

  const nextBillingDate = "2025-11-01"
  const discount = 25

  return (
    <div className="min-h-screen bg-gray-50">
      {/* الهيدر */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">الاشتراكات والفواتير</h1>
              <p className="text-sm text-gray-500">إدارة اشتراكك والفواتير</p>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* بانر العرض الترويجي */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl shadow-2xl p-6 mb-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-4 left-4 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">عرض إطلاق حصري</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  🎉 30 يوم تجريبي مجاني + خصم 25%
                </h2>
                <p className="text-lg opacity-90 mb-3">
                  جرّب جميع الميزات مجاناً لمدة شهر كامل، ثم احصل على خصم 25% على أي خطة!
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>العرض متاح لفترة محدودة - لأول 1000 مشترك</span>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-3">
                  <div className="text-5xl font-bold mb-1">25%</div>
                  <div className="text-sm font-semibold">خصم</div>
                </div>
                <div className="text-xs opacity-75">وفّر حتى 112 ريال سنوياً</div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* الخطة الحالية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 mb-8 text-white"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold opacity-90">الخطة الحالية</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">اشتراك {plans.find(p => p.id === currentPlan)?.name}</h2>
              <p className="opacity-90">
                التجديد التلقائي في {new Date(nextBillingDate).toLocaleDateString('ar-SA')}
              </p>
            </div>
            <div className="text-left">
              <div className="text-4xl font-bold mb-1">
                {plans.find(p => p.id === currentPlan)?.price} ر.س
              </div>
              <div className="text-sm opacity-75 line-through">
                {plans.find(p => p.id === currentPlan)?.oldPrice} ر.س
              </div>
              <div className="text-xs opacity-90 mt-1">شهرياً</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <User className="w-8 h-8 mb-2 opacity-90" />
              <div className="text-sm opacity-90">المستخدمين</div>
              <div className="text-2xl font-bold">
                {plans.find(p => p.id === currentPlan)?.maxUsers}
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <Calendar className="w-8 h-8 mb-2 opacity-90" />
              <div className="text-sm opacity-90">التجديد التالي</div>
              <div className="text-lg font-bold">
                {new Date(nextBillingDate).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <CreditCard className="w-8 h-8 mb-2 opacity-90" />
              <div className="text-sm opacity-90">طريقة الدفع</div>
              <div className="text-lg font-bold">•••• 4242</div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all">
              تغيير الخطة
            </button>
            <button className="border-2 border-white/30 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all">
              إلغاء الاشتراك
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* الخطط المتاحة */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">الخطط المتاحة</h2>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 rounded-full p-1 flex">
                    <button
                      onClick={() => setBillingPeriod("monthly")}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                        billingPeriod === "monthly"
                          ? "bg-white text-emerald-700 shadow-md"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      شهري
                    </button>
                    <button
                      onClick={() => setBillingPeriod("yearly")}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                        billingPeriod === "yearly"
                          ? "bg-white text-emerald-700 shadow-md"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      سنوي
                    </button>
                  </div>
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    خصم {discount}%
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-2xl p-6 border-2 transition-all ${
                      plan.popular
                        ? 'border-green-500 shadow-xl scale-105'
                        : 'border-gray-200 shadow-md hover:border-gray-300'
                    }`}
                  >
                    {plan.popular && (
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                        الأكثر شعبية
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        اشتراك {plan.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-xl text-gray-400 line-through">{plan.oldPrice}</span>
                        <span className="text-gray-600">ر.س / شهر</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-3 rounded-xl font-bold transition-all ${
                        currentPlan === plan.id
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : plan.popular
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                      disabled={currentPlan === plan.id}
                    >
                      {currentPlan === plan.id 
                        ? 'الخطة الحالية' 
                        : billingPeriod === "yearly" 
                        ? 'وفّر أكثر – اشترك سنوياً' 
                        : 'اشترك الآن'
                      }
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">معلومة مهمة</p>
                  <p>يمكنك الترقية أو التخفيض في أي وقت. التغييرات ستطبق من الدورة القادمة.</p>
                </div>
              </div>

              <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-600 leading-relaxed">
                  • الأسعار تشمل ضريبة القيمة المضافة<br />
                  • يمكن الترقية أو الإلغاء في أي وقت<br />
                  • الخطة العائلية تشمل حتى 5 مستخدمين<br />
                  • العرض متاح لفترة محدودة بخصم 25%
                </p>
              </div>
            </motion.div>
          </div>

          {/* الفواتير السابقة */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">الفواتير السابقة</h3>
              
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">#{invoice.id}</div>
                      <div className="text-sm text-gray-500">{invoice.plan}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(invoice.date).toLocaleDateString('ar-SA')}
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900 mb-2">
                        {invoice.amount} ر.س
                      </div>
                      <button className="text-green-600 hover:text-green-700 text-sm flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        تحميل
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-center text-sm text-gray-600 hover:text-gray-900 font-medium py-2">
                عرض جميع الفواتير
              </button>
            </motion.div>

            {/* طرق الدفع */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">طرق الدفع</h3>
              
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">•••• 4242</div>
                      <div className="text-xs text-gray-500">تنتهي 12/26</div>
                    </div>
                  </div>
                  <div className="text-xs text-green-600 font-bold">افتراضي</div>
                </div>
              </div>

              <button className="w-full mt-4 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" />
                إضافة بطاقة جديدة
              </button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
