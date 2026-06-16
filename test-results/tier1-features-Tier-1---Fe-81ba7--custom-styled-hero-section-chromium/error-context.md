# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier1-features.spec.ts >> Tier 1 - Feature Coverage >> F1-1: Check page loads with a custom styled hero section
- Location: tests\tier1-features.spec.ts:12:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="hero"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-testid="hero"]')

```

```yaml
- banner:
  - text: CIESSE HOME OUTLET SHOWROOM
  - navigation:
    - link "Cucine in Svendita":
      - /url: "#catalog"
    - link "L'Esposizione":
      - /url: "#about"
    - link "Prenota Visita":
      - /url: "#contact"
  - link "Richiedi Info":
    - /url: "#contact"
- main:
  - text: Sconti Straordinari Fino al 50%
  - 'heading "Rinnovo Showroom: Cucine Premium in Svendita" [level=1]'
  - paragraph: Per rinnovo locali, svendiamo 16 splendide cucine di design in esposizione. Finiture di lusso, elettrodomestici di marca inclusi, pronte per essere installate a casa tua a prezzi mai visti.
  - link "Blocca la tua offerta":
    - /url: "#contact"
  - text: Showroom Renewal 2026 16 Modelli Disponibili -50% Prezzo di Listino
  - heading "Perché Scegliere una Cucina da Esposizione Ciesse Home" [level=2]
  - paragraph: Tutte le cucine in vendita provengono direttamente dallo showroom Ciesse Home, garantendo massima qualità e un'attenzione maniacale al dettaglio.
  - heading "Qualità Professionale" [level=3]
  - paragraph: Design contemporaneo curato nei dettagli, materiali di prima scelta e finiture premium ideate per durare nel tempo.
  - heading "Elettrodomestici Top Gamma" [level=3]
  - paragraph: Ogni cucina include elettrodomestici di marchi prestigiosi (piani cottura, forni, frigoriferi, lavastoviglie) già integrati.
  - heading "Adattabilità Spazi" [level=3]
  - paragraph: I nostri consulenti sono a tua disposizione per adattare il layout della cucina showroom alle misure reali della tua casa.
  - heading "Richiedi Informazioni o Prenota una Visita" [level=3]
  - paragraph: Compila il modulo per fissare un appuntamento e ricevere il catalogo prezzi completo.
  - text: Nome Completo
  - textbox "Es. Mario Rossi"
  - text: Email
  - textbox "mario.rossi@example.com"
  - text: Telefono
  - textbox "333 1234567"
  - text: Modello di Interesse (Opzionale)
  - combobox:
    - option "Seleziona un modello o chiedi informazioni generali" [selected]
    - option "Modello Moderno in Rovere"
    - option "Modello Urban Industrial"
    - option "Modello Shabby/Classic Chic"
  - text: Note o Messaggio
  - textbox "Dicci quando preferisci venire a trovarci o quali sono le tue richieste..."
  - button "Invia Richiesta"
- contentinfo:
  - paragraph: © 2026 Ciesse Home. Tutti i diritti riservati.
  - paragraph: Svendita cucine da esposizione soggetta a disponibilità limitata.
