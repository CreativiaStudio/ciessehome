# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier1-features.spec.ts >> Tier 1 - Feature Coverage >> F3-12: Verify exactly 16 kitchen cards are rendered
- Location: tests\tier1-features.spec.ts:85:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="kitchen-card"]')
Expected: 16
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('[data-testid="kitchen-card"]')
    13 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - generic [ref=e6]: CIESSE HOME
          - generic [ref=e7]: OUTLET SHOWROOM
        - navigation [ref=e8]:
          - link "Cucine in Svendita" [ref=e9] [cursor=pointer]:
            - /url: "#catalog"
          - link "L'Esposizione" [ref=e10] [cursor=pointer]:
            - /url: "#about"
          - link "Prenota Visita" [ref=e11] [cursor=pointer]:
            - /url: "#contact"
        - link "Richiedi Info" [ref=e13] [cursor=pointer]:
          - /url: "#contact"
    - main [ref=e14]:
      - generic [ref=e17]:
        - generic [ref=e18]:
          - generic [ref=e19]:
            - img [ref=e20]
            - text: Sconti Straordinari Fino al 50%
          - 'heading "Rinnovo Showroom: Cucine Premium in Svendita" [level=1] [ref=e22]':
            - text: "Rinnovo Showroom:"
            - generic [ref=e23]: Cucine Premium in Svendita
          - paragraph [ref=e24]: Per rinnovo locali, svendiamo 16 splendide cucine di design in esposizione. Finiture di lusso, elettrodomestici di marca inclusi, pronte per essere installate a casa tua a prezzi mai visti.
          - link "Blocca la tua offerta" [ref=e26] [cursor=pointer]:
            - /url: "#contact"
        - generic [ref=e28]:
          - generic [ref=e32]: Showroom Renewal 2026
          - generic [ref=e33]:
            - generic [ref=e34]:
              - generic [ref=e35]: "16"
              - text: Modelli Disponibili
            - generic [ref=e37]:
              - generic [ref=e38]: "-50%"
              - text: Prezzo di Listino
      - generic [ref=e40]:
        - generic [ref=e41]:
          - heading "Perché Scegliere una Cucina da Esposizione Ciesse Home" [level=2] [ref=e42]
          - paragraph [ref=e43]: Tutte le cucine in vendita provengono direttamente dallo showroom Ciesse Home, garantendo massima qualità e un'attenzione maniacale al dettaglio.
        - generic [ref=e44]:
          - generic [ref=e45]:
            - img [ref=e47]
            - heading "Qualità Professionale" [level=3] [ref=e49]
            - paragraph [ref=e50]: Design contemporaneo curato nei dettagli, materiali di prima scelta e finiture premium ideate per durare nel tempo.
          - generic [ref=e51]:
            - img [ref=e53]
            - heading "Elettrodomestici Top Gamma" [level=3] [ref=e55]
            - paragraph [ref=e56]: Ogni cucina include elettrodomestici di marchi prestigiosi (piani cottura, forni, frigoriferi, lavastoviglie) già integrati.
          - generic [ref=e57]:
            - img [ref=e59]
            - heading "Adattabilità Spazi" [level=3] [ref=e64]
            - paragraph [ref=e65]: I nostri consulenti sono a tua disposizione per adattare il layout della cucina showroom alle misure reali della tua casa.
      - generic [ref=e68]:
        - generic [ref=e69]:
          - heading "Richiedi Informazioni o Prenota una Visita" [level=3] [ref=e70]
          - paragraph [ref=e71]: Compila il modulo per fissare un appuntamento e ricevere il catalogo prezzi completo.
        - generic [ref=e73]:
          - generic [ref=e74]:
            - generic [ref=e75]:
              - img [ref=e76]
              - text: Nome Completo
            - textbox "Es. Mario Rossi" [ref=e79]
          - generic [ref=e80]:
            - generic [ref=e81]:
              - generic [ref=e82]:
                - img [ref=e83]
                - text: Email
              - textbox "mario.rossi@example.com" [ref=e86]
            - generic [ref=e87]:
              - generic [ref=e88]:
                - img [ref=e89]
                - text: Telefono
              - textbox "333 1234567" [ref=e91]
          - generic [ref=e92]:
            - generic [ref=e93]:
              - img [ref=e94]
              - text: Modello di Interesse (Opzionale)
            - combobox [ref=e96]:
              - option "Seleziona un modello o chiedi informazioni generali" [selected]
              - option "Modello Moderno in Rovere"
              - option "Modello Urban Industrial"
              - option "Modello Shabby/Classic Chic"
          - generic [ref=e97]:
            - generic [ref=e98]: Note o Messaggio
            - textbox "Dicci quando preferisci venire a trovarci o quali sono le tue richieste..." [ref=e99]
          - button "Invia Richiesta" [ref=e100] [cursor=pointer]
    - contentinfo [ref=e101]:
      - generic [ref=e102]:
        - paragraph [ref=e103]: © 2026 Ciesse Home. Tutti i diritti riservati.
        - paragraph [ref=e104]: Svendita cucine da esposizione soggetta a disponibilità limitata.
  - button "Open Next.js Dev Tools" [ref=e110] [cursor=pointer]:
    - img [ref=e111]
  - alert [ref=e114]
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
  14  |     await expect(hero).toBeVisible();
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
> 87  |     await expect(cards).toHaveCount(16);
      |                         ^ Error: expect(locator).toHaveCount(expected) failed
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
  115 |       expect(matches).toBe(true);
  116 |     }
  117 |   });
  118 | 
  119 |   test('F3-15: Verify kitchen features are rendered as HTML text', async ({ page }) => {
  120 |     const cards = page.locator('[data-testid="kitchen-card"]');
  121 |     const count = await cards.count();
  122 |     for (let i = 0; i < count; i++) {
  123 |       const card = cards.nth(i);
  124 |       const featuresList = card.locator('[data-testid="kitchen-features"]');
  125 |       await expect(featuresList).toBeVisible();
  126 |       const html = await featuresList.innerHTML();
  127 |       expect(html.length).toBeGreaterThan(0);
  128 |     }
  129 |   });
  130 | 
  131 |   // F4: Video Player
  132 |   test('F4-16: Verify video player container in each card', async ({ page }) => {
  133 |     const cards = page.locator('[data-testid="kitchen-card"]');
  134 |     const count = await cards.count();
  135 |     for (let i = 0; i < count; i++) {
  136 |       const card = cards.nth(i);
  137 |       const player = card.locator('[data-testid="video-player"]');
  138 |       await expect(player).toBeVisible();
  139 |     }
  140 |   });
  141 | 
  142 |   test('F4-17: Verify video player is paused/non-autoplay by default', async ({ page }) => {
  143 |     const video = page.locator('[data-testid="video-player"] video').first();
  144 |     const isPaused = await video.evaluate((el: HTMLVideoElement) => el.paused);
  145 |     expect(isPaused).toBe(true);
  146 |   });
  147 | 
  148 |   test('F4-18: Verify Play button plays video', async ({ page }) => {
  149 |     const firstCard = page.locator('[data-testid="kitchen-card"]').first();
  150 |     const playBtn = firstCard.locator('[data-testid="play-video-btn"]');
  151 |     const video = firstCard.locator('[data-testid="video-player"] video');
  152 |     await playBtn.click();
  153 |     const isPaused = await video.evaluate((el: HTMLVideoElement) => el.paused);
  154 |     expect(isPaused).toBe(false);
  155 |   });
  156 | 
  157 |   test('F4-19: Verify Pause button pauses video', async ({ page }) => {
  158 |     const firstCard = page.locator('[data-testid="kitchen-card"]').first();
  159 |     const playBtn = firstCard.locator('[data-testid="play-video-btn"]');
  160 |     const pauseBtn = firstCard.locator('[data-testid="pause-video-btn"]');
  161 |     const video = firstCard.locator('[data-testid="video-player"] video');
  162 |     await playBtn.click();
  163 |     await pauseBtn.click();
  164 |     const isPaused = await video.evaluate((el: HTMLVideoElement) => el.paused);
  165 |     expect(isPaused).toBe(true);
  166 |   });
  167 | 
  168 |   test('F4-20: Verify video controls have accessibility tags', async ({ page }) => {
  169 |     const firstCard = page.locator('[data-testid="kitchen-card"]').first();
  170 |     const playBtn = firstCard.locator('[data-testid="play-video-btn"]');
  171 |     const pauseBtn = firstCard.locator('[data-testid="pause-video-btn"]');
  172 |     const playAria = await playBtn.getAttribute('aria-label');
  173 |     const pauseAria = await pauseBtn.getAttribute('aria-label');
  174 |     expect(playAria).toBeTruthy();
  175 |     expect(pauseAria).toBeTruthy();
  176 |   });
  177 | 
  178 |   // F5: Contact Form
  179 |   test('F5-21: Verify contact form is present', async ({ page }) => {
  180 |     const form = page.locator('[data-testid="contact-form"]');
  181 |     await expect(form).toBeVisible();
  182 |   });
  183 | 
  184 |   test('F5-22: Verify form contains inputs: name, email, phone, kitchen, notes', async ({ page }) => {
  185 |     const form = page.locator('[data-testid="contact-form"]');
  186 |     await expect(form.locator('input[name="name"], [data-testid="contact-name"]')).toBeVisible();
  187 |     await expect(form.locator('input[name="email"], [data-testid="contact-email"]')).toBeVisible();
```