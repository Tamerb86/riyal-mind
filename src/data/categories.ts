// src/data/categories.ts

export interface Category {
  id: number
  name: string
  icon: string
  color: string
  sortOrder: number
}

export interface Subcategory {
  id: number
  categoryId: number
  categoryName: string
  name: string
  aliases: string[]
  usageCount: number
}

export interface Currency {
  code: string
  symbol: string
  name: string
  flag: string
}

// الفئات الرئيسية
export const categories: Category[] = [
  { id: 1, name: 'طعام', icon: '🍽️', color: '#F59E0B', sortOrder: 1 },
  { id: 2, name: 'مواصلات', icon: '🚗', color: '#10B981', sortOrder: 2 },
  { id: 3, name: 'سكن', icon: '🏠', color: '#3B82F6', sortOrder: 3 },
  { id: 4, name: 'فواتير وخدمات', icon: '🧾', color: '#84CC16', sortOrder: 4 },
  { id: 5, name: 'صحة', icon: '🏥', color: '#EF4444', sortOrder: 5 },
  { id: 6, name: 'تعليم ودورات', icon: '📚', color: '#F97316', sortOrder: 6 },
  { id: 7, name: 'ترفيه', icon: '🎉', color: '#8B5CF6', sortOrder: 7 },
  { id: 8, name: 'سفر', icon: '✈️', color: '#06B6D4', sortOrder: 8 },
  { id: 9, name: 'تسوق عام', icon: '🛍️', color: '#EC4899', sortOrder: 9 },
  { id: 10, name: 'احتياجات شخصية', icon: '👕', color: '#EAB308', sortOrder: 10 },
  { id: 11, name: 'أخرى', icon: '❓', color: '#6B7280', sortOrder: 99 }
]