- alert
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import cucine from '../../cucine.json';
  3   | 
  4   | test.describe('Tier 1 - Feature Coverage', () => {
  5   | 
  6   |   test.beforeEach(async ({ page }) => {
  7   |     // Navigate to base URL before each test.
  8   |     await page.goto('/');
  9   |   });
  10  | 
  11  |   // F1: Premium Design & Style
  12  |   test('F1-1: Check page loads with a custom styled hero section', async ({ page }) => {
  13  |     const hero = page.locator('[data-testid="hero"]');
> 14  |     await expect(hero).toBeVisible();
      |                        ^ Error: expect(locator).toBeVisible() failed
  15  |   });
  16  | 
  17  |   test('F1-2: Check premium typography styles', async ({ page }) => {
  18  |     const heading = page.locator('[data-testid="hero"] h1');
  19  |     await expect(heading).toBeVisible();
  20  |     const classList = await heading.getAttribute('class');
  21  |     // Verify that premium serif/sans classes are defined on the primary heading
  22  |     expect(classList).toMatch(/(font-serif|font-sans|serif|sans|playfair|cinzel|inter)/i);
  23  |   });
  24  | 
  25  |   test('F1-3: Check responsive classes on grids', async ({ page }) => {
  26  |     const catalog = page.locator('[data-testid="kitchen-catalog"]');
  27  |     await expect(catalog).toBeVisible();
  28  |     const classList = await catalog.getAttribute('class');
  29  |     // Check that standard tailwind responsive grid-cols are declared
  30  |     expect(classList).toMatch(/(grid-cols-|md:grid-cols-|lg:grid-cols-)/);
  31  |   });
  32  | 
  33  |   test('F1-4: Check that animated elements exist', async ({ page }) => {
  34  |     // Check that animation trigger classes or inline transform/opacity properties exist
  35  |     const animated = page.locator('[class*="transition"], [class*="duration-"], [class*="animate-"], [style*="opacity"], [style*="transform"]').first();
  36  |     await expect(animated).toBeVisible();
  37  |   });
  38  | 
  39  |   test('F1-5: Check mobile viewport horizontal overflow', async ({ page }) => {
  40  |     await page.setViewportSize({ width: 375, height: 667 });
  41  |     await page.goto('/'); // Reload for viewport configuration
  42  |     const hasOverflow = await page.evaluate(() => {
  43  |       return document.documentElement.scrollWidth > window.innerWidth;
  44  |     });
  45  |     expect(hasOverflow).toBe(false);
  46  |   });
  47  | 
  48  |   // F2: "Rinnovo Showroom" Concept & Copy
  49  |   test('F2-6: Verify hero heading contains "Rinnovo Showroom"', async ({ page }) => {
  50  |     const headingText = await page.locator('[data-testid="hero"] h1').innerText();
  51  |     expect(headingText).toContain('Rinnovo Showroom');
  52  |   });
  53  | 
  54  |   test('F2-7: Verify Italian copy details 50% clearance event', async ({ page }) => {
  55  |     const bodyText = await page.textContent('body');
  56  |     expect(bodyText).toMatch(/(50%|sconto 50%|metà prezzo|metà prezzo)/i);
  57  |   });
  58  | 
  59  |   test('F2-8: Verify absence of distress word "Chiusura"', async ({ page }) => {
  60  |     const bodyText = await page.textContent('body');
  61  |     expect(bodyText).not.toContain('Chiusura');
  62  |     expect(bodyText).not.toContain('chiusura');
  63  |   });
  64  | 
  65  |   test('F2-9: Verify absence of distress word "Crisi"', async ({ page }) => {
  66  |     const bodyText = await page.textContent('body');
  67  |     expect(bodyText).not.toContain('Crisi');
  68  |     expect(bodyText).not.toContain('crisi');
  69  |   });
  70  | 
  71  |   test('F2-10: Verify absence of other distress words', async ({ page }) => {
  72  |     const bodyText = await page.textContent('body');
  73  |     const distressWords = ['Fallimento', 'fallimento', 'Liquidazione', 'liquidazione', 'Sgombero', 'sgombero', 'Svendo', 'svendo'];
  74  |     for (const word of distressWords) {
  75  |       expect(bodyText).not.toContain(word);
  76  |     }
  77  |   });
  78  | 
  79  |   // F3: Dynamic Kitchen Catalog
  80  |   test('F3-11: Verify catalog grid element is rendered', async ({ page }) => {
  81  |     const catalog = page.locator('[data-testid="kitchen-catalog"]');
  82  |     await expect(catalog).toBeVisible();
  83  |   });
  84  | 
  85  |   test('F3-12: Verify exactly 16 kitchen cards are rendered', async ({ page }) => {
  86  |     const cards = page.locator('[data-testid="kitchen-card"]');
  87  |     await expect(cards).toHaveCount(16);
  88  |   });
  89  | 
  90  |   test('F3-13: Verify each card has price = 50% of original price in cucine.json', async ({ page }) => {
  91  |     const cards = page.locator('[data-testid="kitchen-card"]');
  92  |     const count = await cards.count();
  93  |     for (let i = 0; i < count; i++) {
  94  |       const card = cards.nth(i);
  95  |       const nameText = (await card.locator('[data-testid="kitchen-name"]').innerText()).trim();
  96  |       const item = cucine.find(c => c.name.toLowerCase() === nameText.toLowerCase());
  97  |       expect(item).toBeDefined();
  98  |       if (item) {
  99  |         const originalPriceVal = parseFloat(item.originalPrice);
  100 |         const expectedPromoPrice = originalPriceVal * 0.5;
  101 |         const priceText = await card.locator('[data-testid="kitchen-price"]').innerText();
  102 |         const cleanPrice = parseFloat(priceText.replace(/[^\d]/g, ''));
  103 |         expect(cleanPrice).toBe(expectedPromoPrice);
  104 |       }
  105 |     }
  106 |   });
  107 | 
  108 |   test('F3-14: Verify kitchen name matches cucine.json', async ({ page }) => {
  109 |     const cards = page.locator('[data-testid="kitchen-card"]');
  110 |     const count = await cards.count();
  111 |     for (let i = 0; i < count; i++) {
  112 |       const card = cards.nth(i);
  113 |       const nameText = (await card.locator('[data-testid="kitchen-name"]').innerText()).trim();
  114 |       const matches = cucine.some(c => c.name.toLowerCase() === nameText.toLowerCase());
```