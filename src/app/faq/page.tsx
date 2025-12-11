"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronDown,
  Search,
  HelpCircle,
  ArrowRight,
  MessageCircle
} from "lucide-react"
import Link from "next/link"
import { frequentlyAskedQuestions } from "@/data/frequently-asked-questions"

interface FAQItem {
  id: number
  question: string
  answer: string
}

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // تحويل البيانات المستوردة إلى الصيغة المطلوبة
  const faqs: FAQItem[] = frequentlyAskedQuestions.map((faq, index) => ({
    id: index + 1,
    question: faq.question,
    answer: faq.answer
  }))

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* الهيدر */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">الأسئلة الشائعة</h1>
              <p className="text-sm text-gray-500">كل ما تحتاج معرفته عن ريال مايند</p>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* البحث */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8"
        >
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأسئلة الشائعة..."
              className="w-full pr-12 pl-4 py-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-lg"
            />
          </div>
        </motion.div>

        {/* قائمة الأسئلة */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4 text-right flex-1">
                  <HelpCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="font-semibold text-gray-900 text-lg">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pr-16">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد نتائج تطابق بحثك</p>
            <p className="text-gray-400 text-sm mt-2">جرب كلمات مختلفة أو فئة أخرى</p>
          </div>
        )}

        {/* تواصل معنا */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 mt-12 text-white text-center"
        >
          <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h3 className="text-2xl font-bold mb-3">لم تجد إجابة لسؤالك؟</h3>
          <p className="opacity-90 mb-6">
            فريق الدعم الفني جاهز لمساعدتك على مدار الساعة
          </p>
          <a
            href="mailto:support@riyalmind.com"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
          >
            تواصل معنا
          </a>
        </motion.div>
      </main>
    </div>
  )
}
