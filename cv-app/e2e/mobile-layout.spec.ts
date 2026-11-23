import { expect, test } from '@playwright/test';

test.use({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('closes the mobile menu after a section is selected', async ({ page }) => {
  const toggle = page.getByRole('button', { name: 'Toggle navigation' });
  const navigation = page.locator('#navbarResponsive');

  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(navigation).toBeVisible();

  await page.getByRole('link', { name: 'Experience', exact: true }).click();

  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(navigation).toBeHidden();
  await expect(page).toHaveURL(/#career$/);
});

test('keeps experience timeline markers within the mobile viewport', async ({ page }) => {
  const marker = page.locator('#career .career-marker').first();
  await marker.scrollIntoViewIfNeeded();

  const markerBounds = await marker.boundingBox();
  const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth);
  const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);

  expect(markerBounds).not.toBeNull();
  if (!markerBounds) {
    throw new Error('Experience timeline marker is not visible');
  }

  expect(markerBounds.x).toBeGreaterThanOrEqual(0);
  expect(markerBounds.x + markerBounds.width).toBeLessThanOrEqual(viewportWidth);
  expect(documentWidth).toBeLessThanOrEqual(viewportWidth);
});
