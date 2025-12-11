import { X, Check } from "lucide-react"

export default function Comparison() {
  const comparisons = [
    {
      feature: "تتبع المصاريف",
      traditional: "دفتر ورقي أو Excel معقد",
      riyalmind: "تسجيل سريع في ثوانٍ"
    },
    {
      feature: "التقارير",
      traditional: "حسابات يدوية مملة",
      riyalmind: "رسوم بيانية تلقائية"
    },
    {
      feature: "الإشعارات",
      traditional: "لا توجد تنبيهات",
      riyalmind: "تنبيهات ذكية فورية"
    },
    {
      feature: "الحساب العائلي",
      traditional: "صعب التنسيق",
      riyalmind: "مشاركة سهلة ومنظمة"
    },
    {
      feature: "الأمان",
      traditional: "معرض للفقدان",
      riyalmind: "محمي ومشفر بالكامل"
    },
    {
      feature: "الوصول",
      traditional: "مكان واحد فقط",
      riyalmind: "من أي مكان وأي جهاز"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            لماذا تختار ريال مايند؟
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            مقارنة بسيطة توضح الفرق بين الطريقة التقليدية والطريقة الذكية
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-xl">
          {/* الهيدر */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-white border-b-2 border-gray-200">
            <div className="text-center font-bold text-gray-900">الميزة</div>
            <div className="text-center">
              <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold">
                الطريقة التقليدية
              </div>
            </div>
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                ريال مايند
              </div>
            </div>
          </div>

          {/* المقارنات */}
          {comparisons.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 gap-4 p-6 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center font-semibold text-gray-900">
                {item.feature}
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-sm">{item.traditional}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-900">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium">{item.riyalmind}</span>
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 text-center">
            <p className="text-lg text-gray-700 mb-4 font-semibold">
              جرب الفرق بنفسك - مجاناً لمدة 30 يوماً!
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-xl hover:shadow-2xl"
            >
              ابدأ التجربة المجانية
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
