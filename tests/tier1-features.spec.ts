import { test, expect } from '@playwright/test';
import cucine from '../../cucine.json';

test.describe('Tier 1 - Feature Coverage', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to base URL before each test.
    await page.goto('/');
  });

  // F1: Premium Design & Style
  test('F1-1: Check page loads with a custom styled hero section', async ({ page }) => {
    const hero = page.locator('[data-testid="hero"]');
    await expect(hero).toBeVisible();
  });

  test('F1-2: Check premium typography styles', async ({ page }) => {
    const heading = page.locator('[data-testid="hero"] h1');
    await expect(heading).toBeVisible();
    const classList = await heading.getAttribute('class');
    // Verify that premium serif/sans classes are defined on the primary heading
    expect(classList).toMatch(/(font-serif|font-sans|serif|sans|playfair|cinzel|inter)/i);
  });

  test('F1-3: Check responsive classes on grids', async ({ page }) => {
    const catalog = page.locator('[data-testid="kitchen-catalog"]');
    await expect(catalog).toBeVisible();
    const classList = await catalog.getAttribute('class');
    // Check that standard tailwind responsive grid-cols are declared
    expect(classList).toMatch(/(grid-cols-|md:grid-cols-|lg:grid-cols-)/);
  });

  test('F1-4: Check that animated elements exist', async ({ page }) => {
    // Check that animation trigger classes or inline transform/opacity properties exist
    const animated = page.locator('[class*="transition"], [class*="duration-"], [class*="animate-"], [style*="opacity"], [style*="transform"]').first();
    await expect(animated).toBeVisible();
  });

  test('F1-5: Check mobile viewport horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/'); // Reload for viewport configuration
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflow).toBe(false);
  });

  // F2: "Rinnovo Showroom" Concept & Copy
  test('F2-6: Verify hero heading contains "Rinnovo Showroom"', async ({ page }) => {
    const headingText = await page.locator('[data-testid="hero"] h1').innerText();
    expect(headingText).toContain('Rinnovo Showroom');
  });

  test('F2-7: Verify Italian copy details 50% clearance event', async ({ page }) => {
    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(/(50%|sconto 50%|metà prezzo|metà prezzo)/i);
  });

  test('F2-8: Verify absence of distress word "Chiusura"', async ({ page }) => {
    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('Chiusura');
    expect(bodyText).not.toContain('chiusura');
  });

  test('F2-9: Verify absence of distress word "Crisi"', async ({ page }) => {
    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('Crisi');
    expect(bodyText).not.toContain('crisi');
  });

  test('F2-10: Verify absence of other distress words', async ({ page }) => {
    const bodyText = await page.textContent('body');
    const distressWords = ['Fallimento', 'fallimento', 'Liquidazione', 'liquidazione', 'Sgombero', 'sgombero', 'Svendo', 'svendo'];
    for (const word of distressWords) {
      expect(bodyText).not.toContain(word);
    }
  });

  // F3: Dynamic Kitchen Catalog
  test('F3-11: Verify catalog grid element is rendered', async ({ page }) => {
    const catalog = page.locator('[data-testid="kitchen-catalog"]');
    await expect(catalog).toBeVisible();
  });

  test('F3-12: Verify exactly 16 kitchen cards are rendered', async ({ page }) => {
    const cards = page.locator('[data-testid="kitchen-card"]');
    await expect(cards).toHaveCount(16);
  });

  test('F3-13: Verify each card has price = 50% of original price in cucine.json', async ({ page }) => {
    const cards = page.locator('[data-testid="kitchen-card"]');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const nameText = (await card.locator('[data-testid="kitchen-name"]').innerText()).trim();
      const item = cucine.find(c => c.name.toLowerCase() === nameText.toLowerCase());
      expect(item).toBeDefined();
      if (item) {
        const originalPriceVal = parseFloat(item.originalPrice);
        const expectedPromoPrice = originalPriceVal * 0.5;
        const priceText = await card.locator('[data-testid="kitchen-price"]').innerText();
        const cleanPrice = parseFloat(priceText.replace(/[^\d]/g, ''));
        expect(cleanPrice).toBe(expectedPromoPrice);
      }
    }
  });

  test('F3-14: Verify kitchen name matches cucine.json', async ({ page }) => {
    const cards = page.locator('[data-testid="kitchen-card"]');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const nameText = (await card.locator('[data-testid="kitchen-name"]').innerText()).trim();
      const matches = cucine.some(c => c.name.toLowerCase() === nameText.toLowerCase());
      expect(matches).toBe(true);
    }
  });

  test('F3-15: Verify kitchen features are rendered as HTML text', async ({ page }) => {
    const cards = page.locator('[data-testid="kitchen-card"]');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const featuresList = card.locator('[data-testid="kitchen-features"]');
      await expect(featuresList).toBeVisible();
      const html = await featuresList.innerHTML();
      expect(html.length).toBeGreaterThan(0);
    }
  });

  // F4: Video Player
  test('F4-16: Verify video player container in each card', async ({ page }) => {
    const cards = page.locator('[data-testid="kitchen-card"]');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const player = card.locator('[data-testid="video-player"]');
      await expect(player).toBeVisible();
    }
  });

  test('F4-17: Verify video player is paused/non-autoplay by default', async ({ page }) => {
    const video = page.locator('[data-testid="video-player"] video').first();
    const isPaused = await video.evaluate((el: HTMLVideoElement) => el.paused);
    expect(isPaused).toBe(true);
  });

  test('F4-18: Verify Play button plays video', async ({ page }) => {
    const firstCard = page.locator('[data-testid="kitchen-card"]').first();
    const playBtn = firstCard.locator('[data-testid="play-video-btn"]');
    const video = firstCard.locator('[data-testid="video-player"] video');
    await playBtn.click();
    const isPaused = await video.evaluate((el: HTMLVideoElement) => el.paused);
    expect(isPaused).toBe(false);
  });

  test('F4-19: Verify Pause button pauses video', async ({ page }) => {
    const firstCard = page.locator('[data-testid="kitchen-card"]').first();
    const playBtn = firstCard.locator('[data-testid="play-video-btn"]');
    const pauseBtn = firstCard.locator('[data-testid="pause-video-btn"]');
    const video = firstCard.locator('[data-testid="video-player"] video');
    await playBtn.click();
    await pauseBtn.click();
    const isPaused = await video.evaluate((el: HTMLVideoElement) => el.paused);
    expect(isPaused).toBe(true);
  });

  test('F4-20: Verify video controls have accessibility tags', async ({ page }) => {
    const firstCard = page.locator('[data-testid="kitchen-card"]').first();
    const playBtn = firstCard.locator('[data-testid="play-video-btn"]');
    const pauseBtn = firstCard.locator('[data-testid="pause-video-btn"]');
    const playAria = await playBtn.getAttribute('aria-label');
    const pauseAria = await pauseBtn.getAttribute('aria-label');
    expect(playAria).toBeTruthy();
    expect(pauseAria).toBeTruthy();
  });

  // F5: Contact Form
  test('F5-21: Verify contact form is present', async ({ page }) => {
    const form = page.locator('[data-testid="contact-form"]');
    await expect(form).toBeVisible();
  });

  test('F5-22: Verify form contains inputs: name, email, phone, kitchen, notes', async ({ page }) => {
    const form = page.locator('[data-testid="contact-form"]');
    await expect(form.locator('input[name="name"], [data-testid="contact-name"]')).toBeVisible();
    await expect(form.locator('input[name="email"], [data-testid="contact-email"]')).toBeVisible();
    await expect(form.locator('input[name="phone"], [data-testid="contact-phone"]')).toBeVisible();
    await expect(form.locator('select[name="kitchenId"], [data-testid="contact-kitchen"]')).toBeVisible();
    await expect(form.locator('textarea[name="notes"], [data-testid="contact-notes"]')).toBeVisible();
  });

  test('F5-23: Verify form CTA text encourages showroom visit/info request', async ({ page }) => {
    const submitBtn = page.locator('[data-testid="contact-submit"], button[type="submit"]');
    const text = await submitBtn.innerText();
    expect(text).toMatch(/(richiedi|invia|visita|showroom|info|contattaci)/i);
  });

  test('F5-24: Verify submitting valid data triggers success modal', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Mario Rossi');
    await page.locator('input[name="email"]').fill('mario.rossi@example.com');
    await page.locator('input[name="phone"]').fill('3401234567');
    await page.locator('select[name="kitchenId"]').selectOption({ index: 1 });
    await page.locator('textarea[name="notes"]').fill('Richiesta info');
    await page.locator('[data-testid="contact-submit"]').click();
    const successModal = page.locator('[data-testid="success-modal"]');
    await expect(successModal).toBeVisible();
  });

  test('F5-25: Verify kitchen dropdown contains 16 options', async ({ page }) => {
    const options = page.locator('select[name="kitchenId"] option');
    const count = await options.count();
    let kitchenOptions = 0;
    for (let i = 0; i < count; i++) {
      const val = await options.nth(i).getAttribute('value');
      if (val && val !== '') {
        kitchenOptions++;
      }
    }
    expect(kitchenOptions).toBe(16);
  });

});
