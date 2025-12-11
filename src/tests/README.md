# دليل الاختبارات - ريال مايند

## 📁 هيكل المجلد

```
src/tests/
├── setup.ts                    # إعداد بيئة الاختبار
├── api/                        # اختبارات API
│   └── stripe.test.ts         # اختبارات Stripe API
├── actions/                    # اختبارات Server Actions
│   └── expense.test.ts        # اختبارات إدارة المصاريف
├── components/                 # اختبارات المكونات
│   └── expense-form.test.tsx  # اختبارات نموذج المصاريف
└── e2e/                        # اختبارات شاملة
    ├── auth.spec.ts           # تدفق التسجيل والدخول
    ├── expenses.spec.ts       # إدارة المصاريف
    └── subscription.spec.ts   # الاشتراكات والدفع
```

---

## 🚀 تشغيل الاختبارات

### اختبارات الوحدة والتكامل

```bash
# تشغيل جميع الاختبارات
npm run test

# تشغيل مع واجهة مستخدم
npm run test:ui

# تشغيل مع تقرير التغطية
npm run test:coverage

# تشغيل اختبارات محددة
npm run test src/tests/api/stripe.test.ts

# وضع المراقبة (يعيد التشغيل عند التغيير)
npm run test -- --watch
```

### اختبارات E2E

```bash
# تشغيل جميع اختبارات E2E
npm run test:e2e

# تشغيل مع واجهة مستخدم
npm run test:e2e:ui

# تشغيل في وضع التصحيح
npm run test:e2e:debug

# تشغيل على متصفح محدد
npm run test:e2e -- --project=chromium

# تشغيل اختبار محدد
npm run test:e2e src/tests/e2e/auth.spec.ts
```

### تشغيل جميع الاختبارات

```bash
npm run test:all
```

---

## ✍️ كتابة اختبارات جديدة

### 1. اختبار Server Action

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { myAction } from '@/actions/my-action'

// Mock dependencies
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}))

describe('My Action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should perform action successfully', async () => {
    // Setup
    const { auth } = await import('@/auth')
    vi.mocked(auth).mockResolvedValue({
      user: { id: 'test-user' },
    } as any)

    // Execute
    const result = await myAction({ data: 'test' })

    // Assert
    expect(result.success).toBe(true)
  })
})
```

### 2. اختبار مكون React

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyComponent } from '@/components/my-component'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('should handle user interaction', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<MyComponent onClick={handleClick} />)
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### 3. اختبار E2E

```typescript
import { test, expect } from '@playwright/test'

test.describe('My Feature', () => {
  test('should complete user flow', async ({ page }) => {
    // Navigate
    await page.goto('/my-page')

    // Interact
    await page.getByLabel('Input').fill('test')
    await page.getByRole('button', { name: 'Submit' }).click()

    // Assert
    await expect(page.getByText('Success')).toBeVisible()
  })
})
```

---

## 🎯 أفضل الممارسات

### 1. تسمية الاختبارات

- استخدم أسماء وصفية تشرح ما يتم اختباره
- ابدأ بـ "should" لوصف السلوك المتوقع
- مثال: `should create expense successfully`

### 2. هيكل الاختبار (AAA Pattern)

```typescript
it('should do something', async () => {
  // Arrange (الإعداد)
  const data = { value: 'test' }
  
  // Act (التنفيذ)
  const result = await myFunction(data)
  
  // Assert (التحقق)
  expect(result).toBe(expected)
})
```

### 3. عزل الاختبارات

- كل اختبار يجب أن يكون مستقلاً
- استخدم `beforeEach` لإعادة تهيئة الحالة
- نظف بعد كل اختبار باستخدام `afterEach`

### 4. Mock الاعتماديات الخارجية

```typescript
// Mock Prisma
vi.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}))

// Mock Stripe
vi.mock('@/lib/stripe', () => ({
  stripe: {
    checkout: {
      sessions: {
        create: vi.fn(),
      },
    },
  },
}))
```

---

## 📊 تقرير التغطية

بعد تشغيل `npm run test:coverage`، يمكنك عرض التقرير:

```bash
# فتح تقرير HTML
open coverage/index.html
```

**الهدف:** تغطية 80%+ للكود الحرج.

---

## 🐛 تصحيح الأخطاء

### Vitest

```bash
# تشغيل اختبار واحد في وضع التصحيح
npm run test -- --inspect-brk src/tests/api/stripe.test.ts
```

### Playwright

```bash
# تشغيل في وضع التصحيح
npm run test:e2e:debug

# عرض التقرير بعد الفشل
npx playwright show-report
```

---

## 📚 موارد إضافية

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## ❓ الأسئلة الشائعة

### لماذا تفشل الاختبارات بعد تحديث الكود؟

هذا هو الهدف! الاختبارات تكتشف التغييرات التي قد تكسر الوظائف الموجودة.

### كيف أتخطى اختباراً مؤقتاً؟

```typescript
it.skip('should be fixed later', () => {
  // ...
})
```

### كيف أركز على اختبار واحد؟

```typescript
it.only('should run only this test', () => {
  // ...
})
```

---

**تم إنشاؤه بواسطة:** Manus AI
**التاريخ:** ديسمبر 2024
