"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { 
  ArrowRight,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  Lightbulb,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { categories } from "@/data/categories"

export default function ReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState("2025-12")
  const [isLoading, setIsLoading] = useState(true)
  const [totalIncome, setTotalIncome] = useState(0)

  // جلب بيانات الدخل
  const fetchIncomeData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/income?month=${selectedMonth}`)
      if (response.ok) {
        const data = await response.json()
        setTotalIncome(data.totalIncome || 0)
      }
    } catch (error) {
      console.error("Error fetching income:", error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedMonth])

  useEffect(() => {
    fetchIncomeData()
  }, [fetchIncomeData])

  // بيانات وهمية مع دمج الدخل الحقيقي
  const currentMonthData = {
    income: totalIncome || 15000,
    expenses: 8450,
    savings: (totalIncome || 15000) - 8450,
    previousMonth: {
      expenses: 7200,
      change: 17.4
    }
  }

  const topCategories = [
    { categoryId: 3, spent: 3500, percentage: 41 },
    { categoryId: 1, spent: 1850, percentage: 22 },
    { categoryId: 2, spent: 1200, percentage: 14 },
    { categoryId: 4, spent: 800, percentage: 9 },
    { categoryId: 5, spent: 650, percentage: 8 }
  ]

  const monthlyComparison = [
    { month: "يوليو", expenses: 7800 },
    { month: "أغسطس", expenses: 7200 },
    { month: "سبتمبر", expenses: 8100 },
    { month: "أكتوبر", expenses: 7900 },
    { month: "نوفمبر", expenses: 8450 }
  ]

  const insights = [
    "مصاريف السكن هذا الشهر تمثل 41% من إجمالي المصاريف، حاول تقليلها بنسبة 10%",
    "مصاريف الطعام زادت بنسبة 15% عن الشهر الماضي، راجع مشترياتك",
    "أنت تدخر 43% من دخلك، معدل ممتاز! استمر على هذا النهج",
    "يمكنك توفير 500 ر.س شهرياً بتقليل مصاريف المطاعم"
  ]

  const handleDownloadPDF = () => {
    alert("سيتم تنزيل التقرير PDF قريباً!")
  }

  const maxExpense = Math.max(...monthlyComparison.map(m => m.expenses))

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100">
      {/* الهيدر */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="w-10 h-10 bg-white border border-emerald-200 rounded-lg flex items-center justify-center hover:bg-emerald-50 transition-colors shadow-sm"
              >
                <ArrowRight className="w-5 h-5 text-emerald-700" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-emerald-800">التقارير المالية</h1>
                <p className="text-sm text-emerald-600">تحليل شامل لمصاريفك</p>
              </div>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">تحميل PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* اختيار الشهر */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-4">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white"
              >
                <option value="2025-11">نوفمبر 2025</option>
                <option value="2025-10">أكتوبر 2025</option>
                <option value="2025-09">سبتمبر 2025</option>
                <option value="2025-08">أغسطس 2025</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* ملخص الشهر */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-emerald-600">إجمالي الدخل</p>
                <h3 className="text-3xl font-bold text-emerald-700">
                  {currentMonthData.income.toLocaleString('en-US') }
                </h3>
                <p className="text-xs text-emerald-500 mt-1">ر.س</p>
              </div>
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-emerald-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-emerald-600">إجمالي المصاريف</p>
                <h3 className="text-3xl font-bold text-red-600">
                  {currentMonthData.expenses.toLocaleString('en-US') }
                </h3>
                <p className="text-xs text-emerald-500 mt-1">ر.س</p>
              </div>
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <TrendingDown className="w-7 h-7 text-red-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className={`font-bold ${currentMonthData.previousMonth.change > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                {currentMonthData.previousMonth.change > 0 ? '+' : ''}{currentMonthData.previousMonth.change}%
              </span>
              <span className="text-emerald-600">عن الشهر الماضي</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-emerald-600">الادخار</p>
                <h3 className="text-3xl font-bold text-emerald-700">
                  {currentMonthData.savings.toLocaleString('en-US') }
                </h3>
                <p className="text-xs text-emerald-500 mt-1">ر.س</p>
              </div>
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-emerald-600" />
              </div>
            </div>
            <div className="text-sm text-emerald-600">
              <span className="font-bold">43%</span> من الدخل
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* أفضل 5 فئات */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-emerald-800">أكثر 5 فئات إنفاقاً</h2>
            </div>

            <div className="space-y-4">
              {topCategories.map((item) => {
                const category = categories.find(c => c.id === item.categoryId)
                if (!category) return null

                return (
                  <div key={item.categoryId}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          {category.icon}
                        </div>
                        <span className="font-semibold text-emerald-800">{category.name}</span>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-emerald-800">
                          {item.spent.toLocaleString('en-US') } ر.س
                        </p>
                        <p className="text-xs text-emerald-600">{item.percentage}%</p>
                      </div>
                    </div>
                    <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-600 to-amber-600 transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* مقارنة آخر 5 شهور */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-emerald-800">مقارنة آخر 5 شهور</h2>
            </div>

            <div className="space-y-4">
              {monthlyComparison.map((item, index) => {
                const heightPercentage = (item.expenses / maxExpense) * 100
                const isCurrentMonth = index === monthlyComparison.length - 1

                return (
                  <div key={index} className="flex items-end gap-3">
                    <div className="w-20 text-sm font-semibold text-emerald-700">
                      {item.month}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-emerald-100 rounded-full h-8 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 flex items-center justify-end pr-3 ${
                              isCurrentMonth
                                ? 'bg-gradient-to-r from-emerald-600 to-amber-600'
                                : 'bg-emerald-300'
                            }`}
                            style={{ width: `${heightPercentage}%` }}
                          >
                            <span className="text-xs font-bold text-white">
                              {item.expenses.toLocaleString('en-US') }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 text-xs text-emerald-600">
              💡 متوسط آخر 3 شهور: {((7200 + 8100 + 7900) / 3).toFixed(0)} ر.س
            </div>
          </motion.div>
        </div>

        {/* التوصيات والنصائح */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-bold text-emerald-800">نصائح ذكية للتوفير</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gradient-to-br from-amber-50 to-emerald-50 rounded-lg border border-amber-200"
              >
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-amber-700">{index + 1}</span>
                </div>
                <p className="text-sm text-emerald-800 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
