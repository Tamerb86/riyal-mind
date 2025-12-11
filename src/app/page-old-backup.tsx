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

export default function HomePage() {
  const features = [
    {
      icon: TrendingUp,
      title: "تتبع ذكي للمصاريف",
      description: "إضافة سريعة للمصاريف مع تصنيف تلقائي وتحليل فوري لأنماط الإنفاق"
    },
    {
      icon: Users,
      title: "إدارة عائلية",
      description: "حسابات متعددة لأفراد الأسرة مع تقارير موحدة وصلاحيات مرنة"
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
      price: "15",
      oldPrice: "20",
      features: ["حساب واحد", "ميزانيات غير محدودة", "تقارير شهرية", "دعم فني"]
    },
    {
      name: "عائلي شهري",
      price: "30",
      oldPrice: "40",
      features: ["حتى 5 مستخدمين", "إدارة عائلية", "تقارير متقدمة", "أولوية في الدعم"],
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
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            خصم 25% لفترة محدودة
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
            لعائلتك بتقنيات الذكاء الاصطناعي
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
            >
              جرب التطبيق الآن
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* صورة توضيحية (placeholder) */}
        <div className="mt-16 bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
          <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-20 h-20 text-green-600 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-semibold">معاينة لوحة التحكم</p>
            </div>
          </div>
        </div>
      </section>

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

      {/* الأسعار */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              اختر الخطة المناسبة لك
            </h3>
            <p className="text-lg text-gray-600">
              جميع الخطط تشمل جميع المميزات مع خصم 25%
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                    الأكثر شعبية
                  </div>
                )}
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  {plan.name}
                </h4>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-2xl text-gray-400 line-through">
                    {plan.oldPrice}
                  </span>
                  <span className="text-lg text-gray-600">ر.س / شهر</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`block text-center py-3.5 rounded-xl font-bold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  جرب الآن
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            📌 الأسعار تشمل ضريبة القيمة المضافة • ✅ يمكن الإلغاء في أي وقت
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ابدأ رحلتك المالية الذكية اليوم
          </h3>
          <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
            انضم لآلاف العائلات التي تدير مصاريفها بكفاءة مع ريال مايند
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-white text-green-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-2xl"
          >
            جرب التطبيق الآن
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">ريال مايند</h4>
              </div>
              <p className="text-sm leading-relaxed">
                تطبيق ذكي لإدارة المصاريف العائلية بتقنيات الذكاء الاصطناعي
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">روابط سريعة</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    لوحة التحكم
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signin" className="hover:text-white transition-colors">
                    تسجيل الدخول
                  </Link>
                </li>
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
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">تواصل معنا</h5>
              <ul className="space-y-2 text-sm">
                <li>support@riyalmind.com</li>
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
