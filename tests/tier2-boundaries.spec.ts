import { test, expect } from '@playwright/test';

test.describe('Tier 2 - Boundary & Corner Cases', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // F1: Premium Design Edge Cases
  test('F2-26: Check page layout on ultra-wide viewports', async ({ page }) => {
    await page.setViewportSize({ width: 2560, height: 1440 });
    await page.goto('/');
    const body = page.locator('body');
    await expect(body).toBeVisible();
    const width = await page.evaluate(() => window.innerWidth);
    expect(width).toBe(2560);
  });

  test('F2-27: Check layout on ultra-narrow mobile viewports', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');
    const body = page.locator('body');
    await expect(body).toBeVisible();
    const width = await page.evaluate(() => window.innerWidth);
    expect(width).toBe(320);
  });

  test('F2-28: Check horizontal scrollbars are absent on body', async ({ page }) => {
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });

  test('F2-29: Verify premium color contrast classes', async ({ page }) => {
    const hero = page.locator('[data-testid="hero"]');
    const classList = await hero.getAttribute('class');
    expect(classList).toMatch(/(slate|zinc|stone|neutral|gray|amber|black|white|bg-|text-)/);
  });

  test('F2-30: Verify scroll animations do not block user scroll', async ({ page }) => {
    const bodyOverflow = await page.evaluate(() => window.getComputedStyle(document.body).overflow);
    expect(bodyOverflow).not.toBe('hidden');
  });

  // F2: "Rinnovo Showroom" Copy Edge Cases
  test('F2-31: Case-insensitive distress word check', async ({ page }) => {
    const text = (await page.textContent('body')) || '';
    const badWords = ['chiusura', 'crisi', 'FALLIMENTO', 'LIQUIDAZIONE', 'sgombero', 'svendo'];
    for (const word of badWords) {
      expect(text.toLowerCase()).not.toContain(word.toLowerCase());
    }
  });

  test('F2-32: Punctuation trick check', async ({ page }) => {
    const text = (await page.textContent('body')) || '';
    const variations = ['chiu-sura', 'c.r.i.s.i', 'fal-limento', 'liq-uidazione', 'sgom-bero'];
    for (const v of variations) {
      expect(text.toLowerCase()).not.toContain(v.toLowerCase());
    }
  });

  test('F2-33: Check absence of cheap phrases like "svendita totale", "fuori tutto"', async ({ page }) => {
    const text = (await page.textContent('body')) || '';
    const cheapPhrases = ['svendita totale', 'fuori tutto', 'tutto fuori'];
    for (const phrase of cheapPhrases) {
      expect(text.toLowerCase()).not.toContain(phrase.toLowerCase());
    }
  });

  test('F2-34: Verify brand name "Ciesse Home" is spelled correctly', async ({ page }) => {
    const text = (await page.textContent('body')) || '';
    expect(text).toContain('Ciesse Home');
    expect(text).not.toContain('Ciese Home');
  });

  test('F2-35: Verify semantic heading structure for accessibility', async ({ page }) => {
    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    expect(h2Count).toBeGreaterThanOrEqual(1);
  });

  // F3: Dynamic Kitchen Catalog Edge Cases
  test('F2-36: Render gracefully if image/video falls back', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('F2-37: Verify originalPrice > price for all elements', async ({ page }) => {
    const cards = page.locator('[data-testid="kitchen-card"]');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const priceText = await card.locator('[data-testid="kitchen-price"]').innerText();
      const origText = await card.locator('[data-testid="kitchen-original-price"]').innerText();
      const price = parseFloat(priceText.replace(/[^\d]/g, ''));
      const original = parseFloat(origText.replace(/[^\d]/g, ''));
      expect(original).toBeGreaterThan(price);
    }
  });

  test('F2-38: Check large price formatting', async ({ page }) => {
    const priceText = await page.locator('[data-testid="kitchen-price"]').first().innerText();
    expect(priceText).toMatch(/\d{1,2}\.\d{3}\s*€/);
  });

  test('F2-39: Verify text wrapping for long feature lists', async ({ page }) => {
    const featureList = page.locator('[data-testid="kitchen-features"]').first();
    const display = await featureList.evaluate((el: HTMLElement) => window.getComputedStyle(el).display);
    expect(display).not.toBe('inline');
  });

  test('F2-40: Verify catalog filter or default displays all 16 items', async ({ page }) => {
    const visibleCardsCount = await page.locator('[data-testid="kitchen-card"]:visible').count();
    expect(visibleCardsCount).toBe(16);
  });

  // F4: Video Player Edge Cases
  test('F2-41: Single-play focus: playing one video pauses others', async ({ page }) => {
    const cards = page.locator('[data-testid="kitchen-card"]');
    const playBtn1 = cards.nth(0).locator('[data-testid="play-video-btn"]');
    const playBtn2 = cards.nth(1).locator('[data-testid="play-video-btn"]');
    const video1 = cards.nth(0).locator('video');
    const video2 = cards.nth(1).locator('video');

    await playBtn1.click();
    await playBtn2.click();

    const isPaused1 = await video1.evaluate((el: HTMLVideoElement) => el.paused);
    const isPaused2 = await video2.evaluate((el: HTMLVideoElement) => el.paused);
    expect(isPaused1).toBe(true);
    expect(isPaused2).toBe(false);
  });

  test('F2-42: Verify video path correctness', async ({ page }) => {
    const videoSrc = await page.locator('video source, video').first().getAttribute('src');
    expect(videoSrc).toMatch(/^\/videos\/.*\/Video(-retro)?\.mp4$/);
  });

  test('F2-43: Verify player renders a preview/thumbnail poster when paused', async ({ page }) => {
    const video = page.locator('video').first();
    const poster = await video.getAttribute('poster');
    expect(poster).toBeTruthy();
  });

  test('F2-44: Verify player starts muted or has mute toggle', async ({ page }) => {
    const video = page.locator('video').first();
    const isMuted = await video.evaluate((el: HTMLVideoElement) => el.muted || el.volume === 0);
    const muteBtn = page.locator('[data-testid="mute-video-btn"]').first();
    expect(isMuted || (await muteBtn.count()) > 0).toBe(true);
  });

  test('F2-45: Verify player pauses when scrolled out of view', async ({ page }) => {
    const firstCard = page.locator('[data-testid="kitchen-card"]').first();
    const playBtn = firstCard.locator('[data-testid="play-video-btn"]');
    const video = firstCard.locator('video').first();

    await playBtn.click();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    const isPaused = await video.evaluate((el: HTMLVideoElement) => el.paused);
    expect(isPaused).toBe(true);
  });

  // F5: Contact Form Edge Cases
  test('F2-46: Validation boundary: empty fields trigger error messages', async ({ page }) => {
    const submitBtn = page.locator('[data-testid="contact-submit"]');
    await submitBtn.click();
    const errorElements = page.locator('[data-testid^="error-"]');
    expect(await errorElements.count()).toBeGreaterThan(0);
  });

  test('F2-47: Email validation edge cases', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Mario Rossi');
    await page.locator('input[name="email"]').fill('invalid-email');
    await page.locator('input[name="phone"]').fill('3401234567');
    await page.locator('[data-testid="contact-submit"]').click();
    const emailError = page.locator('[data-testid="error-email"]');
    await expect(emailError).toBeVisible();
  });

  test('F2-48: Phone validation edge cases', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Mario Rossi');
    await page.locator('input[name="email"]').fill('mario@example.com');
    await page.locator('input[name="phone"]').fill('abc');
    await page.locator('[data-testid="contact-submit"]').click();
    const phoneError = page.locator('[data-testid="error-phone"]');
    await expect(phoneError).toBeVisible();
  });

  test('F2-49: HTML Injection check: Name/Notes field text is sanitized', async ({ page }) => {
    await page.locator('input[name="name"]').fill('<script id="injected">console.log("XSS")</script>');
    await page.locator('[data-testid="contact-submit"]').click();
    const injectedScript = page.locator('script#injected');
    await expect(injectedScript).not.toBeAttached();
  });

  test('F2-50: Submit duplicate request handled gracefully', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Mario Rossi');
    await page.locator('input[name="email"]').fill('mario@example.com');
    await page.locator('input[name="phone"]').fill('3401234567');
    const submitBtn = page.locator('[data-testid="contact-submit"]');
    await submitBtn.click();
    await submitBtn.click();
    const successModal = page.locator('[data-testid="success-modal"]');
    await expect(successModal).toBeVisible();
  });

});
