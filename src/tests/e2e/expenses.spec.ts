import { test, expect } from '@playwright/test'

test.describe('Expense Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.getByLabel(/البريد الإلكتروني/).fill('test@example.com')
    await page.getByLabel(/كلمة المرور/).fill('password123')
    await page.getByRole('button', { name: /تسجيل الدخول/ }).click()
    await expect(page).toHaveURL(/\/dashboard/)
  })

  test('should display expenses list', async ({ page }) => {
    await page.goto('/dashboard')

    // Should show expenses section
    await expect(page.getByRole('heading', { name: /المصاريف/ })).toBeVisible()
    
    // Should show at least one expense or empty state
    const expensesList = page.locator('[data-testid="expenses-list"]')
    await expect(expensesList).toBeVisible()
  })

  test('should create new expense', async ({ page }) => {
    await page.goto('/add-expense')

    // Fill expense form
    await page.getByLabel(/المبلغ/).fill('100')
    await page.getByLabel(/الوصف/).fill('غداء في المطعم')
    await page.getByLabel(/الفئة/).selectOption('1') // Food category
    
    // Submit form
    await page.getByRole('button', { name: /حفظ/ }).click()

    // Should show success message
    await expect(page.getByText(/تم إضافة المصروف بنجاح/)).toBeVisible()

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/)

    // Should see new expense in list
    await expect(page.getByText(/غداء في المطعم/)).toBeVisible()
  })

  test('should edit existing expense', async ({ page }) => {
    await page.goto('/dashboard')

    // Click edit on first expense
    await page.locator('[data-testid="expense-item"]').first().hover()
    await page.getByRole('button', { name: /تعديل/ }).first().click()

    // Should navigate to edit page
    await expect(page).toHaveURL(/\/expenses\/edit/)

    // Update expense
    await page.getByLabel(/المبلغ/).fill('150')
    await page.getByLabel(/الوصف/).fill('غداء محدث')
    await page.getByRole('button', { name: /حفظ/ }).click()

    // Should show success message
    await expect(page.getByText(/تم تحديث المصروف بنجاح/)).toBeVisible()
  })

  test('should delete expense', async ({ page }) => {
    await page.goto('/dashboard')

    // Get initial count
    const initialCount = await page.locator('[data-testid="expense-item"]').count()

    // Click delete on first expense
    await page.locator('[data-testid="expense-item"]').first().hover()
    await page.getByRole('button', { name: /حذف/ }).first().click()

    // Confirm deletion
    await page.getByRole('button', { name: /تأكيد/ }).click()

    // Should show success message
    await expect(page.getByText(/تم حذف المصروف بنجاح/)).toBeVisible()

    // Count should decrease
    const newCount = await page.locator('[data-testid="expense-item"]').count()
    expect(newCount).toBe(initialCount - 1)
  })

  test('should filter expenses by category', async ({ page }) => {
    await page.goto('/dashboard')

    // Select food category filter
    await page.getByLabel(/الفئة/).selectOption('1')

    // Should only show food expenses
    const expenses = page.locator('[data-testid="expense-item"]')
    const count = await expenses.count()

    for (let i = 0; i < count; i++) {
      const category = await expenses.nth(i).locator('[data-testid="expense-category"]').textContent()
      expect(category).toContain('طعام')
    }
  })

  test('should filter expenses by date range', async ({ page }) => {
    await page.goto('/dashboard')

    // Set date range
    await page.getByLabel(/من تاريخ/).fill('2024-01-01')
    await page.getByLabel(/إلى تاريخ/).fill('2024-01-31')
    await page.getByRole('button', { name: /تطبيق/ }).click()

    // Should show filtered expenses
    const expenses = page.locator('[data-testid="expense-item"]')
    const count = await expenses.count()

    if (count > 0) {
      // Verify dates are within range
      for (let i = 0; i < count; i++) {
        const dateText = await expenses.nth(i).locator('[data-testid="expense-date"]').textContent()
        // Add date validation logic here
      }
    }
  })

  test('should validate expense form', async ({ page }) => {
    await page.goto('/add-expense')

    // Try to submit empty form
    await page.getByRole('button', { name: /حفظ/ }).click()

    // Should show validation errors
    await expect(page.getByText(/المبلغ مطلوب/)).toBeVisible()
    await expect(page.getByText(/الفئة مطلوبة/)).toBeVisible()
  })

  test('should not allow negative amounts', async ({ page }) => {
    await page.goto('/add-expense')

    await page.getByLabel(/المبلغ/).fill('-100')
    await page.getByLabel(/الوصف/).fill('Test')
    await page.getByLabel(/الفئة/).selectOption('1')
    await page.getByRole('button', { name: /حفظ/ }).click()

    // Should show error
    await expect(page.getByText(/المبلغ يجب أن يكون أكبر من صفر/)).toBeVisible()
  })
})
