"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  ArrowRight,
  Edit,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle
} from "lucide-react"
import Link from "next/link"
import { categories } from "@/data/categories"

interface Budget {
  categoryId: number
  amount: number
  spent: number
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([
    { categoryId: 1, amount: 2000, spent: 1650 },
    { categoryId: 2, amount: 1200, spent: 890 },
    { categoryId: 3, amount: 3500, spent: 3500 },
    { categoryId: 4, amount: 800, spent: 620 },
    { categoryId: 5, amount: 600, spent: 450 },
  ])

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editAmount, setEditAmount] = useState("")

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
  const remaining = totalBudget - totalSpent

  const handleEdit = (categoryId: number, currentAmount: number) => {
    setEditingId(categoryId)
    setEditAmount(currentAmount.toString())
  }

  const handleSave = (categoryId: number) => {
    setBudgets(budgets.map(b => 
      b.categoryId === categoryId 
        ? { ...b, amount: parseFloat(editAmount) || 0 }
        : b
    ))
    setEditingId(null)
  }

  const getStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100
    if (percentage >= 110) return { color: "red", text: "تجاوز الحد", icon: TrendingDown }
    if (percentage >= 90) return { color: "orange", text: "قريب من الحد", icon: AlertCircle }
    return { color: "green", text: "ضمن الحد", icon: CheckCircle }
  }

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
              <h1 className="text-2xl font-bold text-emerald-800">الميزانيات</h1>
              <p className="text-sm text-emerald-600">إدارة ميزانيتك الشهرية</p>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* ملخص إجمالي */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
          >
            <p className="text-sm text-emerald-600 mb-2">الميزانية الإجمالية</p>
            <h3 className="text-3xl font-bold text-emerald-800">
              {totalBudget.toLocaleString('en-US') } ر.س
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
          >
            <p className="text-sm text-emerald-600 mb-2">المصروف</p>
            <h3 className="text-3xl font-bold text-red-600">
              {totalSpent.toLocaleString('en-US') } ر.س
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
          >
            <p className="text-sm text-emerald-600 mb-2">المتبقي</p>
            <h3 className={`text-3xl font-bold ${remaining >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
              {remaining.toLocaleString('en-US') } ر.س
            </h3>
          </motion.div>
        </div>

        {/* قائمة الميزانيات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 overflow-hidden"
        >
          <div className="p-6 border-b border-emerald-100">
            <h2 className="text-xl font-bold text-emerald-800">ميزانيات الفئات</h2>
          </div>

          <div className="divide-y divide-emerald-100">
            {budgets.map((budget) => {
              const category = categories.find(c => c.id === budget.categoryId)
              if (!category) return null

              const percentage = (budget.spent / budget.amount) * 100
              const status = getStatus(budget.spent, budget.amount)
              const StatusIcon = status.icon

              return (
                <div key={budget.categoryId} className="p-6 hover:bg-emerald-50/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-emerald-800">{category.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <StatusIcon className={`w-4 h-4 text-${status.color}-600`} />
                          <span className={`text-xs text-${status.color}-600`}>{status.text}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left">
                      {editingId === budget.categoryId ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={editAmount}
                            onChange={(e) => setEditAmount(e.target.value)}
                            className="w-24 px-2 py-1 border-2 border-emerald-300 rounded-lg text-sm text-emerald-800 font-semibold"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSave(budget.categoryId)}
                            className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700"
                          >
                            حفظ
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-400"
                          >
                            إلغاء
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="text-xs text-emerald-600">الميزانية</p>
                            <p className="text-lg font-bold text-emerald-800">
                              {budget.amount.toLocaleString('en-US') } ر.س
                            </p>
                          </div>
                          <button
                            onClick={() => handleEdit(budget.categoryId, budget.amount)}
                            className="p-2 hover:bg-emerald-100 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4 text-emerald-600" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-emerald-600">
                        {budget.spent.toLocaleString('en-US') } ر.س من {budget.amount.toLocaleString('en-US') } ر.س
                      </span>
                      <span className="font-bold text-emerald-800">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-emerald-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          percentage >= 110 ? 'bg-red-500' :
                          percentage >= 90 ? 'bg-orange-500' :
                          'bg-gradient-to-r from-emerald-600 to-amber-600'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* نصيحة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3"
        >
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            💡
          </div>
          <div>
            <h3 className="font-bold text-amber-800 mb-1">نصيحة</h3>
            <p className="text-sm text-amber-700">
              راجع ميزانياتك شهرياً وعدّلها حسب احتياجاتك. حاول توفير 10-20% من دخلك للطوارئ.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

