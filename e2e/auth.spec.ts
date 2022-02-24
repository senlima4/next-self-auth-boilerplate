import { test, expect } from '@playwright/test'

test.describe('auth-flow', () => {
  test.use({ storageState: 'artifact/no-auth-state.json' })

  test('should redirect to auth page', async ({ page }) => {
    await page.goto('/profile')
    await expect(page).toHaveURL('/auth')
  })

  test('handle authenticate and redirect to profile page', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Login')

    await expect(page).toHaveURL('/auth')

    await page.fill('input[name="email"]', 'test@mail.com')
    await page.fill('input[name="password"]', 'test-password')
    await page.click('text=Submit')

    await expect(page).toHaveURL('/profile')
  })
})

test.describe('auth-validation', () => {
  test.use({ storageState: 'artifact/tester-auth-state.json' })

  test('should redirect to profile page', async ({ page }) => {
    await page.goto('/auth')
    await expect(page).toHaveURL('/profile')

    const email = page.locator('text=test@mail.com')
    await expect(email).toBeTruthy()
  })

  test('handle logout and redirect to auth page', async ({ page }) => {
    await page.goto('/profile')
    await page.click('text=Logout')

    await expect(page).toHaveURL('/auth')
  })
})
