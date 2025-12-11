"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { 
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Target,
  Zap,
  DollarSign
} from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [totalIncome, setTotalIncome] = useState(0)
  const [incomeCount, setIncomeCount] = useState(0)

  // جلب بيانات الدخل
  const fetchIncomeData = useCallback(async () => {
    try {
      const response = await fetch("/api/income")
      if (response.ok) {
        const data = await response.json()
        setTotalIncome(data.totalIncome || 0)
        setIncomeCount(data.count || 0)
      }
    } catch (error) {
      console.error("Error fetching income:", error)
    }
  }, [])

  useEffect(() => {
    fetchIncomeData()
  }, [fetchIncomeData])

  // بيانات وهمية
  const spendingPatterns = {
    byDayOfWeek: [
      { day: "السبت", amount: 850, isHighest: false },
      { day: "الأحد", amount: 920, isHighest: false },
      { day: "الاثنين", amount: 680, isHighest: false },
      { day: "الثلاثاء", amount: 720, isHighest: false },
      { day: "الأربعاء", amount: 1200, isHighest: true },
      { day: "الخميس", amount: 950, isHighest: false },
      { day: "الجمعة", amount: 1100, isHighest: false }
    ],
    byTimeOfMonth: [
      { period: "بداية الشهر (1-10)", amount: 3200, percentage: 38 },
      { period: "منتصف الشهر (11-20)", amount: 2800, percentage: 33 },
      { period: "نهاية الشهر (21-30)", amount: 2450, percentage: 29 }
    ]
  }

  const predictions = {
    nextMonth: {
      estimated: 8800,
      confidence: 85,
      trend: "up",
      change: 4.2
    }
  }

  const insights = [
    {
      type: "warning",
      icon: AlertCircle,
      title: "ارتفاع في مصاريف الأربعاء",
      description: "مصاريفك يوم الأربعاء أعلى بنسبة 40% من باقي الأيام. غالباً بسبب التسوق الأسبوعي.",
      action: "حاول توزيع المشتريات"
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "توفير ممتاز!",
      description: "وفّرت 1,200 ر.س هذا الشهر مقارنة بالمتوسط. استمر على هذا النهج!",
      action: null
    },
    {
      type: "info",
      icon: Sparkles,
      title: "نمط إنفاق منتظم",
      description: "مصاريفك ثابتة نسبياً خلال الشهر، مما يسهل التخطيط المالي.",
      action: null
    },
    {
      type: "warning",
      icon: Target,
      title: "مصاريف غير ضرورية",
      description: "اكتشفنا 450 ر.س شهرياً تُصرف على اشتراكات غير مستخدمة ومطاعم متكررة.",
      action: "راجع اشتراكاتك"
    }
  ]

  const recommendations = [
    {
      title: "قلل مصاريف المطاعم",
      description: "تنفق 850 ر.س شهرياً على المطاعم. خفضها إلى 500 ر.س يوفر 4,200 ر.س سنوياً.",
      savings: 350,
      difficulty: "سهل"
    },
    {
      title: "راجع الاشتراكات",
      description: "لديك 3 اشتراكات غير مستخدمة بقيمة 180 ر.س شهرياً.",
      savings: 180,
      difficulty: "سهل جداً"
    },
    {
      title: "خطط للتسوق",
      description: "التسوق بخطة مسبقة يقلل المشتريات العشوائية بنسبة 25%.",
      savings: 420,
      difficulty: "متوسط"
    }
  ]

  const maxSpending = Math.max(...spendingPatterns.byDayOfWeek.map(d => d.amount))

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100">
      {/* الهيدر */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="w-10 h-10 bg-white border border-emerald-200 rounded-lg flex items-center justify-center hover:bg-emerald-50 transition-colors shadow-sm"
            >
              <ArrowRight className="w-5 h-5 text-emerald-700" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-emerald-800">التحليلات الذكية</h1>
              <p className="text-sm text-emerald-600">اكتشف أنماط إنفاقك واحصل على توصيات</p>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* بطاقة الدخل */}
        {totalIncome > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  <DollarSign className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-emerald-100 text-sm">إجمالي الدخل المسجل</p>
                  <h3 className="text-3xl font-bold">{totalIncome.toLocaleString('en-US')} ر.س</h3>
                </div>
              </div>
              <div className="text-left">
                <p className="text-emerald-100 text-sm">عدد الإدخالات</p>
                <p className="text-2xl font-bold">{incomeCount}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* التوقعات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: totalIncome > 0 ? 0.1 : 0 }}
          className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8" />
            <h2 className="text-2xl font-bold">توقعات الشهر القادم</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-purple-100 text-sm mb-2">المصاريف المتوقعة</p>
              <h3 className="text-4xl font-bold">{predictions.nextMonth.estimated.toLocaleString('en-US')}</h3>
              <p className="text-sm text-purple-100 mt-1">ر.س</p>
            </div>
            <div>
              <p className="text-purple-100 text-sm mb-2">دقة التوقع</p>
              <h3 className="text-4xl font-bold">{predictions.nextMonth.confidence}%</h3>
              <div className="w-full bg-purple-400 rounded-full h-2 mt-2">
                <div 
                  className="bg-white h-full rounded-full"
                  style={{ width: `${predictions.nextMonth.confidence}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-purple-100 text-sm mb-2">الاتجاه</p>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8" />
                <div>
                  <h3 className="text-3xl font-bold">+{predictions.nextMonth.change}%</h3>
                  <p className="text-sm text-purple-100">عن هذا الشهر</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* أنماط الإنفاق */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* حسب اليوم */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-emerald-800">الإنفاق حسب اليوم</h2>
            </div>

            <div className="space-y-4">
              {spendingPatterns.byDayOfWeek.map((day, index) => {
                const heightPercentage = (day.amount / maxSpending) * 100

                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-emerald-800">{day.day}</span>
                      <span className="text-sm font-bold text-emerald-700">
                        {day.amount.toLocaleString('en-US')} ر.س
                      </span>
                    </div>
                    <div className="w-full bg-emerald-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full transition-all ${
                          day.isHighest 
                            ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                            : 'bg-gradient-to-r from-emerald-600 to-amber-600'
                        }`}
                        style={{ width: `${heightPercentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* حسب فترة الشهر */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-emerald-800">الإنفاق حسب فترة الشهر</h2>
            </div>

            <div className="space-y-6">
              {spendingPatterns.byTimeOfMonth.map((period, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-emerald-800">{period.period}</h3>
                      <p className="text-xs text-emerald-600">{period.percentage}% من الإجمالي</p>
                    </div>
                    <p className="text-lg font-bold text-emerald-700">
                      {period.amount.toLocaleString('en-US')} ر.س
                    </p>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-600 to-amber-600 transition-all flex items-center justify-end pr-2"
                      style={{ width: `${period.percentage}%` }}
                    >
                      <span className="text-xs font-bold text-white">{period.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* الرؤى والتحليلات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-emerald-800 mb-6">رؤى وتحليلات</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon
              const colors = {
                warning: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-600" },
                success: { bg: "bg-green-50", border: "border-green-200", icon: "text-green-600" },
                info: { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600" }
              }
              const color = colors[insight.type as keyof typeof colors]

              return (
                <div
                  key={index}
                  className={`${color.bg} border ${color.border} rounded-xl p-4`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${color.icon}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-emerald-800 mb-1">{insight.title}</h3>
                      <p className="text-sm text-emerald-700 mb-2">{insight.description}</p>
                      {insight.action && (
                        <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline">
                          {insight.action} ←
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* التوصيات للتوفير */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-emerald-800">توصيات للتوفير</h2>
          </div>

          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gradient-to-br from-emerald-50 to-amber-50 rounded-xl border border-emerald-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-emerald-800">{rec.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      rec.difficulty === "سهل جداً" ? "bg-green-100 text-green-700" :
                      rec.difficulty === "سهل" ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {rec.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-emerald-700">{rec.description}</p>
                </div>
                <div className="text-left flex-shrink-0">
                  <p className="text-xs text-emerald-600 mb-1">التوفير المحتمل</p>
                  <p className="text-2xl font-bold text-green-600">
                    {rec.savings.toLocaleString('en-US')}
                  </p>
                  <p className="text-xs text-emerald-500">ر.س / شهر</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-sm text-green-800">
              💰 <span className="font-bold">إجمالي التوفير المحتمل:</span> {recommendations.reduce((sum, r) => sum + r.savings, 0).toLocaleString('en-US')} ر.س شهرياً
              <span className="font-bold"> ({(recommendations.reduce((sum, r) => sum + r.savings, 0) * 12).toLocaleString('en-US')} ر.س سنوياً)</span>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
