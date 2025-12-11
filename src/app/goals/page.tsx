"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowRight,
  Plus,
  Target,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  TrendingUp,
  CheckCircle,
  X,
  Plane,
  Car,
  Home,
  GraduationCap,
  Heart,
  Sparkles
} from "lucide-react"
import Link from "next/link"

interface Goal {
  id: number
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  icon: string
  color: string
  category: string
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      name: "سيارة جديدة",
      targetAmount: 80000,
      currentAmount: 32000,
      deadline: "2026-06-01",
      icon: "🚗",
      color: "#3B82F6",
      category: "car"
    },
    {
      id: 2,
      name: "رحلة عائلية",
      targetAmount: 25000,
      currentAmount: 18500,
      deadline: "2025-12-01",
      icon: "✈️",
      color: "#10B981",
      category: "travel"
    },
    {
      id: 3,
      name: "صندوق الطوارئ",
      targetAmount: 50000,
      currentAmount: 12000,
      deadline: "2026-12-31",
      icon: "🛡️",
      color: "#F59E0B",
      category: "emergency"
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [addAmount, setAddAmount] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    deadline: "",
    icon: "🎯",
    category: "savings"
  })

  const iconOptions = ["🚗", "✈️", "🏠", "🎓", "💍", "📱", "🛡️", "🎯", "💰", "🎁"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newGoal: Goal = {
      id: Date.now(),
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: 0,
      deadline: formData.deadline,
      icon: formData.icon,
      color: "#10B981",
      category: formData.category
    }
    setGoals([...goals, newGoal])
    setShowModal(false)
    setFormData({ name: "", targetAmount: "", deadline: "", icon: "🎯", category: "savings" })
  }

  const handleAddMoney = () => {
    if (selectedGoal && addAmount) {
      setGoals(goals.map(g => 
        g.id === selectedGoal.id 
          ? { ...g, currentAmount: g.currentAmount + parseFloat(addAmount) }
          : g
      ))
      setShowAddMoneyModal(false)
      setAddAmount("")
      setSelectedGoal(null)
    }
  }

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا الهدف؟")) {
      setGoals(goals.filter(g => g.id !== id))
    }
  }

  const calculateProgress = (goal: Goal) => {
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
  }

  const calculateMonthlyRequired = (goal: Goal) => {
    const today = new Date()
    const deadline = new Date(goal.deadline)
    const monthsLeft = Math.max(1, Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)))
    const remaining = goal.targetAmount - goal.currentAmount
    return Math.ceil(remaining / monthsLeft)
  }

  const getDaysLeft = (deadline: string) => {
    const today = new Date()
    const target = new Date(deadline)
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

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
                <h1 className="text-2xl font-bold text-emerald-800">الأهداف المالية</h1>
                <p className="text-sm text-emerald-600">حدد أهدافك وتتبع تقدمك</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">إضافة هدف</span>
            </button>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* الأهداف */}
        {goals.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal, index) => {
              const progress = calculateProgress(goal)
              const monthlyRequired = calculateMonthlyRequired(goal)
              const daysLeft = getDaysLeft(goal.deadline)
              const isCompleted = progress >= 100

              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border overflow-hidden ${
                    isCompleted ? 'border-green-300' : 'border-emerald-100'
                  }`}
                >
                  {/* رأس البطاقة */}
                  <div 
                    className="p-6 pb-4"
                    style={{ backgroundColor: `${goal.color}15` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{goal.icon}</div>
                        <div>
                          <h3 className="font-bold text-emerald-800">{goal.name}</h3>
                          <p className="text-xs text-emerald-600">
                            {daysLeft > 0 ? `${daysLeft} يوم متبقي` : 'انتهى الموعد'}
                          </p>
                        </div>
                      </div>
                      {!isCompleted && (
                        <div className="flex gap-1">
                          <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-emerald-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(goal.id)}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      )}
                    </div>

                    {isCompleted && (
                      <div className="bg-green-100 border border-green-300 rounded-lg p-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-bold text-green-700">تم تحقيق الهدف! 🎉</span>
                      </div>
                    )}
                  </div>

                  {/* التقدم */}
                  <div className="p-6 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-emerald-600">التقدم</span>
                      <span className="text-lg font-bold text-emerald-800">
                        {progress.toFixed(0)}%
                      </span>
                    </div>

                    <div className="w-full bg-emerald-100 rounded-full h-3 overflow-hidden mb-4">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          isCompleted 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : 'bg-gradient-to-r from-emerald-600 to-amber-600'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-emerald-600">المبلغ الحالي</span>
                        <span className="font-bold text-emerald-800">
                          {goal.currentAmount.toLocaleString('en-US')} ر.س
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-emerald-600">المبلغ المستهدف</span>
                        <span className="font-bold text-emerald-800">
                          {goal.targetAmount.toLocaleString('en-US')} ر.س
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-emerald-600">المتبقي</span>
                        <span className="font-bold text-red-600">
                          {(goal.targetAmount - goal.currentAmount).toLocaleString('en-US')} ر.س
                        </span>
                      </div>
                    </div>

                    {!isCompleted && (
                      <>
                        <div className="mt-4 pt-4 border-t border-emerald-100">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs text-emerald-600">احفظ شهرياً:</span>
                          </div>
                          <p className="text-2xl font-bold text-emerald-700">
                            {monthlyRequired.toLocaleString('en-US')} ر.س
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedGoal(goal)
                            setShowAddMoneyModal(true)
                          }}
                          className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          إضافة مبلغ
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-12 text-center"
          >
            <Target className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-emerald-800 mb-2">لا توجد أهداف مالية</h3>
            <p className="text-emerald-600 mb-6">ابدأ بتحديد هدفك المالي الأول</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              إضافة هدف
            </button>
          </motion.div>
        )}

        {/* نصيحة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3"
        >
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            💡
          </div>
          <div>
            <h3 className="font-bold text-amber-800 mb-1">نصيحة</h3>
            <p className="text-sm text-amber-700">
              حدد أهدافاً واقعية وقابلة للقياس. ابدأ بأهداف صغيرة وزد تدريجياً. الأهداف الواضحة تزيد فرص النجاح بنسبة 80%.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Modal إضافة هدف */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-emerald-800">إضافة هدف مالي</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      اسم الهدف
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="مثال: سيارة جديدة"
                      required
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      الأيقونة
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {iconOptions.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon })}
                          className={`text-3xl p-3 rounded-lg border-2 transition-all ${
                            formData.icon === icon
                              ? 'border-emerald-500 bg-emerald-50 scale-110'
                              : 'border-emerald-200 hover:border-emerald-300'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      المبلغ المستهدف (ر.س)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.targetAmount}
                      onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                      placeholder="0.00"
                      required
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      الموعد المستهدف
                    </label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-lg font-bold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg"
                    >
                      إضافة
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-3 border-2 border-emerald-200 rounded-lg font-bold text-emerald-800 hover:bg-emerald-50 transition-all"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal إضافة مبلغ */}
      <AnimatePresence>
        {showAddMoneyModal && selectedGoal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowAddMoneyModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-emerald-800">إضافة مبلغ للهدف</h2>
                  <button
                    onClick={() => setShowAddMoneyModal(false)}
                    className="w-8 h-8 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="mb-6 p-4 bg-emerald-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{selectedGoal.icon}</span>
                    <span className="font-bold text-emerald-800">{selectedGoal.name}</span>
                  </div>
                  <p className="text-sm text-emerald-600">
                    المبلغ الحالي: {selectedGoal.currentAmount.toLocaleString('en-US')} ر.س
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      المبلغ المضاف (ر.س)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                      placeholder="0.00"
                      autoFocus
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none text-2xl font-bold"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddMoney}
                      disabled={!addAmount}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-lg font-bold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg disabled:opacity-50"
                    >
                      إضافة
                    </button>
                    <button
                      onClick={() => setShowAddMoneyModal(false)}
                      className="px-6 py-3 border-2 border-emerald-200 rounded-lg font-bold text-emerald-800 hover:bg-emerald-50 transition-all"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
