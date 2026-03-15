import { test, expect } from '@playwright/test';

test.describe('Responsive layout', () => {
  test('renders bird list on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Header should be visible on mobile
    await expect(page.getByText('קולות הציפורים בארץ ישראל')).toBeVisible();

    // Bird cards should still be present on mobile
    await expect(page.getByText('דרור')).toBeVisible();
    await expect(page.getByText('עורב')).toBeVisible();
  });

  test('renders bird list on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    await expect(page.getByText('קולות הציפורים בארץ ישראל')).toBeVisible();
    await expect(page.getByText('דרור')).toBeVisible();
  });

  test('clicking a bird card shows description on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await page.getByText('דרור').click();
    await expect(page.getByText(/מקור עבה המותאם לאכילת זרעים/)).toBeVisible();
  });
});
