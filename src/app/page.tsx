import Link from "next/link"
import { 
  Wallet, 
  TrendingUp, 
  Users, 
  Shield, 
  BarChart3,
  Bell,
  Smartphone,
  ArrowLeft,
  CheckCircle2,
  Sparkles
} from "lucide-react"
import UserMenu from "@/components/header/user-menu"
import TrustBadges from "@/components/landing/trust-badges"
import HowItWorks from "@/components/landing/how-it-works"
import Comparison from "@/components/landing/comparison"
import Testimonials from "@/components/landing/testimonials"
import FAQSection from "@/components/landing/faq-section"

export default function HomePage() {
  const features = [
    {
      icon: TrendingUp,
      title: "تتبع ذكي للمصاريف",
      description: "إضافة سريعة للمصاريف مع تصنيف تلقائي وتحليل فوري لأنماط الإنفاق"
    },
    {
      icon: Users,
      title: "إدارة عائلية متقدمة",
      description: "حسابات متعددة لأفراد الأسرة مع تقارير موحدة وصلاحيات مرنة وحساب مشترك للمصاريف"
    },
    {
      icon: BarChart3,
      title: "تقارير تفصيلية",
      description: "رسوم بيانية وتحليلات متقدمة لفهم عادات الإنفاق بشكل أفضل"
    },
    {
      icon: Bell,
      title: "تنبيهات ذكية",
      description: "إشعارات تلقائية عند تجاوز الميزانية أو اقتراب حدود الإنفاق"
    },
    {
      icon: Smartphone,
      title: "واجهة سهلة",
      description: "تصميم عصري وبسيط يعمل على جميع الأجهزة بسلاسة"
    },
    {
      icon: Shield,
      title: "آمن ومحمي",
      description: "بياناتك محمية بأحدث تقنيات الأمان مع تشفير كامل"
    }
  ]

  const plans = [
    {
      name: "فردي شهري",
      price: "22",
      oldPrice: "29",
      yearlyPrice: "187",
      yearlyOldPrice: "249",
      features: [
        "حساب واحد",
        "دخل أساسي وجانبي",
        "ميزانيات غير محدودة",
        "تقارير شهرية",
        "إشعارات ذكية",
        "دعم فني"
      ]
    },
    {
      name: "عائلي شهري",
      price: "37",
      oldPrice: "49",
      yearlyPrice: "337",
      yearlyOldPrice: "449",
      features: [
        "حتى 5 مستخدمين",
        "إدارة عائلية كاملة",
        "حساب مشترك للمصاريف",
        "تقسيم المصاريف تلقائياً",
        "تقارير متقدمة",
        "أولوية في الدعم"
      ],
      popular: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* الهيدر */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ريال مايند</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors hidden sm:block"
              >
                لوحة التحكم
              </Link>
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
            <Sparkles className="w-4 h-4" />
            🎉 30 يوم تجربة مجانية + خصم 25%
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            إدارة مصاريفك العائلية
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              بذكاء وسهولة
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            تطبيق ذكي لتتبع المصاريف، إدارة الميزانيات، وتحليل الأنماط المالية
            لعائلتك. وفّر أكثر، خطط أفضل، عش براحة بال.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
            >
              ابدأ التجربة المجانية
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all border-2 border-gray-200"
            >
              شاهد العرض التوضيحي
            </Link>
          </div>

          {/* إحصائيات سريعة */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>بدون بطاقة ائتمان</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>إلغاء في أي وقت</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>دعم فني مجاني</span>
            </div>
          </div>
        </div>

        {/* صورة توضيحية (placeholder) */}
        <div className="mt-16 bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
          <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-20 h-20 text-green-600 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-semibold">معاينة لوحة التحكم</p>
              <p className="text-gray-500 text-sm mt-2">تصميم بسيط وواضح لإدارة مصاريفك</p>
            </div>
          </div>
        </div>
      </section>

      {/* شارات الثقة */}
      <TrustBadges />

      {/* كيف يعمل */}
      <HowItWorks />

      {/* المميزات */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              لماذا ريال مايند؟
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              كل ما تحتاجه لإدارة مصاريفك العائلية بكفاءة واحترافية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-5 shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* المقارنة */}
      <Comparison />

      {/* الأسعار */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              💰 وفّر 25% الآن
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              اختر الخطة المناسبة لك
            </h3>
            <p className="text-lg text-gray-600">
              جميع الخطط تشمل 30 يوم تجربة مجانية + خصم 25%
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 border-2 transition-all duration-300 ${
                  plan.popular
                    ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl scale-105"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold px-4 py-1.5 rounded-full inline-block mb-4">
                    ⭐ الأكثر شعبية
                  </div>
                )}
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h4>
                <p className="text-sm text-gray-600 mb-4">أو وفّر أكثر مع الاشتراك السنوي</p>
                
                {/* السعر الشهري */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">شهري:</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      {plan.oldPrice}
                    </span>
                    <span className="text-lg text-gray-600">ر.س / شهر</span>
                  </div>
                </div>

                {/* السعر السنوي */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-1">سنوي (وفّر أكثر):</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-green-600">
                      {plan.yearlyPrice}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {plan.yearlyOldPrice}
                    </span>
                    <span className="text-sm text-gray-600">ر.س / سنة</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block text-center py-3.5 rounded-xl font-bold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  ابدأ التجربة المجانية
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-gray-500">
              📌 الأسعار تشمل ضريبة القيمة المضافة • ✅ يمكن الإلغاء في أي وقت • 🔒 دفع آمن عبر Stripe
            </p>
            <p className="text-xs text-gray-400">
              * الفترة التجريبية 30 يوم بدون بطاقة ائتمان
            </p>
          </div>
        </div>
      </section>

      {/* شهادات المستخدمين */}
      <Testimonials />

      {/* الأسئلة الشائعة */}
      <FAQSection />

      {/* Call to Action النهائي */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            جاهز لتحويل حياتك المالية؟
          </h3>
          <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
            انضم لأكثر من 10,000 عائلة سعودية تدير مصاريفها بذكاء مع ريال مايند.
            ابدأ مجاناً اليوم!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-block bg-white text-green-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-2xl"
            >
              ابدأ التجربة المجانية (30 يوم)
            </Link>
            <Link
              href="/dashboard"
              className="inline-block bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              شاهد العرض التوضيحي
            </Link>
          </div>
          <p className="text-sm text-green-100 mt-6">
            ✨ بدون بطاقة ائتمان • إلغاء في أي وقت
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">ريال مايند</h4>
              </div>
              <p className="text-sm leading-relaxed">
                تطبيق ذكي لإدارة المصاريف العائلية بتقنيات حديثة وآمنة
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">المنتج</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    لوحة التحكم
                  </Link>
                </li>
                <li>
                  <Link href="/billing" className="hover:text-white transition-colors">
                    الأسعار
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    الأسئلة الشائعة
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">الشركة</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    شروط الاستخدام
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    اتصل بنا
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">تواصل معنا</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:support@riyalmind.com" className="hover:text-white transition-colors">
                    support@riyalmind.com
                  </a>
                </li>
                <li>+966 50 123 4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>Created by Nexify CRM Systems LLC © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
