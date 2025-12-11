import { Star, Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "أحمد العتيبي",
      role: "أب لثلاثة أطفال",
      avatar: "👨‍💼",
      rating: 5,
      text: "ريال مايند ساعدني أوفر أكثر من 2000 ريال شهرياً! التطبيق سهل وعملي جداً لإدارة مصاريف العائلة."
    },
    {
      name: "سارة المطيري",
      role: "مديرة مشاريع",
      avatar: "👩‍💼",
      rating: 5,
      text: "أفضل تطبيق جربته لإدارة المصاريف. التقارير واضحة والإشعارات الذكية تنبهني قبل تجاوز الميزانية."
    },
    {
      name: "خالد الدوسري",
      role: "رائد أعمال",
      avatar: "👨‍💻",
      rating: 5,
      text: "استخدمه لإدارة مصاريف الشركة والبيت. الحساب العائلي المشترك ميزة رائعة!"
    },
    {
      name: "نورة السالم",
      role: "معلمة",
      avatar: "👩‍🏫",
      rating: 5,
      text: "بسيط وسهل الاستخدام. حتى زوجي اللي ما يحب التطبيقات صار يستخدمه يومياً!"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ماذا يقول مستخدمونا؟
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            انضم لآلاف العائلات السعودية التي تثق بريال مايند
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 relative"
            >
              {/* أيقونة الاقتباس */}
              <div className="absolute top-4 left-4 opacity-10">
                <Quote className="w-12 h-12 text-green-600" />
              </div>

              {/* التقييم */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* النص */}
              <p className="text-gray-700 mb-6 leading-relaxed text-sm relative z-10">
                "{testimonial.text}"
              </p>

              {/* المستخدم */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* إحصائيات */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">10,000+</p>
            <p className="text-gray-600">عائلة سعودية</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">4.9/5</p>
            <p className="text-gray-600">تقييم المستخدمين</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">50M+</p>
            <p className="text-gray-600">ريال تم توفيره</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">99%</p>
            <p className="text-gray-600">رضا العملاء</p>
          </div>
        </div>
      </div>
    </section>
  )
}
