import Link from "next/link"
import { ArrowRight, Shield } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100">
      {/* الهيدر */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-10 h-10 bg-white border border-emerald-200 rounded-lg flex items-center justify-center hover:bg-emerald-50 transition-colors shadow-sm"
            >
              <ArrowRight className="w-5 h-5 text-emerald-700" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-emerald-800">سياسة الخصوصية</h1>
              <p className="text-sm text-emerald-600">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</p>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-amber-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">حماية بياناتك أولويتنا</h2>
              <p className="text-gray-600">نلتزم بحماية خصوصيتك وأمان معلوماتك</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">1. المعلومات التي نجمعها</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                نقوم بجمع المعلومات التالية لتقديم خدماتنا بشكل أفضل:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li>معلومات الحساب: الاسم، البريد الإلكتروني، رقم الجوال</li>
                <li>البيانات المالية: المصاريف، الدخل، الميزانيات (مشفرة بالكامل)</li>
                <li>معلومات الاستخدام: سجلات الدخول، الإجراءات داخل التطبيق</li>
                <li>معلومات الدفع: تتم معالجتها بشكل آمن عبر Stripe ولا نحتفظ بتفاصيل البطاقات</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">2. كيف نستخدم معلوماتك</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                نستخدم المعلومات المجمعة للأغراض التالية:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li>تقديم وتحسين خدماتنا</li>
                <li>إنشاء التقارير والتحليلات المالية الشخصية</li>
                <li>إرسال الإشعارات والتنبيهات المهمة</li>
                <li>معالجة المدفوعات والاشتراكات</li>
                <li>تقديم الدعم الفني</li>
                <li>الامتثال للمتطلبات القانونية</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">3. حماية البيانات</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                نتخذ إجراءات أمنية صارمة لحماية بياناتك:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li><strong>التشفير الكامل:</strong> جميع البيانات الحساسة مشفرة باستخدام AES-256</li>
                <li><strong>اتصال آمن:</strong> استخدام HTTPS/SSL لجميع الاتصالات</li>
                <li><strong>المصادقة الآمنة:</strong> كلمات مرور مشفرة باستخدام bcrypt</li>
                <li><strong>النسخ الاحتياطي:</strong> نسخ احتياطية منتظمة ومشفرة</li>
                <li><strong>الوصول المحدود:</strong> فقط الموظفون المصرح لهم يمكنهم الوصول للبيانات</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">4. مشاركة المعلومات</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                نحن لا نبيع أو نؤجر معلوماتك الشخصية لأي طرف ثالث. قد نشارك معلوماتك فقط في الحالات التالية:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li>مع مقدمي الخدمات الموثوقين (مثل Stripe للمدفوعات)</li>
                <li>عند الطلب القانوني من الجهات الحكومية</li>
                <li>لحماية حقوقنا وسلامة المستخدمين</li>
                <li>بموافقتك الصريحة</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">5. حقوقك</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                لديك الحقوق التالية فيما يتعلق ببياناتك:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li><strong>الوصول:</strong> الحصول على نسخة من بياناتك</li>
                <li><strong>التصحيح:</strong> تحديث أو تصحيح معلوماتك</li>
                <li><strong>الحذف:</strong> طلب حذف حسابك وبياناتك بالكامل</li>
                <li><strong>التصدير:</strong> تصدير بياناتك بصيغة قابلة للقراءة</li>
                <li><strong>الاعتراض:</strong> الاعتراض على معالجة بياناتك لأغراض معينة</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">6. ملفات تعريف الارتباط (Cookies)</h3>
              <p className="text-gray-700 leading-relaxed">
                نستخدم ملفات تعريف الارتباط الضرورية فقط لتشغيل التطبيق، مثل الحفاظ على جلسة تسجيل الدخول. 
                يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">7. الاحتفاظ بالبيانات</h3>
              <p className="text-gray-700 leading-relaxed">
                نحتفظ ببياناتك طالما كان حسابك نشطاً أو حسب الحاجة لتقديم الخدمات. عند حذف حسابك، 
                سيتم حذف جميع بياناتك الشخصية خلال 30 يوماً، باستثناء البيانات التي يتطلب القانون الاحتفاظ بها.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">8. خصوصية الأطفال</h3>
              <p className="text-gray-700 leading-relaxed">
                خدماتنا غير موجهة للأطفال دون سن 18 عاماً. نحن لا نجمع عن قصد معلومات شخصية من الأطفال. 
                إذا علمنا أننا جمعنا معلومات من طفل، سنقوم بحذفها فوراً.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">9. التحديثات على هذه السياسة</h3>
              <p className="text-gray-700 leading-relaxed">
                قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سنقوم بإشعارك بأي تغييرات جوهرية عبر البريد 
                الإلكتروني أو من خلال إشعار داخل التطبيق. استمرارك في استخدام الخدمة بعد التحديثات يعني موافقتك عليها.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">10. اتصل بنا</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                إذا كان لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية أو ممارساتنا، يرجى التواصل معنا:
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-gray-700"><strong>البريد الإلكتروني:</strong> privacy@riyalmind.com</p>
                <p className="text-gray-700"><strong>الهاتف:</strong> +966 50 123 4567</p>
                <p className="text-gray-700"><strong>العنوان:</strong> Nexify CRM Systems LLC</p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
