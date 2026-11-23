import { expect, test } from '@playwright/test';

test('activates Contact at the bottom of a tall viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1200 });
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));

  const contactLink = page.getByRole('link', { name: 'Contact me', exact: true });
  await expect(page.locator('#contact')).toBeInViewport();
  await expect(contactLink).toHaveClass(/active/);
});
