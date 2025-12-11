"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowRight,
  UserPlus,
  Mail,
  Shield,
  Eye,
  Edit,
  Trash2,
  Crown,
  User,
  CheckCircle,
  X,
  Copy,
  Check
} from "lucide-react"
import Link from "next/link"

interface FamilyMember {
  id: number
  name: string
  email: string
  role: "owner" | "member" | "viewer"
  joinedDate: string
  monthlySpent: number
  status: "active" | "pending"
}

export default function FamilyPage() {
  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: 1,
      name: "محمد أحمد",
      email: "mohamed@example.com",
      role: "owner",
      joinedDate: "2024-01-15",
      monthlySpent: 3200,
      status: "active"
    },
    {
      id: 2,
      name: "فاطمة محمد",
      email: "fatima@example.com",
      role: "member",
      joinedDate: "2024-02-20",
      monthlySpent: 2100,
      status: "active"
    },
    {
      id: 3,
      name: "أحمد محمد",
      email: "ahmed@example.com",
      role: "viewer",
      joinedDate: "2024-03-10",
      monthlySpent: 0,
      status: "active"
    },
    {
      id: 4,
      name: "سارة علي",
      email: "sara@example.com",
      role: "member",
      joinedDate: "",
      monthlySpent: 0,
      status: "pending"
    }
  ])

  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<"member" | "viewer">("member")
  const [copied, setCopied] = useState(false)

  const totalFamilySpent = members
    .filter(m => m.status === "active")
    .reduce((sum, m) => sum + m.monthlySpent, 0)

  const roles = [
    {
      value: "owner",
      label: "مالك",
      icon: Crown,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      description: "صلاحيات كاملة - إدارة الحساب والأعضاء"
    },
    {
      value: "member",
      label: "عضو",
      icon: User,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      description: "إضافة وتعديل المصاريف الخاصة"
    },
    {
      value: "viewer",
      label: "مراقب",
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "عرض البيانات فقط بدون تعديل"
    }
  ]

  const handleInvite = () => {
    const newMember: FamilyMember = {
      id: Date.now(),
      name: inviteEmail.split("@")[0] || "مستخدم",
      email: inviteEmail,
      role: inviteRole,
      joinedDate: "",
      monthlySpent: 0,
      status: "pending"
    }
    setMembers([...members, newMember])
    setShowInviteModal(false)
    setInviteEmail("")
    setInviteRole("member")
  }

  const handleRemoveMember = (id: number) => {
    if (confirm("هل أنت متأكد من إزالة هذا العضو؟")) {
      setMembers(members.filter(m => m.id !== id))
    }
  }

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText("https://riyalmind.app/invite/ABC123XYZ")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
                <h1 className="text-2xl font-bold text-emerald-800">الحساب العائلي</h1>
                <p className="text-sm text-emerald-600">إدارة أفراد العائلة والصلاحيات</p>
              </div>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">دعوة عضو</span>
            </button>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* الإحصائيات */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
          >
            <p className="text-sm text-emerald-600 mb-2">إجمالي الأعضاء</p>
            <h3 className="text-3xl font-bold text-emerald-800">
              {members.filter(m => m.status === "active").length}
            </h3>
            <p className="text-xs text-emerald-500 mt-1">
              {members.filter(m => m.status === "pending").length} في الانتظار
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
          >
            <p className="text-sm text-emerald-600 mb-2">مصاريف العائلة</p>
            <h3 className="text-3xl font-bold text-red-600">
              {totalFamilySpent.toLocaleString('en-US')}
            </h3>
            <p className="text-xs text-emerald-500 mt-1">ر.س هذا الشهر</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6"
          >
            <p className="text-sm text-emerald-600 mb-2">متوسط الفرد</p>
            <h3 className="text-3xl font-bold text-emerald-700">
              {Math.round(totalFamilySpent / members.filter(m => m.status === "active").length).toLocaleString('en-US')}
            </h3>
            <p className="text-xs text-emerald-500 mt-1">ر.س / شخص</p>
          </motion.div>
        </div>

        {/* شرح الأدوار */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-emerald-800 mb-4">الأدوار والصلاحيات</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <div key={role.value} className="flex items-start gap-3">
                  <div className={`w-10 h-10 ${role.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${role.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-800">{role.label}</h3>
                    <p className="text-xs text-emerald-600">{role.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* قائمة الأعضاء */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 overflow-hidden"
        >
          <div className="p-6 border-b border-emerald-100">
            <h2 className="text-xl font-bold text-emerald-800">أعضاء العائلة</h2>
          </div>

          <div className="divide-y divide-emerald-100">
            {members.map((member) => {
              const role = roles.find(r => r.value === member.role)
              const RoleIcon = role?.icon || User

              return (
                <div key={member.id} className="p-6 hover:bg-emerald-50/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-amber-600 flex items-center justify-center text-white text-xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-emerald-800">{member.name}</h3>
                          {member.status === "pending" && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                              في الانتظار
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-emerald-600">{member.email}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 ${role?.bgColor} rounded-md flex items-center justify-center`}>
                              <RoleIcon className={`w-3.5 h-3.5 ${role?.color}`} />
                            </div>
                            <span className="text-xs text-emerald-700">{role?.label}</span>
                          </div>
                          {member.status === "active" && (
                            <span className="text-xs text-emerald-600">
                              مصاريف: {member.monthlySpent.toLocaleString('en-US')} ر.س
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {member.role !== "owner" && (
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-emerald-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-emerald-600" />
                        </button>
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    )}
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
          transition={{ delay: 0.5 }}
          className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3"
        >
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            💡
          </div>
          <div>
            <h3 className="font-bold text-amber-800 mb-1">نصيحة</h3>
            <p className="text-sm text-amber-700">
              أضف أفراد عائلتك لتتبع المصاريف معاً. يمكن للأعضاء إضافة مصاريفهم، بينما المراقبون يمكنهم فقط عرض البيانات.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Modal دعوة عضو */}
      <AnimatePresence>
        {showInviteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowInviteModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-emerald-800">دعوة عضو جديد</h2>
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="w-8 h-8 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-emerald-800 mb-2">
                      الدور
                    </label>
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value as "member" | "viewer")}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="member">عضو - يمكنه إضافة المصاريف</option>
                      <option value="viewer">مراقب - عرض فقط</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-emerald-100">
                    <p className="text-xs text-emerald-600 mb-3">أو شارك رابط الدعوة:</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value="https://riyalmind.app/invite/ABC123"
                        readOnly
                        className="flex-1 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700"
                      />
                      <button
                        onClick={handleCopyInviteLink}
                        className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-emerald-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleInvite}
                    disabled={!inviteEmail}
                    className="w-full bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-lg font-bold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    إرسال الدعوة
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
