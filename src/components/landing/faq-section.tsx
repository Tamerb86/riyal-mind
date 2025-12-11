"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "هل التطبيق مجاني؟",
      answer: "نعم! نوفر فترة تجريبية مجانية لمدة 30 يوماً لجميع الخطط. بعدها يمكنك الاشتراك بخطة شهرية أو سنوية حسب احتياجك."
    },
    {
      question: "هل بياناتي آمنة؟",
      answer: "نعم، بياناتك محمية بأحدث تقنيات التشفير. نستخدم بروتوكولات أمان من نفس المستوى المستخدم في البنوك العالمية. لا نشارك بياناتك مع أي جهة خارجية."
    },
    {
      question: "كم عدد أفراد العائلة المسموح؟",
      answer: "الخطة الفردية لمستخدم واحد، والخطة العائلية تسمح بحتى 5 مستخدمين. يمكن لكل فرد إضافة مصاريفه وتتبع ميزانيته الخاصة."
    },
    {
      question: "هل يمكنني الإلغاء في أي وقت؟",
      answer: "نعم، يمكنك إلغاء اشتراكك في أي وقت من إعدادات الحساب. لا توجد رسوم إلغاء أو التزامات طويلة المدى."
    },
    {
      question: "هل يعمل على الجوال؟",
      answer: "نعم! التطبيق يعمل بشكل ممتاز على جميع الأجهزة - الجوال، التابلت، والكمبيوتر. يمكنك أيضاً تثبيته كتطبيق على شاشة جوالك الرئيسية."
    },
    {
      question: "كيف أحصل على الدعم الفني؟",
      answer: "نوفر دعماً فنياً عبر البريد الإلكتروني والواتساب. مشتركو الخطة العائلية يحصلون على أولوية في الرد خلال 24 ساعة."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            الأسئلة الشائعة
          </h3>
          <p className="text-lg text-gray-600">
            إجابات سريعة على الأسئلة الأكثر شيوعاً
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-right hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900 text-lg pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-green-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            لديك سؤال آخر؟
          </p>
          <a
            href="mailto:support@rialmind.com"
            className="inline-block text-green-600 font-bold hover:text-green-700 transition-colors"
          >
            تواصل معنا →
          </a>
        </div>
      </div>
    </section>
  )
}
