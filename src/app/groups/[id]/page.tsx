"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Plus,
  Users,
  DollarSign,
  Calendar,
  UserPlus,
  TrendingDown,
  TrendingUp,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { getGroupReport, addGroupExpense } from "@/actions/group"

export default function GroupDetailPage() {
  const params = useParams()
  const groupId = params.id as string

  const [group, setGroup] = useState<any>(null)
  const [balances, setBalances] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [showAddExpense, setShowAddExpense] = useState(false)

  // نموذج إضافة مصروف
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadGroupData()
  }, [groupId])

  const loadGroupData = async () => {
    setIsLoading(true)
    const result = await getGroupReport(groupId)
    if (result.success && result.group) {
      setGroup(result.group)
      setBalances(result.balances || {})
    }
    setIsLoading(false)
  }

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || parseFloat(amount) <= 0) {
      alert("الرجاء إدخال مبلغ صحيح")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await addGroupExpense({
        groupId,
        amount: parseFloat(amount),
        description: description.trim() || undefined,
        category: category.trim() || undefined,
        splitType: "equal",
      })

      if (result.success) {
        setAmount("")
        setDescription("")
        setCategory("")
        setShowAddExpense(false)
        loadGroupData()
      } else {
        alert(result.error || "حدث خطأ")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("حدث خطأ غير متوقع")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
          <p className="mt-4 text-emerald-700">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-700">المجموعة غير موجودة</p>
          <Link href="/groups" className="text-emerald-600 hover:underline mt-4 inline-block">
            العودة للمجموعات
          </Link>
        </div>
      </div>
    )
  }

  const totalExpenses = group.expenses.reduce((sum: number, exp: any) => sum + exp.amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100">
      {/* الهيدر */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/groups"
                className="w-10 h-10 bg-white border border-emerald-200 rounded-lg flex items-center justify-center hover:bg-emerald-50 transition-colors shadow-sm"
              >
                <ArrowRight className="w-5 h-5 text-emerald-700" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-emerald-800">{group.name}</h1>
                <p className="text-sm text-emerald-600">{group.description || "مجموعة مشتركة"}</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddExpense(true)}
              className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              إضافة مصروف
            </button>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* إجمالي المصاريف */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-8 h-8 text-emerald-600" />
              <span className="text-gray-600">إجمالي المصاريف</span>
            </div>
            <div className="text-3xl font-bold text-emerald-700">{totalExpenses.toFixed(2)} ر.س</div>
          </motion.div>

          {/* عدد الأعضاء */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-amber-600" />
              <span className="text-gray-600">عدد الأعضاء</span>
            </div>
            <div className="text-3xl font-bold text-amber-700">{group.members.length}</div>
          </motion.div>

          {/* عدد المصاريف */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              <span className="text-gray-600">عدد المصاريف</span>
            </div>
            <div className="text-3xl font-bold text-blue-700">{group.expenses.length}</div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* الأرصدة */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-emerald-600" />
              الأرصدة
            </h2>
            <div className="space-y-3">
              {group.members.map((member: any) => {
                const balance = balances[member.userId] || 0
                return (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-amber-400 rounded-full flex items-center justify-center text-white font-bold">
                        {member.userId.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-800">عضو {member.userId.substring(0, 8)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {balance > 0 ? (
                        <>
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span className="font-bold text-green-600">+{balance.toFixed(2)} ر.س</span>
                        </>
                      ) : balance < 0 ? (
                        <>
                          <TrendingDown className="w-5 h-5 text-red-600" />
                          <span className="font-bold text-red-600">{balance.toFixed(2)} ر.س</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 text-gray-400" />
                          <span className="font-bold text-gray-400">متساوي</span>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* آخر المصاريف */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-emerald-600" />
              آخر المصاريف
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {group.expenses.length === 0 ? (
                <p className="text-gray-500 text-center py-8">لا توجد مصاريف بعد</p>
              ) : (
                group.expenses.slice(0, 10).map((expense: any) => (
                  <div key={expense.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800">
                        {expense.description || "مصروف"}
                      </span>
                      <span className="font-bold text-emerald-700">{expense.amount.toFixed(2)} ر.س</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{expense.category || "عام"}</span>
                      <span>{new Date(expense.date).toLocaleDateString("ar-SA")}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* نافذة إضافة مصروف */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">إضافة مصروف جديد</h2>
            <form onSubmit={handleAddExpense}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">المبلغ *</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">الوصف</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="مثال: فاتورة كهرباء"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">الفئة</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="مثال: فواتير"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:from-emerald-700 hover:to-amber-700 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "جاري الحفظ..." : "حفظ"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddExpense(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
