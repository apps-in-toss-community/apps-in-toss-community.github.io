import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ROUTES = [
  { path: '/', expectedLang: 'ko' },
  { path: '/ko/', expectedLang: 'ko' },
  { path: '/en/', expectedLang: 'en' },
] as const;

const THEMES = ['light', 'dark'] as const;

for (const { path, expectedLang } of ROUTES) {
  test.describe(`a11y: ${path}`, () => {
    for (const theme of THEMES) {
      test(`axe-core finds zero WCAG 2.1 A/AA violations (${theme})`, async ({ page }) => {
        // The site runs an inline pre-paint script that reads `aitc-theme` from
        // localStorage and sets `<html data-theme>` before first render. Seed
        // localStorage on the origin so the bootstrap script picks the right
        // theme on the first load — toggling after load would re-render but is
        // harder to assert against.
        await page.addInitScript((mode) => {
          try {
            window.localStorage.setItem('aitc-theme', mode);
          } catch {
            // ignore — page will fall back to system theme
          }
        }, theme);

        await page.goto(path);
        await page.waitForLoadState('networkidle');

        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

        expect(
          results.violations,
          `axe-core violations on ${path} (${theme}):\n${JSON.stringify(results.violations, null, 2)}`,
        ).toEqual([]);
      });
    }

    test('document structure: lang, single h1, landmarks', async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      await expect(page.locator('html')).toHaveAttribute('lang', expectedLang);

      await expect(page.locator('h1')).toHaveCount(1);

      await expect(page.locator('main#main')).toHaveCount(1);
      await expect(page.locator('header').first()).toBeVisible();
      await expect(page.locator('footer').first()).toBeVisible();
    });

    test('skip-to-main link is the first focusable element', async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      await expect(focused).toHaveAttribute('href', '#main');
    });
  });
}
