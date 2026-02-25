import { test, expect } from '@playwright/test'

test('dashboard loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('wjbetech-dashboard')).toBeVisible()
  await expect(page.getByText('Kanban board')).toBeVisible()
})
