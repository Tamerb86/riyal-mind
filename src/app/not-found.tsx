import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">الصفحة غير موجودة</h2>
        <p className="mt-2 text-muted-foreground">
          عذراً، الصفحة التي تبحث عنها غير موجودة
        </p>
        <Button asChild className="mt-6">
          <Link href="/">العودة للصفحة الرئيسية</Link>
        </Button>
      </div>
    </div>
  )
}