// البنود الفرعية
export const subcategories: Subcategory[] = [
  // طعام
  { id: 1, categoryId: 1, categoryName: 'طعام', name: 'مطاعم', aliases: ['مطعم', 'مأكولات', 'وجبات', 'ريستورانت'], usageCount: 0 },
  { id: 2, categoryId: 1, categoryName: 'طعام', name: 'قهوة ومشروبات', aliases: ['قهوة', 'كافيه', 'مشروبات', 'عصائر', 'ستاربكس'], usageCount: 0 },
  { id: 3, categoryId: 1, categoryName: 'طعام', name: 'بقالة وسوبرماركت', aliases: ['بقالة', 'سوبرماركت', 'مواد غذائية', 'تموينات', 'هايبر'], usageCount: 0 },
  { id: 4, categoryId: 1, categoryName: 'طعام', name: 'حلويات ومعجنات', aliases: ['حلويات', 'كيك', 'معجنات', 'حلا', 'آيس كريم'], usageCount: 0 },
  { id: 5, categoryId: 1, categoryName: 'طعام', name: 'وجبات سريعة', aliases: ['برجر', 'بيتزا', 'وجبة سريعة', 'فاست فود', 'ماكدونالدز'], usageCount: 0 },

  // مواصلات
  { id: 6, categoryId: 2, categoryName: 'مواصلات', name: 'وقود', aliases: ['بنزين', 'ديزل', 'وقود السيارة', 'محطة وقود'], usageCount: 0 },
  { id: 7, categoryId: 2, categoryName: 'مواصلات', name: 'تاكسي وأوبر', aliases: ['تاكسي', 'أوبر', 'كريم', 'نقل', 'مواصلات عامة'], usageCount: 0 },
  { id: 8, categoryId: 2, categoryName: 'مواصلات', name: 'صيانة السيارة', aliases: ['صيانة', 'إصلاح السيارة', 'قطع غيار', 'ورشة'], usageCount: 0 },
  { id: 9, categoryId: 2, categoryName: 'مواصلات', name: 'مواقف سيارات', aliases: ['موقف', 'باركنج', 'ركن السيارة'], usageCount: 0 },

  // سكن
  { id: 10, categoryId: 3, categoryName: 'سكن', name: 'إيجار المنزل', aliases: ['إيجار', 'أجرة المنزل', 'إيجار الشقة'], usageCount: 0 },
  { id: 11, categoryId: 3, categoryName: 'سكن', name: 'أثاث ومفروشات', aliases: ['أثاث', 'مفروشات', 'ديكور', 'إيكيا'], usageCount: 0 },
  { id: 12, categoryId: 3, categoryName: 'سكن', name: 'صيانة منزل', aliases: ['صيانة البيت', 'إصلاحات منزلية', 'صيانة'], usageCount: 0 },

  // فواتير وخدمات
  { id: 13, categoryId: 4, categoryName: 'فواتير وخدمات', name: 'كهرباء', aliases: ['فاتورة كهرباء', 'الكهرباء', 'السعودية للكهرباء'], usageCount: 0 },
  { id: 14, categoryId: 4, categoryName: 'فواتير وخدمات', name: 'مياه', aliases: ['فاتورة مياه', 'المياه', 'ماء'], usageCount: 0 },
  { id: 15, categoryId: 4, categoryName: 'فواتير وخدمات', name: 'إنترنت واتصالات', aliases: ['إنترنت', 'جوال', 'اتصالات', 'موبايلي', 'زين'], usageCount: 0 },
  { id: 16, categoryId: 4, categoryName: 'فواتير وخدمات', name: 'اشتراكات رقمية', aliases: ['نتفليكس', 'شاهد', 'سبوتيفاي', 'اشتراك'], usageCount: 0 },

  // صحة
  { id: 17, categoryId: 5, categoryName: 'صحة', name: 'عيادة ومستشفى', aliases: ['دكتور', 'طبيب', 'عيادة', 'مستشفى'], usageCount: 0 },
  { id: 18, categoryId: 5, categoryName: 'صحة', name: 'دواء وصيدلية', aliases: ['دواء', 'صيدلية', 'أدوية', 'النهدي', 'الدواء'], usageCount: 0 },
  { id: 19, categoryId: 5, categoryName: 'صحة', name: 'تحاليل ومختبر', aliases: ['تحاليل', 'مختبر', 'فحوصات'], usageCount: 0 },

  // تعليم ودورات
  { id: 20, categoryId: 6, categoryName: 'تعليم ودورات', name: 'رسوم دراسية', aliases: ['مدرسة', 'جامعة', 'رسوم', 'تعليم'], usageCount: 0 },
  { id: 21, categoryId: 6, categoryName: 'تعليم ودورات', name: 'كتب ومستلزمات', aliases: ['كتب', 'قرطاسية', 'مستلزمات دراسية'], usageCount: 0 },
  { id: 22, categoryId: 6, categoryName: 'تعليم ودورات', name: 'دورات تدريبية', aliases: ['دورة', 'كورس', 'تدريب'], usageCount: 0 },

  // ترفيه
  { id: 23, categoryId: 7, categoryName: 'ترفيه', name: 'سينما ومسرح', aliases: ['سينما', 'أفلام', 'تذاكر', 'مسارح'], usageCount: 0 },
  { id: 24, categoryId: 7, categoryName: 'ترفيه', name: 'ألعاب وهوايات', aliases: ['ألعاب', 'هوايات', 'ترفيه'], usageCount: 0 },
  { id: 25, categoryId: 7, categoryName: 'ترفيه', name: 'منتزهات وملاهي', aliases: ['ملاهي', 'منتزهات', 'حدائق'], usageCount: 0 },

  // سفر
  { id: 26, categoryId: 8, categoryName: 'سفر', name: 'تذاكر طيران', aliases: ['طيران', 'تذاكر', 'سفر', 'رحلات'], usageCount: 0 },
  { id: 27, categoryId: 8, categoryName: 'سفر', name: 'فنادق وإقامة', aliases: ['فندق', 'إقامة', 'حجز'], usageCount: 0 },
  { id: 28, categoryId: 8, categoryName: 'سفر', name: 'جولات سياحية', aliases: ['جولة', 'سياحة', 'رحلة'], usageCount: 0 },

  // تسوق عام
  { id: 29, categoryId: 9, categoryName: 'تسوق عام', name: 'ملابس وأزياء', aliases: ['ملابس', 'أزياء', 'أحذية'], usageCount: 0 },
  { id: 30, categoryId: 9, categoryName: 'تسوق عام', name: 'إلكترونيات', aliases: ['جوال', 'لابتوب', 'إلكترونيات', 'أجهزة'], usageCount: 0 },
  { id: 31, categoryId: 9, categoryName: 'تسوق عام', name: 'هدايا', aliases: ['هدية', 'هدايا', 'مناسبات'], usageCount: 0 },

  // احتياجات شخصية
  { id: 32, categoryId: 10, categoryName: 'احتياجات شخصية', name: 'العناية الشخصية', aliases: ['عطور', 'مكياج', 'عناية'], usageCount: 0 },
  { id: 33, categoryId: 10, categoryName: 'احتياجات شخصية', name: 'صالون وحلاقة', aliases: ['صالون', 'حلاقة', 'تجميل'], usageCount: 0 },

  // أخرى
  { id: 34, categoryId: 11, categoryName: 'أخرى', name: 'متنوع', aliases: ['أخرى', 'متنوع', 'عام'], usageCount: 0 }
]

// العملات المدعومة
export const currencies: Currency[] = [
  { code: 'SAR', symbol: 'ر.س', name: 'ريال سعودي', flag: '🇸🇦' },
  { code: 'USD', symbol: '$', name: 'دولار أمريكي', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'يورو', flag: '🇪🇺' },
  { code: 'AED', symbol: 'د.إ', name: 'درهم إماراتي', flag: '🇦🇪' },
  { code: 'KWD', symbol: 'د.ك', name: 'دينار كويتي', flag: '🇰🇼' },
  { code: 'BHD', symbol: 'د.ب', name: 'دينار بحريني', flag: '🇧🇭' },
  { code: 'OMR', symbol: 'ر.ع', name: 'ريال عماني', flag: '🇴🇲' },
  { code: 'QAR', symbol: 'ر.ق', name: 'ريال قطري', flag: '🇶🇦' }
]

// دوال مساعدة
export function getCategoryById(id: number): Category | undefined {
  return categories.find(cat => cat.id === id)
}

export function getSubcategoriesByCategory(categoryId: number): Subcategory[] {
  return subcategories.filter(sub => sub.categoryId === categoryId)
}

export function getCurrencyByCode(code: string): Currency | undefined {
  return currencies.find(curr => curr.code === code)
}

export function formatAmount(amount: number, currencyCode: string): string {
  const currency = getCurrencyByCode(currencyCode)
  if (!currency) return `${amount}`
  return `${amount.toLocaleString('ar-SA')} ${currency.symbol}`
}
