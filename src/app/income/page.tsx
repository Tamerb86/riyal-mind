"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { 
  ArrowRight,
  Plus,
  Trash2,
  DollarSign,
  Calendar,
  TrendingUp,
  Wallet,
  Loader2,
  Briefcase,
  PiggyBank,
  Users
} from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

// Types
type IncomeType = "PRIMARY" | "SECONDARY" | "SHARED"

interface Income {
  id: string
  amount: number
  description: string | null
  source: string | null
  type: IncomeType
  groupId: string | null
  date: string
  createdAt: string
}

interface IncomeResponse {
  incomes: Income[]
  totalIncome: number
  primaryIncome: number
  secondaryIncome: number
  sharedIncome: number
  count: number
}

interface Group {
  id: string
  name: string
}

export default function IncomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // State
  const [incomes, setIncomes] = useState<Income[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [totalIncome, setTotalIncome] = useState(0)
  const [primaryIncome, setPrimaryIncome] = useState(0)
  const [secondaryIncome, setSecondaryIncome] = useState(0)
  const [sharedIncome, setSharedIncome] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  // Form state
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [source, setSource] = useState("")
  const [incomeType, setIncomeType] = useState<IncomeType>("PRIMARY")
  const [selectedGroupId, setSelectedGroupId] = useState<string>("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  // Income type options
  const incomeTypes = [
    {
      value: "PRIMARY" as IncomeType,
      label: "دخل أساسي",
      description: "الراتب الشهري أو الدخل الثابت",
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500"
    },
    {
      value: "SECONDARY" as IncomeType,
      label: "دخل جانبي",
      description: "عمل حر، استثمار، أو دخل إضافي",
      icon: PiggyBank,
      color: "from-purple-500 to-pink-500"
    },
    {
      value: "SHARED" as IncomeType,
      label: "دخل مشترك",
      description: "دخل مشترك مع العائلة أو الأصدقاء",
      icon: Users,
      color: "from-orange-500 to-red-500"
    }
  ]

  // Fetch incomes
  const fetchIncomes = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch("/api/income")
      
      if (!response.ok) {
        throw new Error("فشل في جلب البيانات")
      }
      
      const data: IncomeResponse = await response.json()
      setIncomes(data.incomes)
      setTotalIncome(data.totalIncome)
      setPrimaryIncome(data.primaryIncome || 0)
      setSecondaryIncome(data.secondaryIncome || 0)
      setSharedIncome(data.sharedIncome || 0)
    } catch (err) {
      setError("فشل في جلب البيانات")
      console.error("Error fetching incomes:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch groups
  const fetchGroups = useCallback(async () => {
    try {
      const response = await fetch("/api/groups")
      if (response.ok) {
        const data = await response.json()
        setGroups(data.groups || [])
      }
    } catch (err) {
      console.error("Error fetching groups:", err)
    }
  }, [])

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  // Fetch data on mount
  useEffect(() => {
    if (status === "authenticated") {
      fetchIncomes()
      fetchGroups()
    }
  }, [status, fetchIncomes, fetchGroups])

  // Clear messages after 3 seconds
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage(null)
        setError(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, error])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      setError("المبلغ يجب أن يكون أكبر من صفر")
      return
    }

    if (incomeType === "SHARED" && !selectedGroupId) {
      setError("يرجى اختيار مجموعة للدخل المشترك")
      return
    }

    try {
      setIsSaving(true)
      setError(null)
      
      const response = await fetch("/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountNum,
          description: description || null,
          source: source || null,
          type: incomeType,
          groupId: incomeType === "SHARED" ? selectedGroupId : null,
          date,
        }),
      })

      if (!response.ok) {
        throw new Error("فشل في حفظ الدخل")
      }

      setSuccessMessage("تم حفظ الدخل بنجاح")
      setShowAddForm(false)
      resetForm()
      fetchIncomes()
    } catch (err) {
      setError("فشل في حفظ الدخل")
      console.error("Error saving income:", err)
    } finally {
      setIsSaving(false)
    }
  }

  const resetForm = () => {
    setAmount("")
    setDescription("")
    setSource("")
    setIncomeType("PRIMARY")
    setSelectedGroupId("")
    setDate(new Date().toISOString().split("T")[0])
  }

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الدخل؟")) return

    try {
      const response = await fetch(`/api/income/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("فشل في حذف الدخل")
      }

      setSuccessMessage("تم حذف الدخل بنجاح")
      fetchIncomes()
    } catch (err) {
      setError("فشل في حذف الدخل")
      console.error("Error deleting income:", err)
    }
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "اليوم"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "أمس"
    }
    
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  // Get income type info
  const getIncomeTypeInfo = (type: IncomeType) => {
    return incomeTypes.find(t => t.value === type) || incomeTypes[0]
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100 flex items-center justify-center">
        <div className="flex items-center gap-3 text-emerald-700">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>جاري التحميل...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100" dir="rtl">
      {/* Header */}
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
                <h1 className="text-2xl font-bold text-emerald-800">إدارة الدخل</h1>
                <p className="text-sm text-emerald-600">تتبع وإدارة مصادر دخلك</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">إضافة دخل</span>
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      {(error || successMessage) && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              error 
                ? "bg-red-50 border border-red-200 text-red-700" 
                : "bg-green-50 border border-green-200 text-green-700"
            }`}
          >
            {error || successMessage}
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Income */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <Wallet className="w-10 h-10 opacity-80" />
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-emerald-100 text-sm mb-1">إجمالي الدخل</p>
            <h3 className="text-3xl font-bold">{totalIncome.toLocaleString()} <span className="text-lg">ر.س</span></h3>
          </motion.div>

          {/* Primary Income */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <Briefcase className="w-10 h-10 opacity-80" />
            </div>
            <p className="text-blue-100 text-sm mb-1">دخل أساسي</p>
            <h3 className="text-3xl font-bold">{primaryIncome.toLocaleString()} <span className="text-lg">ر.س</span></h3>
          </motion.div>

          {/* Secondary Income */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <PiggyBank className="w-10 h-10 opacity-80" />
            </div>
            <p className="text-purple-100 text-sm mb-1">دخل جانبي</p>
            <h3 className="text-3xl font-bold">{secondaryIncome.toLocaleString()} <span className="text-lg">ر.س</span></h3>
          </motion.div>

          {/* Shared Income */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 opacity-80" />
            </div>
            <p className="text-orange-100 text-sm mb-1">دخل مشترك</p>
            <h3 className="text-3xl font-bold">{sharedIncome.toLocaleString()} <span className="text-lg">ر.س</span></h3>
          </motion.div>
        </div>

        {/* Add Income Form Modal */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => !isSaving && setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">إضافة دخل جديد</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Income Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    نوع الدخل
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {incomeTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setIncomeType(type.value)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            incomeType === type.value
                              ? `border-transparent bg-gradient-to-br ${type.color} text-white shadow-lg`
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                        >
                          <Icon className={`w-8 h-8 mb-2 mx-auto ${
                            incomeType === type.value ? "text-white" : "text-gray-600"
                          }`} />
                          <p className={`font-semibold text-sm mb-1 ${
                            incomeType === type.value ? "text-white" : "text-gray-900"
                          }`}>
                            {type.label}
                          </p>
                          <p className={`text-xs ${
                            incomeType === type.value ? "text-white/80" : "text-gray-500"
                          }`}>
                            {type.description}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Group Selection (for shared income) */}
                {incomeType === "SHARED" && (
                  <div>
                    <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-2">
                      المجموعة <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="group"
                      value={selectedGroupId}
                      onChange={(e) => setSelectedGroupId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      required
                    >
                      <option value="">اختر مجموعة</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                    {groups.length === 0 && (
                      <p className="text-sm text-amber-600 mt-2">
                        لا توجد مجموعات. <Link href="/groups/create" className="underline">أنشئ مجموعة أولاً</Link>
                      </p>
                    )}
                  </div>
                )}

                {/* Amount */}
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    المبلغ <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      step="0.01"
                      min="0"
                      className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Source */}
                <div>
                  <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-2">
                    المصدر (اختياري)
                  </label>
                  <input
                    type="text"
                    id="source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="مثال: راتب شهر ديسمبر، مشروع تصميم..."
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    الوصف (اختياري)
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    placeholder="أضف ملاحظات أو تفاصيل إضافية..."
                  />
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    التاريخ
                  </label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-amber-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      "حفظ"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    disabled={isSaving}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Incomes List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">الدخول المسجلة</h2>
            <p className="text-sm text-gray-600 mt-1">{incomes.length} إدخال</p>
          </div>

          {incomes.length === 0 ? (
            <div className="p-12 text-center">
              <Wallet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">لا توجد إدخالات دخل بعد</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg"
              >
                أضف أول دخل لك
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {incomes.map((income, index) => {
                const typeInfo = getIncomeTypeInfo(income.type)
                if (!typeInfo) return null
                const TypeIcon = typeInfo.icon
                
                return (
                  <motion.div
                    key={income.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${typeInfo.color} flex items-center justify-center shadow-lg`}>
                          <TypeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {income.source || typeInfo.label}
                            </h3>
                            <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${typeInfo.color} text-white`}>
                              {typeInfo.label}
                            </span>
                          </div>
                          {income.description && (
                            <p className="text-sm text-gray-600 mb-1">{income.description}</p>
                          )}
                          <p className="text-xs text-gray-500">{formatDate(income.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-left">
                          <p className="text-2xl font-bold text-emerald-600">
                            {income.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">ر.س</p>
                        </div>
                        <button
                          onClick={() => handleDelete(income.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
