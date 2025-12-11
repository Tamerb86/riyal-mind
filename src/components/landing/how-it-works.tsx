import { UserPlus, Wallet, BarChart3, TrendingUp } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      number: "1",
      title: "سجل حسابك",
      description: "إنشاء حساب مجاني في أقل من دقيقة"
    },
    {
      icon: Wallet,
      number: "2",
      title: "أضف مصاريفك",
      description: "سجل مصاريفك اليومية بسهولة وسرعة"
    },
    {
      icon: BarChart3,
      number: "3",
      title: "تابع ميزانيتك",
      description: "راقب إنفاقك وحدد ميزانيات ذكية"
    },
    {
      icon: TrendingUp,
      number: "4",
      title: "وفّر أكثر",
      description: "احصل على توصيات لتوفير المال"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            كيف يعمل ريال مايند؟
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            أربع خطوات بسيطة للبدء في إدارة مصاريفك بذكاء
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* خط الربط */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-green-200 to-transparent -translate-x-1/2 z-0" />
                )}
                
                <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-green-500 transition-all duration-300 hover:shadow-xl z-10">
                  {/* الرقم */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* الأيقونة */}
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>

                  {/* المحتوى */}
                  <h4 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-center text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/signup"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-xl hover:shadow-2xl"
          >
            ابدأ الآن مجاناً
          </a>
        </div>
      </div>
    </section>
  )
}
