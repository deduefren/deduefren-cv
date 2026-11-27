import { expect, test } from '@playwright/test';

test('alternates experience cards between both sides of the timeline', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');

  const sides = await page.locator('#career .career-item').evaluateAll((items) => {
    const timeline = document.querySelector('#career .career-timeline');
    if (!timeline) {
      return [];
    }

    const timelineCenter = timeline.getBoundingClientRect().left + timeline.getBoundingClientRect().width / 2;
    return items.map((item) => {
      const card = item.querySelector('.career-card');
      if (!card) {
        return null;
      }

      const bounds = card.getBoundingClientRect();
      return bounds.left + bounds.width / 2 > timelineCenter;
    });
  });

  expect(sides.length).toBeGreaterThan(1);
  for (let index = 1; index < sides.length; index += 1) {
    expect(sides[index]).not.toBe(sides[index - 1]);
  }
});
