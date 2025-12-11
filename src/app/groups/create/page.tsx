"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Users, Home, Coffee, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createGroup } from "@/actions/group"

export default function CreateGroupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<"family" | "friends" | "roommates">("family")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const groupTypes = [
    {
      value: "family" as const,
      label: "عائلي",
      icon: Users,
      description: "لإدارة مصاريف العائلة المشتركة",
      color: "from-emerald-500 to-teal-600",
    },
    {
      value: "friends" as const,
      label: "أصدقاء",
      icon: Coffee,
      description: "لتقسيم المصاريف مع الأصدقاء",
      color: "from-amber-500 to-orange-600",
    },
    {
      value: "roommates" as const,
      label: "سكن مشترك",
      icon: Home,
      description: "لإدارة مصاريف السكن المشترك",
      color: "from-blue-500 to-cyan-600",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      alert("الرجاء إدخال اسم المجموعة")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createGroup({
        name: name.trim(),
        description: description.trim() || undefined,
        type,
      })

      if (result.success && result.group) {
        router.push(`/groups/${result.group.id}`)
      } else {
        alert(result.error || "حدث خطأ أثناء إنشاء المجموعة")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("حدث خطأ غير متوقع")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100">
      {/* الهيدر */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/groups"
              className="w-10 h-10 bg-white border border-emerald-200 rounded-lg flex items-center justify-center hover:bg-emerald-50 transition-colors shadow-sm"
            >
              <ArrowRight className="w-5 h-5 text-emerald-700" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-emerald-800">إنشاء مجموعة جديدة</h1>
              <p className="text-sm text-emerald-600">ابدأ بتتبع المصاريف المشتركة</p>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8"
        >
          {/* اسم المجموعة */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              اسم المجموعة <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: عائلة أحمد، شقة الرياض، رحلة جدة..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
              required
            />
          </div>

          {/* الوصف */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">الوصف (اختياري)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف مختصر للمجموعة..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* نوع المجموعة */}
          <div className="mb-8">
            <label className="block text-gray-700 font-bold mb-4">
              نوع المجموعة <span className="text-red-500">*</span>
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              {groupTypes.map((groupType) => {
                const Icon = groupType.icon
                const isSelected = type === groupType.value
                return (
                  <button
                    key={groupType.value}
                    type="button"
                    onClick={() => setType(groupType.value)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${groupType.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">{groupType.label}</h3>
                    <p className="text-sm text-gray-600">{groupType.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* زر الحفظ */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-8 py-4 rounded-xl font-bold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري الإنشاء...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  إنشاء المجموعة
                </>
              )}
            </button>
            <Link
              href="/groups"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
            >
              إلغاء
            </Link>
          </div>
        </motion.form>
      </main>
    </div>
  )
}
