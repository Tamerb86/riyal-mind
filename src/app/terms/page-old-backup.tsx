import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"

export default function TermsOfServicePage() {
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
              <h1 className="text-2xl font-bold text-emerald-800">شروط الاستخدام</h1>
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">شروط وأحكام الخدمة</h2>
              <p className="text-gray-600">يرجى قراءة هذه الشروط بعناية قبل استخدام الخدمة</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">1. قبول الشروط</h3>
              <p className="text-gray-700 leading-relaxed">
                باستخدامك لتطبيق "ريال مايند"، فإنك توافق على الالتزام بهذه الشروط والأحكام. 
                إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام الخدمة.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">2. وصف الخدمة</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                "ريال مايند" هو تطبيق ويب لإدارة المصاريف الشخصية والعائلية يوفر:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li>تتبع المصاريف والدخل</li>
                <li>إدارة الميزانيات والأهداف المالية</li>
                <li>تقارير وتحليلات مالية</li>
                <li>إدارة المجموعات العائلية والمشتركة</li>
                <li>نظام اشتراكات شهري وسنوي</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">3. الحساب والتسجيل</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                عند إنشاء حساب، أنت توافق على:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li>تقديم معلومات دقيقة وكاملة</li>
                <li>الحفاظ على سرية كلمة المرور الخاصة بك</li>
                <li>إخطارنا فوراً بأي استخدام غير مصرح به لحسابك</li>
                <li>أنك تبلغ من العمر 18 عاماً على الأقل</li>
                <li>تحديث معلوماتك عند الحاجة</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">4. الاشتراكات والمدفوعات</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                نقدم خطط اشتراك شهرية وسنوية:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li>الأسعار تشمل ضريبة القيمة المضافة</li>
                <li>التجديد التلقائي ما لم يتم الإلغاء</li>
                <li>يمكن إلغاء الاشتراك في أي وقت</li>
                <li>لا توجد استردادات للفترات المدفوعة مسبقاً</li>
                <li>قد نغير الأسعار مع إشعار مسبق 30 يوماً</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">5. الاستخدام المقبول</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                أنت توافق على عدم:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li>استخدام الخدمة لأي غرض غير قانوني</li>
                <li>محاولة الوصول غير المصرح به للنظام</li>
                <li>التدخل في عمل الخدمة أو خوادمها</li>
                <li>نسخ أو تعديل أو توزيع محتوى الخدمة</li>
                <li>استخدام الخدمة لإرسال محتوى ضار أو مسيء</li>
                <li>إنشاء حسابات متعددة لتجنب الدفع</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">6. الملكية الفكرية</h3>
              <p className="text-gray-700 leading-relaxed">
                جميع حقوق الملكية الفكرية في التطبيق والخدمة محفوظة لـ Nexify CRM Systems LLC. 
                أنت تحتفظ بملكية بياناتك الشخصية، ولكن تمنحنا ترخيصاً لاستخدامها لتقديم الخدمة.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">7. إخلاء المسؤولية</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                الخدمة مقدمة "كما هي" دون أي ضمانات:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li>لا نضمن أن الخدمة ستكون خالية من الأخطاء أو متاحة دائماً</li>
                <li>لا نقدم مشورة مالية أو استثمارية</li>
                <li>أنت مسؤول عن قراراتك المالية</li>
                <li>لا نضمن دقة التقارير أو التحليلات</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">8. حدود المسؤولية</h3>
              <p className="text-gray-700 leading-relaxed">
                لن نكون مسؤولين عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية ناتجة عن 
                استخدامك أو عدم قدرتك على استخدام الخدمة، بما في ذلك فقدان البيانات أو الأرباح.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">9. إنهاء الخدمة</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                نحتفظ بالحق في:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li>تعليق أو إنهاء حسابك في حالة انتهاك الشروط</li>
                <li>تعديل أو إيقاف الخدمة في أي وقت</li>
                <li>رفض الخدمة لأي شخص لأي سبب</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                يمكنك إنهاء حسابك في أي وقت من خلال إعدادات الحساب.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">10. التعديلات على الشروط</h3>
              <p className="text-gray-700 leading-relaxed">
                نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنقوم بإشعارك بأي تغييرات جوهرية. 
                استمرارك في استخدام الخدمة بعد التعديلات يعني موافقتك على الشروط الجديدة.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">11. القانون الحاكم</h3>
              <p className="text-gray-700 leading-relaxed">
                تخضع هذه الشروط وتفسر وفقاً لقوانين المملكة العربية السعودية. أي نزاع ينشأ عن 
                هذه الشروط سيخضع للاختصاص الحصري للمحاكم السعودية.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">12. اتصل بنا</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                إذا كان لديك أي أسئلة حول هذه الشروط، يرجى التواصل معنا:
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-gray-700"><strong>البريد الإلكتروني:</strong> legal@riyalmind.com</p>
                <p className="text-gray-700"><strong>الهاتف:</strong> +966 50 123 4567</p>
                <p className="text-gray-700"><strong>الشركة:</strong> Nexify CRM Systems LLC</p>
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
