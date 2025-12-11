import Link from "next/link"
import { ArrowRight, Shield, Lock, Eye, FileText, Users, AlertTriangle, Mail } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100">
      {/* الهيدر */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
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
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* تنبيه قانوني */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <strong>ملاحظة هامة:</strong> هذه الوثيقة مسودة أولية. يجب مراجعتها من قبل مستشار قانوني متخصص قبل النشر.
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8 md:p-12">
          {/* مقدمة */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-amber-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">حماية بياناتك أولويتنا</h2>
              <p className="text-gray-600">نلتزم بحماية خصوصيتك وأمان معلوماتك</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* 1. مقدمة */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-emerald-600" />
                1. مقدمة
              </h3>
              <p className="text-gray-700 leading-relaxed">
                مرحباً بك في "ريال مايند" ("التطبيق")، المقدم من شركة Nexify CRM Systems LLC ("نحن"، "الشركة"). نحن ملتزمون بحماية خصوصية بياناتك الشخصية والمالية. توضح هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك عند استخدامك لتطبيقنا وخدماتنا.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                <strong>باستخدامك للتطبيق، فإنك توافق على الممارسات الموضحة في هذه السياسة.</strong>
              </p>
            </section>

            {/* 2. الإطار القانوني */}
            <section className="bg-emerald-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">2. الإطار القانوني</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                تم إعداد هذه السياسة لتتوافق مع:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li><strong>قانون حماية البيانات الشخصية السعودي (PDPL)</strong> الصادر بالمرسوم الملكي رقم (م/19) وتاريخ 9/2/1443هـ ولائحته التنفيذية.</li>
                <li><strong>النظام الأوروبي العام لحماية البيانات (GDPR)</strong> كمعيار عالمي لأفضل الممارسات.</li>
              </ul>
            </section>

            {/* 3. البيانات التي نجمعها */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-emerald-600" />
                3. البيانات التي نجمعها
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                نقوم بجمع أنواع مختلفة من البيانات لتقديم وتحسين خدماتنا:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-emerald-100">
                      <th className="border border-gray-300 px-4 py-3 text-right font-bold">نوع البيانات</th>
                      <th className="border border-gray-300 px-4 py-3 text-right font-bold">أمثلة</th>
                      <th className="border border-gray-300 px-4 py-3 text-right font-bold">الغرض من الجمع</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3"><strong>بيانات الهوية</strong></td>
                      <td className="border border-gray-300 px-4 py-3">الاسم، البريد الإلكتروني، صورة الملف الشخصي</td>
                      <td className="border border-gray-300 px-4 py-3">إنشاء الحساب، التواصل، تخصيص التجربة</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3"><strong>البيانات المالية</strong></td>
                      <td className="border border-gray-300 px-4 py-3">الدخل، المصاريف، الميزانيات، الأهداف المالية</td>
                      <td className="border border-gray-300 px-4 py-3">تقديم الوظائف الأساسية، إنشاء التقارير</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3"><strong>بيانات الاشتراك</strong></td>
                      <td className="border border-gray-300 px-4 py-3">نوع الخطة، تاريخ الاشتراك، حالة الدفع</td>
                      <td className="border border-gray-300 px-4 py-3">إدارة الاشتراكات والوصول للميزات</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3"><strong>بيانات تقنية</strong></td>
                      <td className="border border-gray-300 px-4 py-3">عنوان IP، نوع المتصفح، نظام التشغيل</td>
                      <td className="border border-gray-300 px-4 py-3">تحسين الأداء، تحليل الاستخدام، الأمان</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-800 text-sm">
                  <strong>ملاحظة هامة:</strong> نحن <strong>لا نقوم بجمع أو تخزين</strong> بيانات بطاقتك الائتمانية. تتم معالجة جميع المدفوعات بشكل آمن عبر <strong>Stripe</strong> (متوافق مع PCI-DSS).
                </p>
              </div>
            </section>

            {/* 4. كيفية استخدام بياناتك */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">4. كيفية استخدام بياناتك</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                نستخدم بياناتك للأغراض التالية:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li><strong>لتقديم خدماتنا:</strong> إنشاء حسابك، معالجة معاملاتك، وتوفير الميزات الأساسية.</li>
                <li><strong>لتحسين خدماتنا:</strong> تحليل أنماط الاستخدام لتطوير ميزات جديدة.</li>
                <li><strong>للتواصل معك:</strong> إرسال إشعارات هامة ورسائل تسويقية (بموافقتك).</li>
                <li><strong>للأمان:</strong> حماية التطبيق من الاحتيال والوصول غير المصرح به.</li>
                <li><strong>للامتثال القانوني:</strong> الالتزام بالمتطلبات القانونية في المملكة.</li>
              </ul>
            </section>

            {/* 5. مشاركة البيانات */}
            <section className="bg-amber-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-amber-600" />
                5. مشاركة البيانات والإفصاح عنها
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>نحن لا نبيع أو نؤجر بياناتك الشخصية لأي طرف ثالث.</strong> قد نشارك بياناتك في الحالات المحدودة التالية:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li><strong>مع مزودي الخدمات:</strong> Stripe (المدفوعات)، Supabase/Vercel (الاستضافة)، Upstash (Rate Limiting)، Resend (البريد الإلكتروني).</li>
                <li><strong>للامتثال القانوني:</strong> إذا طُلب منا ذلك بموجب أمر قضائي من السلطات السعودية.</li>
                <li><strong>في حالة تغيير الملكية:</strong> عند الاندماج أو الاستحواذ مع الالتزام بنفس شروط الخصوصية.</li>
              </ul>
            </section>

            {/* 6. أمان البيانات */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-emerald-600" />
                6. أمان البيانات
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                نتخذ أمان بياناتك على محمل الجد ونطبق تدابير أمنية متقدمة:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-bold text-emerald-800 mb-2">🔐 التشفير</h4>
                  <p className="text-sm text-gray-700">جميع البيانات مشفرة أثناء النقل (TLS/SSL) والتخزين</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-blue-800 mb-2">🔒 التحكم في الوصول</h4>
                  <p className="text-sm text-gray-700">الوصول مقيد ومقتصر على الموظفين المصرح لهم</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-bold text-purple-800 mb-2">🛡️ جدار الحماية</h4>
                  <p className="text-sm text-gray-700">حماية الخوادم من الهجمات والوصول غير المصرح</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <h4 className="font-bold text-amber-800 mb-2">🔍 مراجعات دورية</h4>
                  <p className="text-sm text-gray-700">تقييمات أمنية منتظمة لتحديد الثغرات</p>
                </div>
              </div>
            </section>

            {/* 7. حقوقك */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">7. حقوقك (حقوق صاحب البيانات)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                وفقاً لقانون حماية البيانات الشخصية السعودي، لديك الحقوق التالية:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-700 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">الحق في العلم</h4>
                    <p className="text-sm text-gray-600">معرفة تفاصيل معالجة بياناتك والغرض منها</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-700 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">الحق في الوصول</h4>
                    <p className="text-sm text-gray-600">طلب نسخة من بياناتك الشخصية</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-700 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">الحق في التصحيح</h4>
                    <p className="text-sm text-gray-600">تصحيح أي بيانات غير دقيقة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-700 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">الحق في الإتلاف</h4>
                    <p className="text-sm text-gray-600">طلب حذف بياناتك في حالات محددة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-700 font-bold">5</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">الحق في سحب الموافقة</h4>
                    <p className="text-sm text-gray-600">سحب موافقتك على معالجة البيانات في أي وقت</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. الاحتفاظ بالبيانات */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">8. الاحتفاظ بالبيانات</h3>
              <p className="text-gray-700 leading-relaxed">
                نحتفظ ببياناتك الشخصية طالما كان حسابك نشطاً أو طالما كان ذلك ضرورياً لتقديم الخدمات. بعد حذف حسابك، سنقوم بحذف بياناتك بشكل آمن خلال <strong>90 يوماً</strong>، ما لم يكن هناك التزام قانوني يتطلب الاحتفاظ بها لفترة أطول.
              </p>
            </section>

            {/* 9. التحديثات */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">9. التحديثات على هذه السياسة</h3>
              <p className="text-gray-700 leading-relaxed">
                قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سنقوم بإعلامك بأي تغييرات جوهرية عن طريق البريد الإلكتروني أو من خلال إشعار بارز داخل التطبيق.
              </p>
            </section>

            {/* 10. معلومات الاتصال */}
            <section className="bg-emerald-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6 text-emerald-600" />
                10. معلومات الاتصال
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية، يرجى التواصل معنا:
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>البريد الإلكتروني:</strong>{" "}
                  <a href="mailto:support@riyalmind.com" className="text-emerald-600 hover:underline">
                    support@riyalmind.com
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>الشركة:</strong> Nexify CRM Systems LLC
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
