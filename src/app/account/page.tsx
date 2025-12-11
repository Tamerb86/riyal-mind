"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  User,
  Lock,
  CreditCard,
  Bell,
  Trash2,
  Save,
  LogOut,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function AccountPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("profile")
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // بيانات الملف الشخصي
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [currency, setCurrency] = useState("SAR")

  // كلمة المرور
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // الإشعارات
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [budgetAlerts, setBudgetAlerts] = useState(true)

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "")
      setEmail(session.user.email || "")
    }
  }, [session])

  const tabs = [
    { id: "profile", name: "الملف الشخصي", icon: User },
    { id: "subscription", name: "الاشتراك", icon: CreditCard },
    { id: "security", name: "الأمان", icon: Lock },
    { id: "notifications", name: "الإشعارات", icon: Bell },
  ]

  const handleSaveProfile = async () => {
    // TODO: استدعاء Server Action لحفظ البيانات
    alert("تم حفظ البيانات بنجاح!")
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("كلمات المرور غير متطابقة")
      return
    }
    // TODO: استدعاء Server Action لتغيير كلمة المرور
    alert("تم تغيير كلمة المرور بنجاح!")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleDeleteAccount = async () => {
    // TODO: استدعاء Server Action لحذف الحساب
    alert("تم حذف الحساب")
    signOut({ callbackUrl: "/" })
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
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
                <h1 className="text-2xl font-bold text-emerald-800">إدارة الحساب</h1>
                <p className="text-sm text-emerald-600">إعدادات حسابك واشتراكك</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 border-2 border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* القائمة الجانبية */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-emerald-600 to-amber-600 text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold">{tab.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-3">
            {/* الملف الشخصي */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">الملف الشخصي</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">الاسم</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">رقم الجوال</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 50 123 4567"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">العملة</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    >
                      <option value="SAR">ريال سعودي (SAR)</option>
                      <option value="USD">دولار أمريكي (USD)</option>
                      <option value="EUR">يورو (EUR)</option>
                    </select>
                  </div>
                  <button
                    onClick={handleSaveProfile}
                    className="w-full bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-8 py-4 rounded-xl font-bold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    حفظ التغييرات
                  </button>
                </div>
              </motion.div>
            )}

            {/* الاشتراك */}
            {activeTab === "subscription" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">الاشتراك والفواتير</h2>
                <div className="bg-gradient-to-r from-emerald-500 to-amber-500 rounded-xl p-6 text-white mb-6">
                  <h3 className="text-xl font-bold mb-2">الخطة الحالية: فردي شهري</h3>
                  <p className="text-sm opacity-90 mb-4">التجديد التلقائي في 1 يناير 2026</p>
                  <div className="text-3xl font-bold">15 ر.س / شهر</div>
                </div>
                <div className="space-y-3">
                  <Link
                    href="/billing"
                    className="block w-full bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all text-center"
                  >
                    تغيير الخطة
                  </Link>
                  <button className="w-full border-2 border-red-200 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all">
                    إلغاء الاشتراك
                  </button>
                </div>
              </motion.div>
            )}

            {/* الأمان */}
            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">الأمان</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">تغيير كلمة المرور</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">كلمة المرور الحالية</label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">كلمة المرور الجديدة</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">تأكيد كلمة المرور</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <button
                        onClick={handleChangePassword}
                        className="w-full bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all"
                      >
                        تغيير كلمة المرور
                      </button>
                    </div>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-6">
                    <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      منطقة الخطر
                    </h3>
                    <p className="text-gray-600 mb-4">
                      حذف حسابك سيؤدي إلى فقدان جميع بياناتك بشكل دائم. هذا الإجراء لا يمكن التراجع عنه.
                    </p>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      حذف الحساب نهائياً
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* الإشعارات */}
            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">الإشعارات</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h3 className="font-bold text-gray-800">إشعارات البريد الإلكتروني</h3>
                      <p className="text-sm text-gray-600">استلام الإشعارات عبر البريد</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h3 className="font-bold text-gray-800">الإشعارات الفورية</h3>
                      <p className="text-sm text-gray-600">استلام إشعارات فورية على الجهاز</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pushNotifications}
                        onChange={(e) => setPushNotifications(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h3 className="font-bold text-gray-800">تنبيهات الميزانية</h3>
                      <p className="text-sm text-gray-600">تنبيهات عند تجاوز الميزانية</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={budgetAlerts}
                        onChange={(e) => setBudgetAlerts(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  <button className="w-full bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-8 py-4 rounded-xl font-bold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg flex items-center justify-center gap-2 mt-6">
                    <Save className="w-5 h-5" />
                    حفظ الإعدادات
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* نافذة تأكيد الحذف */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">تأكيد حذف الحساب</h2>
              <p className="text-gray-600">
                هل أنت متأكد من رغبتك في حذف حسابك؟ سيتم حذف جميع بياناتك بشكل دائم ولا يمكن التراجع عن هذا
                الإجراء.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all"
              >
                نعم، احذف حسابي
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
