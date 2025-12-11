"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">خطأ</h1>
        <h2 className="mt-4 text-2xl font-semibold">حدث خطأ ما</h2>
        <p className="mt-2 text-muted-foreground">
          عذراً، حدث خطأ غير متوقع
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Button onClick={reset}>حاول مرة أخرى</Button>
          <Button asChild variant="outline">
            <Link href="/">العودة للصفحة الرئيسية</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
