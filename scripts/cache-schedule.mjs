// Snapshot the FOSS4G NA 2026 Whova schedule, filtered to one track, into a
// self-contained HTML file the deck can show offline (public/schedule-cloud-native.html).
// Whova's filter lives only in page state (not the URL), so we apply it in a
// headless browser, strip scripts, and inline stylesheets, fonts and images.
//
//   pnpm cache-schedule
import { chromium } from 'playwright-chromium'
import { writeFile } from 'node:fs/promises'

const EVENT_URL = 'https://whova.com/embedded/event/SeMXxQA-us4wvt-VYSingXuaKZ4WYl0LOQbII3JnKeI%3D/'
const TRACK = /^Cloud-Native Geo & Data In/
const OUT = new URL('../public/schedule-cloud-native.html', import.meta.url)

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } })
await page.goto(EVENT_URL, { waitUntil: 'load' })
await page.waitForTimeout(5000)

// Untick every track via the "Filter by track" row's checkbox, then tick ours.
const header = await page.getByText('Filter by track', { exact: true }).boundingBox()
const boxes = page.locator('input[type=checkbox]')
let selectAll
for (let i = 0; i < await boxes.count(); i++) {
  const b = await boxes.nth(i).boundingBox()
  if (b && Math.abs(b.y - header.y) < 15) { selectAll = boxes.nth(i); break }
}
if (!selectAll) throw new Error('Could not find the "Filter by track" select-all checkbox')
await selectAll.click({ force: true })
await page.waitForTimeout(800)
await page.getByText(TRACK).first().click()
await page.waitForTimeout(2000)

// Serialize the filtered DOM: persist checkbox state, drop scripts, absolutize URLs.
const { html, sheets } = await page.evaluate(() => {
  document.querySelectorAll('input[type=checkbox]').forEach(el => el.toggleAttribute('checked', el.checked))
  document.querySelectorAll('.agenda-header').forEach(el => { el.textContent = 'FOSS4G NA 2026 Event Schedule' })
  document.querySelectorAll('script, noscript, iframe').forEach(el => el.remove())
  document.querySelectorAll('[src]').forEach(el => el.setAttribute('src', el.src))
  document.querySelectorAll('a[href]').forEach(el => { el.setAttribute('href', el.href); el.setAttribute('target', '_blank') })
  const sheets = [...document.querySelectorAll('link[rel=stylesheet]')].map(el => el.href)
  document.querySelectorAll('link').forEach(el => el.remove())
  const inline = [...document.querySelectorAll('style')].map(el => el.textContent)
  document.querySelectorAll('style').forEach(el => el.remove())
  return { html: document.documentElement.outerHTML, sheets: [...sheets, ...inline.map(t => ({ text: t, base: location.href }))] }
})

async function dataUri(url) {
  const res = await fetch(url)
  if (!res.ok) return url
  const type = res.headers.get('content-type')?.split(';')[0] || 'application/octet-stream'
  return `data:${type};base64,${Buffer.from(await res.arrayBuffer()).toString('base64')}`
}

async function inlineUrls(css, base) {
  const refs = [...new Set([...css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)].map(m => m[1]))]
    .filter(u => !u.startsWith('data:'))
  for (const ref of refs) {
    const abs = new URL(ref, base).href
    css = css.split(ref).join(await dataUri(abs))
  }
  return css
}

let css = ''
for (const s of sheets) {
  if (typeof s === 'string') {
    const res = await fetch(s)
    if (res.ok) css += await inlineUrls(await res.text(), s) + '\n'
  } else {
    css += await inlineUrls(s.text, s.base) + '\n'
  }
}

let out = html.replace('</head>', `<style>${css}</style></head>`)
for (const src of new Set([...out.matchAll(/<img[^>]+src="(https?:[^"]+)"/g)].map(m => m[1])))
  out = out.split(`src="${src}"`).join(`src="${await dataUri(src)}"`)

const stamp = new Date().toISOString().slice(0, 10)
await writeFile(OUT, `<!doctype html>\n<!-- Cached ${stamp} from ${EVENT_URL} (track filter applied) by scripts/cache-schedule.mjs -->\n${out}\n`)
console.log(`wrote ${OUT.pathname} (${Math.round(out.length / 1024)} KB)`)
await browser.close()
