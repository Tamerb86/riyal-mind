"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Search, 
  Filter, 
  Download,
  Edit,
  Trash2,
  Calendar,
  ArrowRight,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { categories, subcategories, formatAmount } from "@/data/categories"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface Expense {
  id: string
  amount: number
  categoryId: number
  description: string | null
  date: string
  notes: string | null
  userId: string
  createdAt: string
  updatedAt: string
}

export default function ExpensesListPage() {
  const router = useRouter()
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [dateFilter, setDateFilter] = useState("all")

  // جلب المصاريف من API
  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      console.log("=== fetchExpenses START ===")
      setIsLoading(true)
      const response = await fetch("/api/expenses")
      console.log("Response status:", response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("API response data:", data)
      
      if (data.success) {
        console.log("Expenses array:", data.data.expenses)
        setExpenses(data.data.expenses || [])
        console.log("State updated with expenses count:", data.data.expenses?.length || 0)
      } else {
        console.error("API returned error:", data)
      }
    } catch (error) {
      console.error("Error fetching expenses:", error)
    } finally {
      setIsLoading(false)
      console.log("=== fetchExpenses END ===")
    }
  }

  const getCategoryInfo = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId)
    return {
      name: category?.name || "غير محدد",
      icon: category?.icon || "💰"
    }
  }

  const getSubcategoryName = (notes: string | null) => {
    if (!notes || !notes.startsWith('subcategoryId:')) return null
    const subcategoryId = parseInt(notes.replace('subcategoryId:', ''))
    const subcategory = subcategories.find(sub => sub.id === subcategoryId)
    return subcategory?.name || null
  }

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = searchQuery === "" || (expense.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    const matchesCategory = !selectedCategory || expense.categoryId === parseInt(selectedCategory)
    const subcategoryName = getSubcategoryName(expense.notes)
    const matchesSubcategory = !selectedSubcategory || subcategoryName === selectedSubcategory
    return matchesSearch && matchesCategory && matchesSubcategory
  })

  console.log("expenses.length:", expenses.length)
  console.log("filteredExpenses.length:", filteredExpenses.length)
  console.log("searchQuery:", searchQuery)
  console.log("selectedCategory:", selectedCategory)
  if (expenses.length > 0) {
    console.log("Sample expense:", expenses[0])
  }

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0)

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المصروف؟")) {
      try {
        const response = await fetch(`/api/expenses/${id}`, {
          method: "DELETE",
        })
        
        if (response.ok) {
          // تحديث القائمة بعد الحذف
          setExpenses(expenses.filter(exp => exp.id !== id))
          alert("تم الحذف بنجاح!")
        }
      } catch (error) {
        console.error("Error deleting expense:", error)
        alert("حدث خطأ أثناء الحذف")
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* الهيدر */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-gray-700" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">قائمة المصاريف</h1>
                <p className="text-sm text-gray-500">
                  {filteredExpenses.length} مصروف • المجموع: {formatAmount(totalAmount, "SAR")}
                </p>
              </div>
            </div>
            <Link
              href="/add-expense"
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
            >
              إضافة مصروف
            </Link>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* الفلاتر */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6"
        >
          <div className="grid md:grid-cols-4 gap-4">
            {/* البحث */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في المصاريف..."
                className="w-full pr-10 pl-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              />
            </div>

            {/* فلتر الفئة */}
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none font-bold text-base"
              style={{ 
                color: '#ffffff', 
                backgroundColor: '#10b981',
                fontSize: '16px' 
              }}
            >
              <option 
                value="" 
                style={{ 
                  color: '#000', 
                  backgroundColor: '#f0fdf4',
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  padding: '12px' 
                }}
              >
                جميع الفئات
              </option>
              {categories.map((cat) => (
                <option 
                  key={cat.id} 
                  value={cat.id}
                  style={{ 
                    color: '#000', 
                    backgroundColor: '#ffffff',
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    padding: '12px' 
                  }}
                >
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>

            {/* فلتر البند الفرعي */}
            <select
              value={selectedSubcategory || ""}
              onChange={(e) => setSelectedSubcategory(e.target.value || null)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none font-bold text-base"
              style={{ 
                color: '#ffffff', 
                backgroundColor: '#059669',
                fontSize: '16px' 
              }}
            >
              <option 
                value="" 
                style={{ 
                  color: '#000', 
                  backgroundColor: '#d1fae5',
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  padding: '12px' 
                }}
              >
                جميع البنود
              </option>
              {subcategories.map((sub) => (
                <option 
                  key={sub.id} 
                  value={sub.name}
                  style={{ 
                    color: '#000', 
                    backgroundColor: '#ffffff',
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    padding: '12px' 
                  }}
                >
                  {sub.name}
                </option>
              ))}
            </select>

            {/* زر التحديث */}
            <button
              onClick={fetchExpenses}
              className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              تحديث القائمة
            </button>
          </div>
        </motion.div>

        {/* جدول المصاريف */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">التاريخ</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الفئة</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">البند</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الوصف</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">المبلغ</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredExpenses.map((expense) => {
                  const categoryInfo = getCategoryInfo(expense.categoryId)
                  return (
                    <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(expense.date).toLocaleDateString('ar-SA')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{categoryInfo.icon}</span>
                          <div>
                            <div className="font-semibold text-gray-900">{categoryInfo.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getSubcategoryName(expense.notes) ? (
                          <div className="font-medium text-emerald-700">
                            {getSubcategoryName(expense.notes)}
                          </div>
                        ) : (
                          <div className="text-gray-400 text-sm">-</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700">{expense.description || "بدون وصف"}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-red-600">
                          {formatAmount(expense.amount, "SAR")}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleDelete(expense.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredExpenses.length === 0 && !isLoading && (
            <div className="py-12 text-center">
              <p className="text-gray-500 mb-4">لا توجد مصاريف حتى الآن</p>
              <Link
                href="/add-expense"
                className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                إضافة أول مصروف
              </Link>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
