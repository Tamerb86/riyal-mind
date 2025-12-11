"use client"

import { useEffect, useRef, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { LogOut, Settings, LayoutDashboard, User, ChevronDown } from "lucide-react"
import Image from "next/image"

export default function UserMenu() {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      const t = e.target as Node
      if (open && menuRef.current && btnRef.current &&
          !menuRef.current.contains(t) && !btnRef.current.contains(t)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [open])

  const handleLogout = async () => {
    setOpen(false)
    await signOut({ callbackUrl: "/" })
  }

  // إذا لم يكن مسجل دخول، لا تعرض القائمة
  if (status === "loading") {
    return (
      <div className="w-8 h-8 rounded-full bg-emerald-100 animate-pulse" />
    )
  }

  if (!session) {
    return null
  }

  const userName = session.user?.name || "مستخدم"
  const userImage = session.user?.image

  return (
    <div className="relative">
      {/* زر الأيقونة */}
      <button
        ref={btnRef}
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 border border-emerald-200 hover:bg-emerald-50 transition-colors shadow-sm"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="قائمة المستخدم"
      >
        {/* الأيقونة أو صورة المستخدم */}
        {userImage ? (
          <Image
            src={userImage}
            alt={userName}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-amber-600 text-white flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        )}
        
        {/* اسم المستخدم (يظهر فقط على الكمبيوتر) */}
        <span className="hidden sm:inline text-sm font-semibold text-emerald-800">
          {userName}
        </span>
        
        {/* سهم لأسفل */}
        <ChevronDown className={`w-4 h-4 text-emerald-700 transition-transform hidden sm:block ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* القائمة المنسدلة */}
      {open && (
        <div
          ref={menuRef}
          className="absolute left-0 top-12 w-56 bg-white border border-emerald-100 rounded-xl shadow-xl overflow-hidden z-50"
          role="menu"
        >
          {/* معلومات المستخدم */}
          <div className="px-4 py-3 bg-gradient-to-r from-emerald-50 to-amber-50 border-b border-emerald-100">
            <div className="flex items-center gap-3">
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userName}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-amber-600 text-white flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-emerald-800 truncate">
                  {userName}
                </p>
                <p className="text-xs text-emerald-600 truncate">
                  {session.user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* الروابط */}
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 text-emerald-800 transition-colors"
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="font-medium">لوحة التحكم</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 text-emerald-800 transition-colors"
            onClick={() => setOpen(false)}
          >
            <Settings className="w-4 h-4" />
            <span className="font-medium">الإعدادات</span>
          </Link>
          <div className="border-t border-emerald-100" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">تسجيل خروج</span>
          </button>
        </div>
      )}
    </div>
  )
}
