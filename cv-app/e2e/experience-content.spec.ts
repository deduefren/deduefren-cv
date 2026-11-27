import { expect, test } from '@playwright/test';

test('presents the continuous Plain Concepts role and data-platform focus', async ({ page }) => {
  await page.goto('/');

  const timeline = page.locator('#career');
  await expect(timeline.getByRole('heading', { name: 'Backend Engineer (Data & BI) at Plain Concepts' })).toBeVisible();
  await expect(timeline).toContainText(/May 2022\s*[–-]\s*Present/i);
  await expect(timeline).toContainText(/product venture/i);
  await expect(timeline).not.toContainText(/Sidra/i);

  const plainConceptsEntry = timeline.locator('.career-item').filter({ hasText: 'Backend Engineer (Data & BI) at Plain Concepts' });
  await expect(plainConceptsEntry.locator('.career-marker__image')).toHaveAttribute('src', '/assets/img/about/12.jpg');
  await expect(plainConceptsEntry.locator('.career-marker__image')).toHaveAttribute('alt', 'Plain Concepts logo');

  const roleChange = timeline.locator('.career-item').filter({ hasText: 'Role shifts toward AI and data' });
  await expect(roleChange).toContainText('May 2024');
  await expect(roleChange).toContainText('Microsoft Fabric');
});
