"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function TestGooglePage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const testGoogle = async () => {
    setError("")
    setLoading(true)
    
    console.log("🔍 Testing Google OAuth...")
    console.log("GOOGLE_ID exists:", !!process.env.NEXT_PUBLIC_GOOGLE_ID)
    
    try {
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/dashboard"
      })
      
      console.log("✅ SignIn result:", result)
      
      if (result?.error) {
        setError(`Error: ${result.error}`)
        console.error("❌ SignIn error:", result.error)
      } else if (result?.url) {
        console.log("✅ Redirecting to:", result.url)
        window.location.href = result.url
      }
    } catch (err: any) {
      setError(`Exception: ${err.message}`)
      console.error("❌ Exception:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          🧪 اختبار Google OAuth
        </h1>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <h2 className="font-semibold mb-2">📋 المعلومات:</h2>
            <div className="text-sm space-y-1">
              <p>• NEXTAUTH_URL: {process.env.NEXT_PUBLIC_APP_URL || "غير محدد"}</p>
              <p>• Environment: {process.env.NODE_ENV || "غير محدد"}</p>
            </div>
          </div>

          <button
            onClick={testGoogle}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "جاري الاختبار..." : "🔍 اختبار Google OAuth"}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
              <p className="font-semibold">❌ خطأ:</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          <div className="bg-yellow-50 p-4 rounded text-sm">
            <p className="font-semibold mb-2">⚠️ تعليمات:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>افتح Developer Console (F12)</li>
              <li>اذهب إلى Console tab</li>
              <li>اضغط الزر أعلاه</li>
              <li>راقب الرسائل في Console</li>
            </ol>
          </div>

          <div className="text-center">
            <a href="/signin" className="text-blue-600 hover:underline text-sm">
              ← العودة لصفحة تسجيل الدخول
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
