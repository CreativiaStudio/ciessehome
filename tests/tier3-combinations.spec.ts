import { test, expect } from '@playwright/test';

test.describe('Tier 3 - Cross-Feature Combinations', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('F3-51: Click "Richiedi Informazioni" CTA on card scrolls to form and auto-selects kitchen', async ({ page }) => {
    const firstCard = page.locator('[data-testid="kitchen-card"]').first();
    const id = await firstCard.getAttribute('data-id') || 'camera-contemporanea-colore-bianco';
    const inquireBtn = firstCard.locator('[data-testid="inquire-kitchen-btn"]');
    
    await inquireBtn.click();
    
    const selectedVal = await page.locator('select[name="kitchenId"]').inputValue();
    expect(selectedVal).toBe(id);
    
    const isFormInViewport = await page.locator('[data-testid="contact-form"]').evaluate((el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    });
    expect(isFormInViewport).toBe(true);
  });

  test('F3-52: Video playing, click inquiry CTA: video pauses and form selected', async ({ page }) => {
    const firstCard = page.locator('[data-testid="kitchen-card"]').first();
    const id = await firstCard.getAttribute('data-id') || 'camera-contemporanea-colore-bianco';
    const playBtn = firstCard.locator('[data-testid="play-video-btn"]');
    const video = firstCard.locator('video').first();
    const inquireBtn = firstCard.locator('[data-testid="inquire-kitchen-btn"]');
    
    await playBtn.click();
    await inquireBtn.click();
    
    const isPaused = await video.evaluate((el: HTMLVideoElement) => el.paused);
    expect(isPaused).toBe(true);
    
    const selectedVal = await page.locator('select[name="kitchenId"]').inputValue();
    expect(selectedVal).toBe(id);
  });

  test('F3-53: Submit success: closing success modal retains scroll position', async ({ page }) => {
    const form = page.locator('[data-testid="contact-form"]');
    await form.scrollIntoViewIfNeeded();
    const initialScrollY = await page.evaluate(() => window.scrollY);
    
    await page.locator('input[name="name"]').fill('Mario Rossi');
    await page.locator('input[name="email"]').fill('mario@example.com');
    await page.locator('input[name="phone"]').fill('3401234567');
    await page.locator('[data-testid="contact-submit"]').click();
    
    const successModal = page.locator('[data-testid="success-modal"]');
    await expect(successModal).toBeVisible();
    
    const closeBtn = page.locator('[data-testid="close-modal-btn"]');
    await closeBtn.click();
    await expect(successModal).not.toBeVisible();
    
    const finalScrollY = await page.evaluate(() => window.scrollY);
    expect(Math.abs(finalScrollY - initialScrollY)).toBeLessThan(50);
  });

  test('F3-54: Mobile menu click "Contatti": menu closes and form fields focused', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const menuBtn = page.locator('[data-testid="mobile-menu-btn"], button[aria-label*="menu"]').first();
    if (await menuBtn.isVisible()) {
      await menuBtn.click();
    }
    
    const contactLink = page.locator('[data-testid="nav-contact-link"]');
    await contactLink.click();
    
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toBeFocused();
  });

  test('F3-55: Accordion expand while video playing works smoothly', async ({ page }) => {
    const firstCard = page.locator('[data-testid="kitchen-card"]').first();
    const playBtn = firstCard.locator('[data-testid="play-video-btn"]');
    const video = firstCard.locator('video').first();
    
    await playBtn.click();
    
    const accordionTrigger = firstCard.locator('[data-testid="accordion-trigger"]').first();
    if (await accordionTrigger.isVisible()) {
      await accordionTrigger.click();
      const accordionContent = firstCard.locator('[data-testid="accordion-content"]').first();
      await expect(accordionContent).toBeVisible();
    }
    
    const isPaused = await video.evaluate((el: HTMLVideoElement) => el.paused);
    expect(isPaused).toBe(false);
  });

});
