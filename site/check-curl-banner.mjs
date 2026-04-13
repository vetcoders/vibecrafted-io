import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, hasTouch: false });
const page = await ctx.newPage();

const logs = [];
page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
page.on('pageerror', err => logs.push(`[pageerror] ${err.message}`));

await page.goto('http://localhost:4325/', { waitUntil: 'networkidle' });

// Check DOM presence
const domCheck = await page.evaluate(() => {
  const getZone = document.querySelector('.nav-get-zone');
  const curlBanner = document.querySelector('.curl-banner');
  const footer = document.querySelector('.footer-shell');
  return {
    getZone: !!getZone,
    getZoneHTML: getZone ? getZone.outerHTML.slice(0, 300) : null,
    curlBanner: !!curlBanner,
    curlBannerClasses: curlBanner ? curlBanner.className : null,
    curlBannerBound: curlBanner ? curlBanner.dataset.hoverBound : null,
    footer: !!footer,
    footerBound: footer ? footer.dataset.drawerBound : null,
  };
});
console.log('DOM check:', JSON.stringify(domCheck, null, 2));

// Initial state of curl banner
const initialState = await page.evaluate(() => {
  const el = document.querySelector('.curl-banner');
  if (!el) return null;
  const cs = window.getComputedStyle(el);
  return {
    classes: el.className,
    transform: cs.transform,
    opacity: cs.opacity,
    pointerEvents: cs.pointerEvents,
    display: cs.display,
    position: cs.position,
  };
});
console.log('\nInitial curl-banner state:', JSON.stringify(initialState, null, 2));

// Hover over nav-get-zone
const getZoneBox = await page.locator('.nav-get-zone').boundingBox();
console.log('\nnav-get-zone box:', getZoneBox);

if (getZoneBox) {
  await page.mouse.move(getZoneBox.x + getZoneBox.width/2, getZoneBox.y + getZoneBox.height/2);
  await page.waitForTimeout(300);

  const afterHover = await page.evaluate(() => {
    const el = document.querySelector('.curl-banner');
    if (!el) return null;
    const cs = window.getComputedStyle(el);
    return {
      classes: el.className,
      transform: cs.transform,
      opacity: cs.opacity,
    };
  });
  console.log('\nAfter hover curl-banner state:', JSON.stringify(afterHover, null, 2));
}

// Footer check
const footerInitial = await page.evaluate(() => {
  const el = document.querySelector('.footer-shell');
  if (!el) return null;
  const cs = window.getComputedStyle(el);
  return {
    classes: el.className,
    drawerOpen: el.getAttribute('data-drawer-open'),
    transform: cs.transform,
    bottom: cs.bottom,
    position: cs.position,
  };
});
console.log('\nInitial footer state:', JSON.stringify(footerInitial, null, 2));

// Scroll to bottom and hover footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(300);

const footerBox = await page.locator('.footer-shell').boundingBox();
console.log('\nfooter box:', footerBox);

if (footerBox) {
  await page.mouse.move(footerBox.x + footerBox.width/2, footerBox.y + footerBox.height/2);
  await page.waitForTimeout(300);

  const footerHovered = await page.evaluate(() => {
    const el = document.querySelector('.footer-shell');
    if (!el) return null;
    const cs = window.getComputedStyle(el);
    return {
      drawerOpen: el.getAttribute('data-drawer-open'),
      transform: cs.transform,
    };
  });
  console.log('\nFooter after hover:', JSON.stringify(footerHovered, null, 2));
}

console.log('\n=== Console logs ===');
logs.forEach(l => console.log(l));

await page.screenshot({ path: '/tmp/curl-banner-hover.png', fullPage: false });
console.log('\nScreenshot saved: /tmp/curl-banner-hover.png');

await browser.close();
