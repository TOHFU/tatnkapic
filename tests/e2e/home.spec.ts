import { test, expect } from '@playwright/test';

test.describe('TankaPic - Home Page', () => {
  test('should display the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/TankaPic/);
  });

  test('should display the main heading', async ({ page }) => {
    await page.goto('/');
    const heading = page.getByRole('heading', { name: /TankaPic/ });
    await expect(heading).toBeVisible();
  });
});
