import Link from "next/link"
import { ArrowRight, FileText, CreditCard, Shield, AlertTriangle, Scale, Mail } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      {/* الهيدر */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-10 h-10 bg-white border border-blue-200 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors shadow-sm"
            >
              <ArrowRight className="w-5 h-5 text-blue-700" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-blue-800">شروط الاستخدام</h1>
              <p className="text-sm text-blue-600">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</p>
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

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-8 md:p-12">
          {/* مقدمة */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">شروط استخدام الخدمة</h2>
              <p className="text-gray-600">يرجى قراءة هذه الشروط بعناية قبل استخدام التطبيق</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* 1. مقدمة */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">1. مقدمة</h3>
              <p className="text-gray-700 leading-relaxed">
                مرحباً بك في "ريال مايند" ("التطبيق")، المقدم من شركة Nexify CRM Systems LLC ("نحن"، "الشركة"). تحكم هذه الشروط والأحكام ("الشروط") استخدامك للتطبيق وجميع الخدمات المرتبطة به.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-800">
                  <strong>باستخدامك للتطبيق، فإنك توافق على الالتزام بهذه الشروط.</strong> إذا كنت لا توافق على هذه الشروط، فيجب عليك التوقف عن استخدام التطبيق فوراً.
                </p>
              </div>
            </section>

            {/* 2. الأهلية */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                2. الأهلية واستخدام الحساب
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-3 mr-4">
                <li>
                  <strong>الأهلية:</strong> يجب أن تكون قد بلغت السن القانوني (18 عاماً) لإبرام عقد ملزم لاستخدام هذا التطبيق.
                </li>
                <li>
                  <strong>دقة المعلومات:</strong> أنت تتعهد بأن جميع المعلومات التي تقدمها عند التسجيل صحيحة ودقيقة ومكتملة.
                </li>
                <li>
                  <strong>أمان الحساب:</strong> أنت مسؤول عن الحفاظ على سرية كلمة المرور وعن جميع الأنشطة التي تحدث تحت حسابك. يجب عليك إبلاغنا فوراً بأي استخدام غير مصرح به.
                </li>
              </ul>
            </section>

            {/* 3. الاشتراكات */}
            <section className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-purple-600" />
                3. الاشتراكات والرسوم والدفع
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">أ. الخطط والأسعار</h4>
                  <p className="text-gray-700 leading-relaxed">
                    نقدم خطط اشتراك مختلفة (فردية وعائلية، شهرية وسنوية). الأسعار موضحة في صفحة الاشتراكات وهي قابلة للتغيير. سيتم إخطارك بأي تغيير في الأسعار قبل 30 يوماً على الأقل من تاريخ التجديد.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2">ب. الفترة التجريبية المجانية</h4>
                  <p className="text-gray-700 leading-relaxed">
                    قد نقدم فترة تجريبية مجانية للمستخدمين الجدد. بعد انتهاء الفترة التجريبية، سيتم تحصيل رسوم الاشتراك تلقائياً ما لم تقم بإلغاء الاشتراك قبل تاريخ الانتهاء.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2">ج. الدفع والتجديد</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                    <li>تتم معالجة جميع المدفوعات عبر شريكنا <strong>Stripe</strong>. أنت توافق على تقديم معلومات دفع صالحة.</li>
                    <li>يتم تجديد الاشتراكات تلقائياً في نهاية كل فترة. أنت تفوضنا بتحصيل الرسوم من طريقة الدفع الخاصة بك.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2">د. الإلغاء واسترداد الأموال</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                    <li><strong>الإلغاء:</strong> يمكنك إلغاء اشتراكك في أي وقت. سيظل بإمكانك الوصول للميزات حتى نهاية فترة الاشتراك الحالية.</li>
                    <li><strong>استرداد الأموال:</strong> جميع المدفوعات نهائية وغير قابلة للاسترداد، ما لم ينص القانون على خلاف ذلك.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. ترخيص الاستخدام */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">4. ترخيص الاستخدام</h3>
              <p className="text-gray-700 leading-relaxed">
                نمنحك ترخيصاً <strong>محدوداً، غير حصري، غير قابل للتحويل، وقابل للإلغاء</strong> لاستخدام التطبيق لأغراضك الشخصية وغير التجارية، وفقاً لهذه الشروط.
              </p>
            </section>

            {/* 5. قيود الاستخدام */}
            <section className="bg-red-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">5. قيود الاستخدام</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                أنت توافق على <strong>عدم القيام</strong> بأي مما يلي:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                <li>استخدام التطبيق لأي غرض غير قانوني أو محظور.</li>
                <li>إجراء هندسة عكسية أو تفكيك أو محاولة اكتشاف الكود المصدري.</li>
                <li>بيع أو تأجير أو إعادة ترخيص أو توزيع التطبيق.</li>
                <li>استخدام أي وسيلة آلية (bots, scrapers) للوصول إلى التطبيق.</li>
                <li>التدخل في التشغيل السليم للتطبيق أو خوادمه.</li>
              </ul>
            </section>

            {/* 6. المحتوى والبيانات */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">6. المحتوى والبيانات</h3>
              <div className="space-y-4">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-bold text-emerald-800 mb-2">✅ ملكيتك للمحتوى</h4>
                  <p className="text-sm text-gray-700">
                    أنت تحتفظ بملكية جميع البيانات المالية والمعلومات التي تدخلها في التطبيق.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-blue-800 mb-2">📄 ترخيص لنا</h4>
                  <p className="text-sm text-gray-700">
                    أنت تمنحنا ترخيصاً لاستخدام وتخزين ومعالجة محتواك فقط لغرض تقديم وتشغيل وتحسين خدمات التطبيق.
                  </p>
                </div>
              </div>
            </section>

            {/* 7. إخلاء المسؤولية */}
            <section className="bg-amber-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                7. إخلاء المسؤولية
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">"كما هو"</h4>
                  <p className="text-gray-700 leading-relaxed">
                    يتم توفير التطبيق <strong>"كما هو"</strong> و <strong>"كما هو متاح"</strong> دون أي ضمانات من أي نوع. نحن لا نضمن أن التطبيق سيكون خالياً من الأخطاء أو الانقطاعات.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">ليس استشارة مالية</h4>
                  <p className="text-gray-700 leading-relaxed">
                    المعلومات والتحليلات المقدمة في التطبيق هي <strong>لأغراض إعلامية فقط</strong> ولا تشكل استشارة مالية أو قانونية أو ضريبية. يجب عليك استشارة متخصص مؤهل.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. تحديد المسؤولية */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">8. تحديد المسؤولية</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                إلى أقصى حد يسمح به القانون، لن نكون مسؤولين عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية، بما في ذلك خسارة الأرباح أو البيانات.
              </p>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>تقتصر مسؤوليتنا الإجمالية</strong> تجاهك عن جميع المطالبات على المبلغ الذي دفعته لنا خلال الـ 12 شهراً الماضية.
                </p>
              </div>
            </section>

            {/* 9. التعويض */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">9. التعويض</h3>
              <p className="text-gray-700 leading-relaxed">
                أنت توافق على تعويضنا والدفاع عنا ضد أي مطالبات أو التزامات تنشأ عن:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4 mt-3">
                <li>استخدامك للتطبيق</li>
                <li>انتهاكك لهذه الشروط</li>
                <li>انتهاكك لأي قانون أو حقوق طرف ثالث</li>
              </ul>
            </section>

            {/* 10. إنهاء الخدمة */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">10. إنهاء الخدمة</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-blue-800 mb-2">من جانبك</h4>
                  <p className="text-sm text-gray-700">
                    يمكنك إنهاء الاتفاقية بحذف حسابك والتوقف عن استخدام التطبيق.
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-bold text-red-800 mb-2">من جانبنا</h4>
                  <p className="text-sm text-gray-700">
                    يجوز لنا تعليق أو إنهاء وصولك إذا انتهكت هذه الشروط بشكل جوهري.
                  </p>
                </div>
              </div>
            </section>

            {/* 11. القانون الحاكم */}
            <section className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-purple-600" />
                11. القانون الحاكم والاختصاص القضائي
              </h3>
              <p className="text-gray-700 leading-relaxed">
                تخضع هذه الشروط وتُفسر وفقاً لأنظمة <strong>المملكة العربية السعودية</strong>. أنت توافق على أن أي نزاع ينشأ عن هذه الشروط سيكون من اختصاص المحاكم المختصة في مدينة <strong>الرياض</strong>.
              </p>
            </section>

            {/* 12. التغييرات */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">12. التغييرات على الشروط</h3>
              <p className="text-gray-700 leading-relaxed">
                قد نقوم بتحديث هذه الشروط من وقت لآخر. سنقوم بإعلامك بأي تغييرات جوهرية عن طريق البريد الإلكتروني أو إشعار بارز. استمرارك في استخدام التطبيق بعد نشر التغييرات يعتبر موافقة منك على الشروط المحدثة.
              </p>
            </section>

            {/* 13. معلومات الاتصال */}
            <section className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6 text-blue-600" />
                13. معلومات الاتصال
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                إذا كان لديك أي أسئلة حول شروط الاستخدام، يرجى التواصل معنا:
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>البريد الإلكتروني:</strong>{" "}
                  <a href="mailto:support@riyalmind.com" className="text-blue-600 hover:underline">
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
