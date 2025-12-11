"use client"

import { useState, useEffect, Suspense } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, User, ArrowRight, Shield, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUpWithPassword, signInWithPassword } from "@/actions/auth"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

function SignUpForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      router.push(callbackUrl)
    }
  }, [session, router, callbackUrl])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    // Validation
    if (password !== confirmPassword) {
      setError("كلمات المرور غير متطابقة")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل")
      setIsLoading(false)
      return
    }

    try {
      const result = await signUpWithPassword({
        email,
        password,
        confirmPassword,
      })

      if (result === "exists") {
        setError("البريد الإلكتروني مسجل مسبقاً. يرجى تسجيل الدخول")
      } else if (result === "invalid-input") {
        setError("البيانات غير صحيحة. تأكد من صحة البريد الإلكتروني وأن كلمة المرور 8 أحرف على الأقل")
      } else if (result === "success") {
        setSuccess("تم إنشاء الحساب بنجاح! جاري تسجيل الدخول...")
        // تسجيل الدخول تلقائياً بعد إنشاء الحساب
        try {
          const signInResult = await signInWithPassword({ email, password })
          if (signInResult === "success") {
            router.push(callbackUrl)
            router.refresh()
          } else {
            // إذا فشل تسجيل الدخول التلقائي، توجيه لصفحة تسجيل الدخول
            setTimeout(() => {
              router.push("/signin")
            }, 1500)
          }
        } catch {
          setTimeout(() => {
            router.push("/signin")
          }, 1500)
        }
      } else {
        setError("حدث خطأ في الاتصال بقاعدة البيانات. حاول مرة أخرى")
      }
    } catch (error) {
      console.error("Signup error:", error)
      setError("حدث خطأ غير متوقع. حاول مرة أخرى")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    setError("")
    setIsGoogleLoading(true)
    
    // التوجيه المباشر إلى Google OAuth
    const googleAuthUrl = `/api/auth/signin/google?callbackUrl=${encodeURIComponent(callbackUrl)}`
    console.log("🔍 Redirecting to:", googleAuthUrl)
    window.location.href = googleAuthUrl
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-amber-200/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 mb-4 shadow-2xl relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 opacity-50 blur-md"
            />
            <User className="w-10 h-10 text-white relative z-10" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent mb-2"
          >
            انضم إلى Riyal Mind
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-emerald-600 flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            أنشئ حسابك وابدأ في إدارة مصاريفك
          </motion.p>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.01 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100/50 p-8 relative overflow-hidden"
        >
          {/* Card Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 pointer-events-none" />
          
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-2 text-red-600 relative z-10"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-xl flex items-center gap-3 text-emerald-700 shadow-lg relative z-10"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              </motion.div>
              <p className="text-sm font-medium">{success}</p>
            </motion.div>
          )}

          {/* Google Sign Up Button */}
          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative z-10 w-full h-14 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl font-medium overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isGoogleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              <span>التسجيل بواسطة Google</span>
            </span>
          </motion.button>

          {/* Divider */}
          <div className="relative my-6 z-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-emerald-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-emerald-600 font-medium">أو</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSignUp} className="space-y-5 relative z-10">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-emerald-700 font-medium">
                البريد الإلكتروني
              </Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <Input
                  id="email"
                  type="email"
                  dir="ltr"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading || isGoogleLoading}
                  className="h-14 pr-10 border-2 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-emerald-50/50 rounded-xl transition-all duration-200 hover:border-emerald-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-emerald-700 font-medium">
                كلمة المرور
              </Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  dir="ltr"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading || isGoogleLoading}
                  className="h-14 pr-10 pl-10 border-2 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-emerald-50/50 rounded-xl transition-all duration-200 hover:border-emerald-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-600 transition-colors"
                  disabled={isLoading || isGoogleLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-emerald-700 font-medium">
                تأكيد كلمة المرور
              </Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  dir="ltr"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading || isGoogleLoading}
                  className="h-14 pr-10 pl-10 border-2 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-emerald-50/50 rounded-xl transition-all duration-200 hover:border-emerald-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-600 transition-colors"
                  disabled={isLoading || isGoogleLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="w-full h-14 bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-amber-400 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin ml-2" />
                      جاري إنشاء الحساب...
                    </>
                  ) : (
                    <>
                      إنشاء حساب
                      <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>
            </motion.div>
          </form>

          {/* Sign In Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center relative z-10"
          >
            <p className="text-emerald-600">
              لديك حساب بالفعل؟{" "}
              <motion.a
                href="/signin"
                whileHover={{ scale: 1.05 }}
                className="text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-4 transition-colors inline-flex items-center gap-1"
              >
                سجل دخولك
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-sm text-emerald-600"
        >
          بالتسجيل، أنت توافق على{" "}
          <a href="/terms" className="underline hover:text-emerald-800">
            شروط الخدمة
          </a>{" "}
          و
          <a href="/privacy" className="underline hover:text-emerald-800">
            {" "}سياسة الخصوصية
          </a>
        </motion.p>
      </motion.div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    }>
      <SignUpForm />
    </Suspense>
  )
}
