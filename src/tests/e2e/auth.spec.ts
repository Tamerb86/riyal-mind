import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display login page', async ({ page }) => {
    await expect(page).toHaveTitle(/ريال مايند/)
    await expect(page.getByRole('heading', { name: /تسجيل الدخول/ })).toBeVisible()
  })

  test('should login with valid credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login')

    // Fill in login form
    await page.getByLabel(/البريد الإلكتروني/).fill('test@example.com')
    await page.getByLabel(/كلمة المرور/).fill('password123')

    // Submit form
    await page.getByRole('button', { name: /تسجيل الدخول/ }).click()

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/)
    await expect(page.getByText(/مرحباً/)).toBeVisible()
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel(/البريد الإلكتروني/).fill('invalid@example.com')
    await page.getByLabel(/كلمة المرور/).fill('wrongpassword')
    await page.getByRole('button', { name: /تسجيل الدخول/ }).click()

    // Should show error message
    await expect(page.getByText(/البريد الإلكتروني أو كلمة المرور غير صحيحة/)).toBeVisible()
  })

  test('should register new user', async ({ page }) => {
    await page.goto('/register')

    // Fill registration form
    await page.getByLabel(/الاسم/).fill('مستخدم جديد')
    await page.getByLabel(/البريد الإلكتروني/).fill('newuser@example.com')
    await page.getByLabel(/كلمة المرور/).fill('password123')
    await page.getByLabel(/تأكيد كلمة المرور/).fill('password123')

    // Accept terms
    await page.getByRole('checkbox', { name: /أوافق على الشروط/ }).check()

    // Submit form
    await page.getByRole('button', { name: /إنشاء حساب/ }).click()

    // Should show success message
    await expect(page.getByText(/تم إنشاء الحساب بنجاح/)).toBeVisible()
  })

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.getByLabel(/البريد الإلكتروني/).fill('test@example.com')
    await page.getByLabel(/كلمة المرور/).fill('password123')
    await page.getByRole('button', { name: /تسجيل الدخول/ }).click()

    await expect(page).toHaveURL(/\/dashboard/)

    // Logout
    await page.getByRole('button', { name: /تسجيل الخروج/ }).click()

    // Should redirect to home
    await expect(page).toHaveURL('/')
  })
})
