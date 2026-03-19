import { test, expect } from '@playwright/test';

test.describe('Bird detail view', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows bird description after clicking a bird card', async ({ page }) => {
    // Click the Sparrow card (Hebrew name: דרור)
    await page.getByText('דרור').click();
    // Description should now be visible
    await expect(page.getByText(/מקור עבה המותאם לאכילת זרעים/)).toBeVisible();
  });

  test('shows only one bird description at a time', async ({ page }) => {
    // Click Sparrow first
    await page.getByText('דרור').click();
    await expect(page.getByText(/מקור עבה המותאם לאכילת זרעים/)).toBeVisible();

    // Click Crow next
    await page.getByText('עורב').click();
    // Crow description should be visible
    await expect(page.getByText(/אוכלי כל/)).toBeVisible();
    // Sparrow description should no longer be visible
    await expect(page.getByText(/מקור עבה המותאם לאכילת זרעים/)).not.toBeVisible();
  });

  test('shows English description when language is English', async ({ page }) => {
    // Switch to English
    await page.locator('#english').click();
    // Click the Sparrow card (English name: Sparrow)
    await page.getByText('Sparrow').click();
    // English description should be visible
    await expect(page.getByText(/A thick beak adapted for eating seeds/)).toBeVisible();
  });
});
