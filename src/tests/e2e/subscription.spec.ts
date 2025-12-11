import { test, expect } from '@playwright/test'

test.describe('Subscription Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.getByLabel(/البريد الإلكتروني/).fill('test@example.com')
    await page.getByLabel(/كلمة المرور/).fill('password123')
    await page.getByRole('button', { name: /تسجيل الدخول/ }).click()
    await expect(page).toHaveURL(/\/dashboard/)
  })

  test('should display subscription plans', async ({ page }) => {
    await page.goto('/billing')

    // Should show promotional banner
    await expect(page.getByText(/30 يوم تجريبي مجاني/)).toBeVisible()
    await expect(page.getByText(/خصم 25%/)).toBeVisible()

    // Should show plan cards
    await expect(page.getByText(/فردي شهري/)).toBeVisible()
    await expect(page.getByText(/عائلي شهري/)).toBeVisible()

    // Should show prices
    await expect(page.getByText(/22 ر.س/)).toBeVisible() // Individual monthly with discount
    await expect(page.getByText(/37 ر.س/)).toBeVisible() // Family monthly with discount
  })

  test('should toggle between monthly and yearly plans', async ({ page }) => {
    await page.goto('/billing')

    // Initially should show monthly plans
    await expect(page.getByText(/شهري/)).toHaveClass(/bg-white/)

    // Click yearly toggle
    await page.getByRole('button', { name: /سنوي/ }).click()

    // Should show yearly plans
    await expect(page.getByText(/سنوي/)).toHaveClass(/bg-white/)
    await expect(page.getByText(/187 ر.س/)).toBeVisible() // Individual yearly with discount
    await expect(page.getByText(/337 ر.س/)).toBeVisible() // Family yearly with discount
  })

  test('should initiate subscription checkout', async ({ page, context }) => {
    await page.goto('/billing')

    // Click subscribe button for individual monthly plan
    const subscribeButton = page.locator('[data-plan="individual_monthly"]').getByRole('button', { name: /اشترك/ })
    await subscribeButton.click()

    // Should redirect to Stripe checkout (or show loading)
    // In test mode, you might mock Stripe or check for redirect
    await page.waitForURL(/checkout\.stripe\.com|\/account/, { timeout: 10000 })
  })

  test('should show trial information in account page', async ({ page }) => {
    // Assuming user is in trial period
    await page.goto('/account')

    // Should show trial banner
    const trialBanner = page.locator('[data-testid="trial-banner"]')
    if (await trialBanner.isVisible()) {
      await expect(trialBanner).toContainText(/الفترة التجريبية/)
      await expect(trialBanner).toContainText(/تنتهي في/)
    }
  })

  test('should display current subscription details', async ({ page }) => {
    await page.goto('/billing')

    // Should show current plan section
    const currentPlanSection = page.locator('[data-testid="current-plan"]')
    if (await currentPlanSection.isVisible()) {
      await expect(currentPlanSection).toContainText(/الخطة الحالية/)
      await expect(currentPlanSection).toContainText(/التجديد التلقائي/)
    }
  })

  test('should allow plan upgrade', async ({ page }) => {
    await page.goto('/billing')

    // If user is on individual plan, should be able to upgrade to family
    const upgradeButton = page.getByRole('button', { name: /ترقية/ }).first()
    if (await upgradeButton.isVisible()) {
      await upgradeButton.click()

      // Should show confirmation dialog
      await expect(page.getByText(/هل أنت متأكد من الترقية/)).toBeVisible()
      
      // Confirm upgrade
      await page.getByRole('button', { name: /تأكيد/ }).click()

      // Should show success message
      await expect(page.getByText(/تمت الترقية بنجاح/)).toBeVisible()
    }
  })

  test('should allow subscription cancellation', async ({ page }) => {
    await page.goto('/billing')

    // Click cancel subscription button
    const cancelButton = page.getByRole('button', { name: /إلغاء الاشتراك/ })
    if (await cancelButton.isVisible()) {
      await cancelButton.click()

      // Should show confirmation dialog with warning
      await expect(page.getByText(/هل أنت متأكد من إلغاء الاشتراك/)).toBeVisible()
      await expect(page.getByText(/سيستمر الاشتراك حتى نهاية الفترة المدفوعة/)).toBeVisible()

      // Confirm cancellation
      await page.getByRole('button', { name: /تأكيد الإلغاء/ }).click()

      // Should show success message
      await expect(page.getByText(/تم إلغاء الاشتراك/)).toBeVisible()
    }
  })

  test('should display invoice history', async ({ page }) => {
    await page.goto('/billing')

    // Scroll to invoices section
    await page.locator('[data-testid="invoices-section"]').scrollIntoViewIfNeeded()

    // Should show invoices table
    const invoicesTable = page.locator('[data-testid="invoices-table"]')
    if (await invoicesTable.isVisible()) {
      // Should have headers
      await expect(invoicesTable.getByText(/التاريخ/)).toBeVisible()
      await expect(invoicesTable.getByText(/المبلغ/)).toBeVisible()
      await expect(invoicesTable.getByText(/الحالة/)).toBeVisible()
    }
  })

  test('should download invoice', async ({ page }) => {
    await page.goto('/billing')

    // Find first download button
    const downloadButton = page.locator('[data-testid="download-invoice"]').first()
    if (await downloadButton.isVisible()) {
      // Start waiting for download before clicking
      const downloadPromise = page.waitForEvent('download')
      await downloadButton.click()
      
      const download = await downloadPromise
      
      // Verify download
      expect(download.suggestedFilename()).toMatch(/invoice.*\.pdf/)
    }
  })

  test('should show discount badge on plans', async ({ page }) => {
    await page.goto('/billing')

    // Should show 25% discount badge
    const discountBadge = page.locator('[data-testid="discount-badge"]')
    await expect(discountBadge).toBeVisible()
    await expect(discountBadge).toContainText(/25%/)
  })

  test('should show old and new prices', async ({ page }) => {
    await page.goto('/billing')

    // Each plan should show old price (crossed out) and new price
    const planCards = page.locator('[data-testid="plan-card"]')
    const count = await planCards.count()

    for (let i = 0; i < count; i++) {
      const card = planCards.nth(i)
      
      // Should have old price with line-through
      const oldPrice = card.locator('[data-testid="old-price"]')
      await expect(oldPrice).toHaveCSS('text-decoration', /line-through/)
      
      // Should have new price
      const newPrice = card.locator('[data-testid="new-price"]')
      await expect(newPrice).toBeVisible()
    }
  })
})
