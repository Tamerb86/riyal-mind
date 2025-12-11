"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  ArrowRight,
  Bell,
  AlertCircle,
  TrendingUp,
  Calendar,
  Target,
  Users,
  Settings,
  Check,
  Trash2,
  Filter
} from "lucide-react"
import Link from "next/link"

interface Notification {
  id: number
  type: "budget" | "goal" | "occasion" | "report" | "family"
  title: string
  description: string
  time: string
  read: boolean
  icon: any
  color: string
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "budget",
      title: "تجاوز ميزانية الطعام",
      description: "تجاوزت ميزانية الطعام بنسبة 15% هذا الشهر",
      time: "منذ ساعة",
      read: false,
      icon: AlertCircle,
      color: "#EF4444"
    },
    {
      id: 2,
      type: "goal",
      title: "اقتربت من هدفك!",
      description: "وصلت إلى 80% من هدف 'رحلة عائلية'",
      time: "منذ 3 ساعات",
      read: false,
      icon: Target,
      color: "#10B981"
    },
    {
      id: 3,
      type: "occasion",
      title: "مناسبة قادمة",
      description: "رمضان 2026 بعد 30 يوماً - ميزانية 5,000 ر.س",
      time: "منذ يوم",
      read: true,
      icon: Calendar,
      color: "#8B5CF6"
    },
    {
      id: 4,
      type: "report",
      title: "تقرير شهري جاهز",
      description: "تقرير أكتوبر 2025 جاهز للتحميل",
      time: "منذ يومين",
      read: true,
      icon: TrendingUp,
      color: "#F59E0B"
    },
    {
      id: 5,
      type: "family",
      title: "عضو جديد انضم",
      description: "سارة علي قبلت دعوتك للحساب العائلي",
      time: "منذ 3 أيام",
      read: true,
      icon: Users,
      color: "#3B82F6"
    },
    {
      id: 6,
      type: "budget",
      title: "تحذير: اقتربت من الحد",
      description: "وصلت إلى 90% من ميزانية السكن",
      time: "منذ 4 أيام",
      read: true,
      icon: AlertCircle,
      color: "#F59E0B"
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(n => !n.read)

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const handleClearAll = () => {
    if (confirm("هل تريد حذف جميع الإشعارات؟")) {
      setNotifications([])
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
                <h1 className="text-2xl font-bold text-emerald-800">الإشعارات</h1>
                <p className="text-sm text-emerald-600">
                  {unreadCount > 0 ? `${unreadCount} إشعار جديد` : 'لا توجد إشعارات جديدة'}
                </p>
              </div>
            </div>
            <Link
              href="/settings"
              className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-emerald-600" />
            </Link>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* الفلاتر والإجراءات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-4 mb-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-emerald-600" />
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === "all"
                    ? 'bg-gradient-to-r from-emerald-600 to-amber-600 text-white shadow-lg'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                الكل ({notifications.length})
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === "unread"
                    ? 'bg-gradient-to-r from-emerald-600 to-amber-600 text-white shadow-lg'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                غير المقروءة ({unreadCount})
              </button>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-200 transition-all text-sm"
                >
                  تحديد الكل كمقروء
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-all text-sm"
                >
                  حذف الكل
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* قائمة الإشعارات */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification, index) => {
              const Icon = notification.icon

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border overflow-hidden transition-all hover:shadow-xl ${
                    notification.read ? 'border-emerald-100' : 'border-emerald-300 bg-emerald-50/50'
                  }`}
                >
                  <div className="p-4 flex items-start gap-4">
                    {/* الأيقونة */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${notification.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: notification.color }} />
                    </div>

                    {/* المحتوى */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`font-bold text-emerald-800 ${!notification.read ? 'text-emerald-900' : ''}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className="text-sm text-emerald-700 mb-2">
                        {notification.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-emerald-500">
                          {notification.time}
                        </span>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-1.5 hover:bg-emerald-100 rounded-lg transition-colors"
                              title="تحديد كمقروء"
                            >
                              <Check className="w-4 h-4 text-emerald-600" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
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
            <Bell className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-emerald-800 mb-2">
              {filter === "all" ? "لا توجد إشعارات" : "لا توجد إشعارات غير مقروءة"}
            </h3>
            <p className="text-emerald-600">
              {filter === "all" 
                ? "ستظهر هنا جميع الإشعارات والتنبيهات" 
                : "رائع! قرأت جميع الإشعارات"}
            </p>
          </motion.div>
        )}

        {/* إعدادات سريعة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
        >
          <h2 className="text-lg font-bold text-emerald-800 mb-4">إعدادات الإشعارات</h2>
          
          <div className="space-y-4">
            {/* تنبيهات الميزانية */}
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-emerald-800">تنبيهات الميزانية</h3>
                  <p className="text-xs text-emerald-600">عند تجاوز 90% من الميزانية</p>
                </div>
              </div>
              <button className="relative w-14 h-8 rounded-full bg-emerald-600 transition-colors hover:bg-emerald-700 flex-shrink-0">
                <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform" />
              </button>
            </div>

            {/* تحديثات الأهداف */}
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-emerald-800">تحديثات الأهداف</h3>
                  <p className="text-xs text-emerald-600">عند تحقيق مراحل الهدف</p>
                </div>
              </div>
              <button className="relative w-14 h-8 rounded-full bg-emerald-600 transition-colors hover:bg-emerald-700 flex-shrink-0">
                <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform" />
              </button>
            </div>

            {/* تذكير المناسبات */}
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-emerald-800">تذكير المناسبات</h3>
                  <p className="text-xs text-emerald-600">قبل 30 يوم من المناسبة</p>
                </div>
              </div>
              <button className="relative w-14 h-8 rounded-full bg-emerald-600 transition-colors hover:bg-emerald-700 flex-shrink-0">
                <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform" />
              </button>
            </div>

            {/* التقارير الشهرية */}
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-emerald-800">التقارير الشهرية</h3>
                  <p className="text-xs text-emerald-600">تقرير تفصيلي كل شهر</p>
                </div>
              </div>
              <button className="relative w-14 h-8 rounded-full bg-gray-300 transition-colors hover:bg-gray-400 flex-shrink-0">
                <div className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform" />
              </button>
            </div>

            {/* إشعارات البريد الإلكتروني */}
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-emerald-800">إشعارات البريد الإلكتروني</h3>
                  <p className="text-xs text-emerald-600">استقبال الإشعارات عبر البريد</p>
                </div>
              </div>
              <button className="relative w-14 h-8 rounded-full bg-emerald-600 transition-colors hover:bg-emerald-700 flex-shrink-0">
                <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform" />
              </button>
            </div>
          </div>

          <Link
            href="/settings"
            className="mt-6 block text-center text-sm text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
          >
            المزيد من الإعدادات ←
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
