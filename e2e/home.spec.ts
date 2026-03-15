import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays the page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Israel Birds Sounds/);
  });

  test('renders the app header with Hebrew title by default', async ({ page }) => {
    await expect(page.getByText('קולות הציפורים בארץ ישראל')).toBeVisible();
  });

  test('renders the bird list with all birds', async ({ page }) => {
    // Default language is Hebrew, so bird names should be in Hebrew
    await expect(page.getByText('דרור')).toBeVisible();
    await expect(page.getByText('עורב')).toBeVisible();
    await expect(page.getByText('שחרור')).toBeVisible();
    await expect(page.getByText('נקר')).toBeVisible();
    await expect(page.getByText('דררה')).toBeVisible();
    await expect(page.getByText('פשוש')).toBeVisible();
    await expect(page.getByText('סנונית רפתות')).toBeVisible();
  });

  test('renders the language toggle buttons', async ({ page }) => {
    await expect(page.locator('#hebrew')).toBeVisible();
    await expect(page.locator('#english')).toBeVisible();
  });
});
