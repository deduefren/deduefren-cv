import { expect, test } from '@playwright/test';

test('centers certification images at a consistent size within their cards', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('/');

  const imageSizes = await page.locator('#certifications .certification-card__image-wrap').evaluateAll((images) =>
    images.map((image) => {
      const { width, height } = image.getBoundingClientRect();
      return `${width}x${height}`;
    }),
  );
  const badgeSizes = await page.locator('#certifications .certification-card__image').evaluateAll((images) =>
    images.map((image) => {
      const { width, height } = image.getBoundingClientRect();
      return `${width}x${height}`;
    }),
  );
  expect(new Set(imageSizes).size).toBe(1);
  expect(new Set(badgeSizes).size).toBe(1);

  const card = page.locator('#certifications .certification-card').first();
  const image = card.locator('.certification-card__image-wrap');
  await image.scrollIntoViewIfNeeded();

  const cardBounds = await card.boundingBox();
  const imageBounds = await image.boundingBox();
  expect(cardBounds).not.toBeNull();
  expect(imageBounds).not.toBeNull();

  if (!cardBounds || !imageBounds) {
    throw new Error('Certification card image is not visible');
  }

  const cardCenter = cardBounds.x + cardBounds.width / 2;
  const imageCenter = imageBounds.x + imageBounds.width / 2;
  expect(Math.abs(imageCenter - cardCenter)).toBeLessThanOrEqual(1);
});
