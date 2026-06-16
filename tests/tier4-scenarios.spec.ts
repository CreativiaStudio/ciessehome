import { test, expect } from '@playwright/test';

test.describe('Tier 4 - Real-World Application Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('F4-56: E2E Customer Journey (browse catalog, play video, click inquiry, fill form, submit)', async ({ page }) => {
    // 1. Browse catalog (verify cards exist)
    const cards = page.locator('[data-testid="kitchen-card"]');
    await expect(cards).toHaveCount(16);
    
    // 2. Play video of 3rd kitchen card
    const thirdCard = cards.nth(2);
    const thirdId = await thirdCard.getAttribute('data-id') || 'cucina-modello-luisa-special-hole';
    await thirdCard.locator('[data-testid="play-video-btn"]').click();
    
    // 3. Click inquiry on 3rd kitchen card
    await thirdCard.locator('[data-testid="inquire-kitchen-btn"]').click();
    
    // 4. Fill contact form
    await page.locator('input[name="name"]').fill('Giovanni Bianchi');
    await page.locator('input[name="email"]').fill('giovanni@example.com');
    await page.locator('input[name="phone"]').fill('3399876543');
    await page.locator('textarea[name="notes"]').fill('Interessato alle finiture in noce.');
    
    // 5. Submit lead
    await page.locator('[data-testid="contact-submit"]').click();
    
    // 6. Verify success modal pops up
    await expect(page.locator('[data-testid="success-modal"]')).toBeVisible();
  });

  test('F4-57: E2E Showroom visit request via hero CTA', async ({ page }) => {
    const heroCta = page.locator('[data-testid="hero"] [data-testid="hero-cta-btn"], [data-testid="hero"] a[href*="contact"]');
    await heroCta.click();
    
    await page.locator('input[name="name"]').fill('Chiara Rossi');
    await page.locator('input[name="email"]').fill('chiara@example.com');
    await page.locator('input[name="phone"]').fill('3287654321');
    await page.locator('[data-testid="contact-submit"]').click();
    
    await expect(page.locator('[data-testid="success-modal"]')).toBeVisible();
  });

  test('F4-58: E2E Mobile experience (single column catalog, play video, inquire, fix error, submit)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const firstCard = page.locator('[data-testid="kitchen-card"]').first();
    const bounding = await firstCard.boundingBox();
    expect(bounding?.width).toBeGreaterThan(280);
    
    await firstCard.locator('[data-testid="play-video-btn"]').click();
    await firstCard.locator('[data-testid="inquire-kitchen-btn"]').click();
    
    // Fill with invalid email first
    await page.locator('input[name="name"]').fill('Luca mobile');
    await page.locator('input[name="email"]').fill('luca-invalid');
    await page.locator('input[name="phone"]').fill('3331122334');
    await page.locator('[data-testid="contact-submit"]').click();
    
    await expect(page.locator('[data-testid="error-email"]')).toBeVisible();
    
    // Correct the email and submit
    await page.locator('input[name="email"]').fill('luca.valid@example.com');
    await page.locator('[data-testid="contact-submit"]').click();
    
    await expect(page.locator('[data-testid="success-modal"]')).toBeVisible();
  });

  test('F4-59: E2E Feature comparison, select favorite in form, write notes and submit', async ({ page }) => {
    const cards = page.locator('[data-testid="kitchen-card"]');
    const trigger1 = cards.nth(0).locator('[data-testid="accordion-trigger"]').first();
    const trigger2 = cards.nth(1).locator('[data-testid="accordion-trigger"]').first();
    
    if (await trigger1.isVisible()) {
      await trigger1.click();
    }
    if (await trigger2.isVisible()) {
      await trigger2.click();
    }
    
    const id2 = await cards.nth(1).getAttribute('data-id') || 'camera-da-letto-signorini-e-coco';
    const dropdown = page.locator('select[name="kitchenId"]');
    await dropdown.selectOption(id2);
    
    await page.locator('input[name="name"]').fill('Sofia Verdi');
    await page.locator('input[name="email"]').fill('sofia@example.com');
    await page.locator('input[name="phone"]').fill('3479988776');
    await page.locator('textarea[name="notes"]').fill('Confrontate le camere, preferisco Signorini e Coco.');
    await page.locator('[data-testid="contact-submit"]').click();
    
    await expect(page.locator('[data-testid="success-modal"]')).toBeVisible();
  });

  test('F4-60: Return visitor (reload page, check dynamic catalog loads, submit details)', async ({ page }) => {
    const cardsCountBefore = await page.locator('[data-testid="kitchen-card"]').count();
    expect(cardsCountBefore).toBe(16);
    
    await page.reload();
    
    const cardsCountAfter = await page.locator('[data-testid="kitchen-card"]').count();
    expect(cardsCountAfter).toBe(16);
    
    await page.locator('input[name="name"]').fill('Elena Bianchi');
    await page.locator('input[name="email"]').fill('elena.bianchi@example.com');
    await page.locator('input[name="phone"]').fill('3407766554');
    await page.locator('[data-testid="contact-submit"]').click();
    
    await expect(page.locator('[data-testid="success-modal"]')).toBeVisible();
  });

});
