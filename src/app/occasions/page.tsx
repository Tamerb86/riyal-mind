"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowRight,
  Plus,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  Gift,
  GraduationCap,
  Heart,
  PartyPopper,
  Home,
  X
} from "lucide-react"
import Link from "next/link"

interface Occasion {
  id: number
  name: string
  type: string
  date: string
  budget: number
  spent: number
  icon: string
  color: string
}

export default function OccasionsPage() {
  const [occasions, setOccasions] = useState<Occasion[]>([
    {
      id: 1,
      name: "رمضان 2026",
      type: "religious",
      date: "2026-03-01",
      budget: 5000,
      spent: 0,
      icon: "🌙",
      color: "#8B5CF6"
    },
    {
      id: 2,
      name: "عيد الفطر",
      type: "religious",
      date: "2026-03-31",
      budget: 3000,
      spent: 0,
      icon: "🎉",
      color: "#10B981"
    },
    {
      id: 3,
      name: "العودة للمدارس",
      type: "education",
      date: "2026-09-01",
      budget: 4000,
      spent: 0,
      icon: "🎒",
      color: "#F59E0B"
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "religious",
    date: "",
    budget: "",
    icon: "🎉"
  })

  const occasionTypes = [
    { value: "religious", label: "ديني", icon: "🌙" },
    { value: "education", label: "تعليمي", icon: "🎓" },
    { value: "family", label: "عائلي", icon: "❤️" },
    { value: "celebration", label: "احتفال", icon: "🎉" },
    { value: "other", label: "أخرى", icon: "📅" }
  ]

  const iconOptions = ["🌙", "🎉", "🎒", "🎓", "❤️", "🎁", "🏠", "✈️", "🎂", "💍"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      setOccasions(occasions.map(o => 
        o.id === editingId 
          ? {
              ...o,
              name: formData.name,
              type: formData.type,
              date: formData.date,
              budget: parseFloat(formData.budget),
              icon: formData.icon
            }
          : o
      ))
    } else {
      const newOccasion: Occasion = {
        id: Date.now(),
        name: formData.name,
        type: formData.type,
        date: formData.date,
        budget: parseFloat(formData.budget),
        spent: 0,
        icon: formData.icon,
        color: occasionTypes.find(t => t.value === formData.type)?.icon === "🌙" ? "#8B5CF6" : "#10B981"
      }
      setOccasions([...occasions, newOccasion])
    }
    
    setShowModal(false)
    setEditingId(null)
    setFormData({ name: "", type: "religious", date: "", budget: "", icon: "🎉" })
  }

  const handleEdit = (occasion: Occasion) => {
    setEditingId(occasion.id)
    setFormData({
      name: occasion.name,
      type: occasion.type,
      date: occasion.date,
      budget: occasion.budget.toString(),
      icon: occasion.icon
    })
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذه المناسبة؟")) {
      setOccasions(occasions.filter(o => o.id !== id))
    }
  }

  const getDaysRemaining = (date: string) => {
    const today = new Date()
    const occasionDate = new Date(date)
    const diff = Math.ceil((occasionDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const upcomingOccasions = occasions
    .filter(o => getDaysRemaining(o.date) >= 0)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

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
                <h1 className="text-2xl font-bold text-emerald-800">المناسبات</h1>
                <p className="text-sm text-emerald-600">خطط لميزانية المناسبات القادمة</p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingId(null)
                setFormData({ name: "", type: "religious", date: "", budget: "", icon: "🎉" })
                setShowModal(true)
              }}
              className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">إضافة مناسبة</span>
            </button>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* المناسبات القادمة */}
        {upcomingOccasions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingOccasions.map((occasion, index) => {
              const daysRemaining = getDaysRemaining(occasion.date)
              const percentage = (occasion.spent / occasion.budget) * 100

              return (
                <motion.div
                  key={occasion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 overflow-hidden"
                >
                  {/* رأس البطاقة */}
                  <div 
                    className="p-6 pb-4"
                    style={{ backgroundColor: `${occasion.color}15` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{occasion.icon}</div>
                        <div>
                          <h3 className="font-bold text-emerald-800">{occasion.name}</h3>
                          <p className="text-xs text-emerald-600">
                            {occasionTypes.find(t => t.value === occasion.type)?.label}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(occasion)}
                          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-emerald-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(occasion.id)}
                          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>

                    {/* العد التنازلي */}
                    <div className="bg-white/70 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-emerald-800">
                        {daysRemaining}
                      </div>
                      <div className="text-xs text-emerald-600">
                        {daysRemaining === 0 ? "اليوم" : daysRemaining === 1 ? "غداً" : "يوم متبقي"}
                      </div>
                    </div>
                  </div>

                  {/* الميزانية */}
                  <div className="p-6 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-emerald-600">الميزانية</span>
                      <span className="text-lg font-bold text-emerald-800">
                        {occasion.budget.toLocaleString('en-US') } ر.س
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="text-emerald-600">المصروف</span>
                      <span className="font-semibold text-emerald-800">
                        {occasion.spent.toLocaleString('en-US') } ر.س
                      </span>
                    </div>

                    <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-600 to-amber-600 transition-all"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>

                    <div className="flex items-center gap-2 mt-3 text-xs text-emerald-600">
                      <Calendar className="w-3 h-3" />
                      {new Date(occasion.date).toLocaleDateString('ar-SA', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
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
            <Gift className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-emerald-800 mb-2">لا توجد مناسبات قادمة</h3>
            <p className="text-emerald-600 mb-6">ابدأ بإضافة مناسبة جديدة لتخطيط ميزانيتك</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              إضافة مناسبة
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
              خطط لميزانية المناسبات مسبقاً بـ 2-3 أشهر لتجنب المفاجآت. رمضان والعيد والمدارس من أكبر المناسبات تأثيراً على الميزانية.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Modal إضافة/تعديل */}
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
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-emerald-800">
                    {editingId ? "تعديل مناسبة" : "إضافة مناسبة جديدة"}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* الاسم */}
                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      اسم المناسبة
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="مثال: رمضان 2026"
                      required
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* النوع */}
                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      نوع المناسبة
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white"
                    >
                      {occasionTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* الأيقونة */}
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

                  {/* التاريخ */}
                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      التاريخ
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* الميزانية */}
                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      الميزانية المخصصة (ر.س)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="0.00"
                      required
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* الأزرار */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-lg font-bold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg"
                    >
                      {editingId ? "تحديث" : "إضافة"}
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
    </div>
  )
}
