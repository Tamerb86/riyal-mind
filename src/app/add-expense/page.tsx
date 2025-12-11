"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Calendar, 
  Save,
  ArrowRight,
  Camera,
  X,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { categories, subcategories, currencies } from "@/data/categories"

export default function AddExpensePage() {
  const router = useRouter()
  const [selectedCurrency, setSelectedCurrency] = useState("SAR")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null)
  const [receipt, setReceipt] = useState<File | null>(null)
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currency = currencies.find(c => c.code === selectedCurrency)
  const filteredSubcategories = selectedCategory 
    ? subcategories.filter(sub => sub.categoryId === selectedCategory)
    : []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedCategory) {
      alert("الرجاء اختيار فئة")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId: selectedCategory,
          amount: parseFloat(amount),
          description: description || null,
          date: date,
          notes: selectedSubcategory ? `subcategoryId:${selectedSubcategory}` : null,
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert("تم إضافة المصروف بنجاح!")
        router.push("/expenses-list")
      } else {
        alert("حدث خطأ: " + (data.message || "خطأ غير معروف"))
      }
    } catch (error) {
      console.error("Error adding expense:", error)
      alert("حدث خطأ أثناء إضافة المصروف")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setReceipt(file)
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeReceipt = () => {
    setReceipt(null)
    setReceiptPreview(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100">
      {/* الهيدر */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="w-9 h-9 bg-white border border-emerald-200 rounded-lg flex items-center justify-center hover:bg-emerald-50 transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-emerald-800">إضافة مصروف</h1>
              <p className="text-xs text-emerald-600">أضف مصروف جديد</p>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="px-4 py-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* المبلغ */}
            <div className="bg-white/90 rounded-xl shadow-md border border-emerald-100 p-4">
              <label className="block text-xs font-bold text-emerald-700 mb-2">
                المبلغ
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  className="flex-1 text-2xl font-bold text-emerald-800 bg-transparent border-none outline-none"
                />
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="px-3 py-2 border border-emerald-200 rounded-lg text-sm font-semibold text-emerald-800 bg-white"
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* الفئة */}
            <div className="bg-white/90 rounded-xl shadow-md border border-emerald-100 p-4">
              <label className="block text-xs font-bold text-emerald-700 mb-3">
                الفئة
              </label>
              <div className="grid grid-cols-4 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category.id)
                      setSelectedSubcategory(null)
                    }}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedCategory === category.id
                        ? 'border-emerald-500 bg-emerald-50 shadow-md'
                        : 'border-emerald-100 bg-white'
                    }`}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="text-[10px] font-medium text-emerald-800 leading-tight">
                      {category.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* البند الفرعي */}
            {selectedCategory && filteredSubcategories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-white/90 rounded-xl shadow-md border border-emerald-100 p-4"
              >
                <label className="block text-xs font-bold text-emerald-700 mb-3">
                  البند الفرعي
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {filteredSubcategories.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSelectedSubcategory(sub.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-right ${
                        selectedSubcategory === sub.id
                          ? 'border-emerald-500 bg-emerald-50 shadow-md'
                          : 'border-emerald-200 bg-white hover:border-emerald-300'
                      }`}
                    >
                      <div className="text-sm font-bold text-gray-900">
                        {sub.name}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* التاريخ */}
            <div className="bg-white/90 rounded-xl shadow-md border border-emerald-100 p-4">
              <label className="block text-xs font-bold text-emerald-700 mb-2 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                التاريخ
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-emerald-200 rounded-lg text-sm font-semibold text-emerald-800 bg-white"
              />
            </div>

            {/* الوصف */}
            <div className="bg-white/90 rounded-xl shadow-md border border-emerald-100 p-4">
              <label className="block text-xs font-bold text-emerald-700 mb-2">
                الوصف (اختياري)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="أضف ملاحظات..."
                rows={3}
                className="w-full px-3 py-2.5 border border-emerald-200 rounded-lg text-sm text-emerald-800 bg-white resize-none"
              />
            </div>

            {/* رفع الإيصال */}
            <div className="bg-white/90 rounded-xl shadow-md border border-emerald-100 p-4">
              <label className="block text-xs font-bold text-emerald-700 mb-3 flex items-center gap-2">
                <Camera className="w-3.5 h-3.5" />
                صورة الإيصال (اختياري)
              </label>
              
              {!receiptPreview ? (
                <div className="border-2 border-dashed border-emerald-200 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleReceiptUpload}
                    className="hidden"
                    id="receipt-upload"
                  />
                  <label
                    htmlFor="receipt-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Camera className="w-8 h-8 text-emerald-400" />
                    <span className="text-sm text-emerald-600">
                      انقر لرفع صورة
                    </span>
                  </label>
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden border border-emerald-200">
                  <img
                    src={receiptPreview}
                    alt="الإيصال"
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeReceipt}
                    className="absolute top-2 left-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* أزرار الحفظ */}
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-4 py-3 rounded-xl font-bold hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    حفظ
                  </>
                )}
              </button>
              <Link
                href="/dashboard"
                className="px-6 py-3 border-2 border-emerald-200 rounded-xl font-bold text-emerald-800 hover:bg-emerald-50 transition-all"
              >
                إلغاء
              </Link>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
