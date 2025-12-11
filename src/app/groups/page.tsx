"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  ArrowRight,
  Plus,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Settings
} from "lucide-react"
import Link from "next/link"
import { getUserGroups } from "@/actions/group"

interface Group {
  id: string
  name: string
  description: string | null
  type: string
  createdAt: Date
  _count: {
    members: number
    expenses: number
  }
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadGroups()
  }, [])

  const loadGroups = async () => {
    setIsLoading(true)
    const result = await getUserGroups()
    if (result.success && result.groups) {
      setGroups(result.groups as any)
    }
    setIsLoading(false)
  }

  const getGroupTypeLabel = (type: string) => {
    switch (type) {
      case "family":
        return "عائلي"
      case "friends":
        return "أصدقاء"
      case "roommates":
        return "سكن مشترك"
      default:
        return type
    }
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
                <h1 className="text-2xl font-bold text-emerald-800">المجموعات المشتركة</h1>
                <p className="text-sm text-emerald-600">إدارة المصاريف مع العائلة والأصدقاء</p>
              </div>
            </div>
            <Link
              href="/groups/create"
              className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              مجموعة جديدة
            </Link>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
            <p className="mt-4 text-emerald-700">جاري التحميل...</p>
          </div>
        ) : groups.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-12 text-center"
          >
            <Users className="w-20 h-20 text-emerald-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">لا توجد مجموعات بعد</h2>
            <p className="text-gray-600 mb-6">
              أنشئ مجموعة جديدة لبدء تتبع المصاريف المشتركة مع العائلة أو الأصدقاء
            </p>
            <Link
              href="/groups/create"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" />
              إنشاء مجموعة
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/groups/${group.id}`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6 hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                        {getGroupTypeLabel(group.type)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">{group.name}</h3>
                    {group.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{group.description}</p>
                    )}

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                      <div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                          <Users className="w-4 h-4" />
                          الأعضاء
                        </div>
                        <div className="text-2xl font-bold text-emerald-700">
                          {group._count.members}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                          <DollarSign className="w-4 h-4" />
                          المصاريف
                        </div>
                        <div className="text-2xl font-bold text-amber-600">
                          {group._count.expenses}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
