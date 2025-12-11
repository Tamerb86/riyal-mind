import Link from "next/link"
import { ArrowRight, Mail, MessageCircle, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* الهيدر */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-10 h-10 bg-white border border-emerald-200 rounded-lg flex items-center justify-center hover:bg-emerald-50 transition-colors shadow-sm"
            >
              <ArrowRight className="w-5 h-5 text-emerald-700" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-emerald-800">اتصل بنا</h1>
              <p className="text-sm text-emerald-600">نحن هنا لمساعدتك</p>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* المقدمة */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-2xl mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            كيف يمكننا مساعدتك؟
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            فريقنا جاهز للإجابة على استفساراتك ومساعدتك في أي وقت
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* معلومات الاتصال */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">معلومات الاتصال</h3>
              
              <div className="space-y-6">
                {/* البريد الإلكتروني */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">البريد الإلكتروني</h4>
                    <a 
                      href="mailto:support@riyalmind.com" 
                      className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                    >
                      support@riyalmind.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      نرد خلال 24 ساعة
                    </p>
                  </div>
                </div>

                {/* ساعات العمل */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">ساعات العمل</h4>
                    <p className="text-gray-700">الأحد - الخميس</p>
                    <p className="text-gray-700">9:00 صباحاً - 6:00 مساءً</p>
                    <p className="text-sm text-gray-600 mt-1">
                      بتوقيت الرياض (GMT+3)
                    </p>
                  </div>
                </div>

                {/* الموقع */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">الموقع</h4>
                    <p className="text-gray-700">المملكة العربية السعودية</p>
                    <p className="text-gray-700">الرياض</p>
                  </div>
                </div>
              </div>
            </div>

            {/* الأسئلة الشائعة */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl border border-emerald-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                💡 هل تبحث عن إجابات سريعة؟
              </h3>
              <p className="text-gray-700 mb-4">
                قد تجد إجابتك في صفحة الأسئلة الشائعة
              </p>
              <Link
                href="/#faq"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
              >
                <span>تصفح الأسئلة الشائعة</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* نموذج الاتصال */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">أرسل لنا رسالة</h3>
            
            <form className="space-y-5">
              {/* الاسم */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>

              {/* البريد الإلكتروني */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="example@email.com"
                  required
                />
              </div>

              {/* الموضوع */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  الموضوع
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                >
                  <option value="">اختر الموضوع</option>
                  <option value="support">دعم فني</option>
                  <option value="billing">الفواتير والاشتراكات</option>
                  <option value="feature">طلب ميزة جديدة</option>
                  <option value="bug">الإبلاغ عن مشكلة</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              {/* الرسالة */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  الرسالة
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                  placeholder="اكتب رسالتك هنا..."
                  required
                />
              </div>

              {/* زر الإرسال */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span>إرسال الرسالة</span>
              </button>

              <p className="text-sm text-gray-600 text-center">
                سنرد على رسالتك في أقرب وقت ممكن
              </p>
            </form>
          </div>
        </div>

        {/* قسم إضافي */}
        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">
            هل أنت مستعد لتحسين إدارتك المالية؟
          </h3>
          <p className="text-emerald-50 mb-6 max-w-2xl mx-auto">
            ابدأ رحلتك مع ريال مايند اليوم واحصل على 30 يوماً تجربة مجانية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/billing"
              className="bg-white text-emerald-600 font-bold py-3 px-8 rounded-lg hover:bg-emerald-50 transition-colors shadow-lg"
            >
              ابدأ الآن مجاناً
            </Link>
            <Link
              href="/#features"
              className="bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-800 transition-colors"
            >
              تعرف على الميزات
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} ريال مايند. جميع الحقوق محفوظة.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/privacy" className="hover:text-white transition-colors text-sm">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors text-sm">
              شروط الاستخدام
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
