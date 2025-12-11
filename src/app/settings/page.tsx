"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  ArrowRight,
  User,
  Mail,
  Lock,
  Globe,
  DollarSign,
  Bell,
  Shield,
  Camera,
  Save
} from "lucide-react"
import Link from "next/link"
import { currencies } from "@/data/categories"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  
  // بيانات الحساب
  const [name, setName] = useState("محمد أحمد")
  const [email, setEmail] = useState("mohamed@example.com")
  const [phone, setPhone] = useState("+966 50 123 4567")
  
  // كلمة المرور
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  // الإعدادات
  const [selectedCurrency, setSelectedCurrency] = useState("SAR")
  const [language, setLanguage] = useState("ar")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    budget: true,
    reports: false
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const tabs = [
    { id: "account", name: "الحساب", icon: User },
    { id: "security", name: "الأمان", icon: Lock },
    { id: "preferences", name: "التفضيلات", icon: Globe },
    { id: "notifications", name: "الإشعارات", icon: Bell }
  ]

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
              <h1 className="text-2xl font-bold text-emerald-800">الإعدادات</h1>
              <p className="text-sm text-emerald-600">إدارة حسابك وتفضيلاتك</p>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* القائمة الجانبية */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
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
                          ? 'bg-gradient-to-r from-emerald-600 to-amber-600 text-white shadow-lg'
                          : 'hover:bg-emerald-50 text-emerald-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold">{tab.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* المحتوى الرئيسي */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6">
              {/* تبويب الحساب */}
              {activeTab === "account" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-emerald-800 mb-6">معلومات الحساب</h2>
                  
                  {/* الصورة الشخصية */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover border-4 border-emerald-200"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-600 to-amber-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-emerald-200">
                          {name.charAt(0)}
                        </div>
                      )}
                      <label
                        htmlFor="profile-upload"
                        className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-700 transition-colors shadow-lg"
                      >
                        <Camera className="w-4 h-4 text-white" />
                      </label>
                      <input
                        type="file"
                        id="profile-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-800">{name}</h3>
                      <p className="text-sm text-emerald-600">{email}</p>
                    </div>
                  </div>

                  {/* الاسم */}
                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* البريد */}
                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* الهاتف */}
                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <button className="w-full bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-lg font-bold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg flex items-center justify-center gap-2">
                    <Save className="w-5 h-5" />
                    حفظ التغييرات
                  </button>
                </div>
              )}

              {/* تبويب الأمان */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-emerald-800 mb-6">الأمان وكلمة المرور</h2>
                  
                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      كلمة المرور الحالية
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                      placeholder="أدخل كلمة المرور الحالية"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      كلمة المرور الجديدة
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                      placeholder="أدخل كلمة مرور جديدة"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      تأكيد كلمة المرور
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                      placeholder="أعد إدخال كلمة المرور"
                    />
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-amber-800 mb-1">نصائح لكلمة مرور قوية</h4>
                        <ul className="text-sm text-amber-700 space-y-1">
                          <li>• استخدم 8 أحرف على الأقل</li>
                          <li>• اجمع بين الأحرف والأرقام والرموز</li>
                          <li>• تجنب المعلومات الشخصية</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-lg font-bold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg">
                    تحديث كلمة المرور
                  </button>
                </div>
              )}

              {/* تبويب التفضيلات */}
              {activeTab === "preferences" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-emerald-800 mb-6">التفضيلات</h2>
                  
                  {/* العملة */}
                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      العملة الافتراضية
                    </label>
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white"
                    >
                      {currencies.map((curr) => (
                        <option key={curr.code} value={curr.code}>
                          {curr.flag} {curr.name} ({curr.symbol})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* اللغة */}
                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      اللغة
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <button className="w-full bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-lg font-bold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg">
                    حفظ التفضيلات
                  </button>
                </div>
              )}

              {/* تبويب الإشعارات */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-emerald-800 mb-6">إعدادات الإشعارات</h2>
                  
                  <div className="space-y-4">
                    {[
                      { key: "email", label: "إشعارات البريد الإلكتروني", desc: "تلقي إشعارات عبر البريد" },
                      { key: "push", label: "الإشعارات الفورية", desc: "تلقي إشعارات فورية على الجهاز" },
                      { key: "budget", label: "تنبيهات الميزانية", desc: "عند تجاوز 90% من الميزانية" },
                      { key: "reports", label: "التقارير الشهرية", desc: "تقرير تفصيلي كل شهر" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-emerald-800">{item.label}</h4>
                          <p className="text-sm text-emerald-600">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications({
                            ...notifications,
                            [item.key]: !notifications[item.key as keyof typeof notifications]
                          })}
                          className={`relative w-14 h-8 rounded-full transition-colors ${
                            notifications[item.key as keyof typeof notifications]
                              ? 'bg-emerald-600'
                              : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                              notifications[item.key as keyof typeof notifications]
                                ? 'left-1'
                                : 'left-7'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
