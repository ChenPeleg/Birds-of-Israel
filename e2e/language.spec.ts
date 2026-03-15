import { test, expect } from '@playwright/test';

test.describe('Language switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows Hebrew header by default', async ({ page }) => {
    await expect(page.getByText('קולות הציפורים בארץ ישראל')).toBeVisible();
  });

  test('switches to English header when EN is clicked', async ({ page }) => {
    await page.locator('#english').click();
    await expect(page.getByText('Birds sounds of Israel')).toBeVisible();
    await expect(page.getByText('קולות הציפורים בארץ ישראל')).not.toBeVisible();
  });

  test('shows bird names in English after switching language', async ({ page }) => {
    await page.locator('#english').click();
    await expect(page.getByText('Sparrow')).toBeVisible();
    await expect(page.getByText('Crow')).toBeVisible();
    await expect(page.getByText('Blackbird')).toBeVisible();
  });

  test('switches back to Hebrew when עב is clicked', async ({ page }) => {
    // First switch to English
    await page.locator('#english').click();
    await expect(page.getByText('Birds sounds of Israel')).toBeVisible();

    // Then switch back to Hebrew
    await page.locator('#hebrew').click();
    await expect(page.getByText('קולות הציפורים בארץ ישראל')).toBeVisible();
    await expect(page.getByText('Birds sounds of Israel')).not.toBeVisible();
  });
});
