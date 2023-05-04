import { chromium, ChromiumBrowser, BrowserContext, Page } from '@playwright/test'
import * as mocha from 'mocha'

let browser: ChromiumBrowser

// eslint-disable-next-line mocha/no-exports
export const isInDebugMode = (process.env.PUPPETEER_DEBUG || '') === '1'

// eslint-disable-next-line mocha/handle-done-callback, mocha/no-top-level-hooks
before(async function (this: mocha.Context) {
  if (isInDebugMode && this.currentTest) {
    this.currentTest.timeout(0)
  }
  browser = await launchBrowser()
})

// eslint-disable-next-line mocha/no-top-level-hooks
after(async () => {
  await browser.close()
})

async function launchBrowser() {
  return chromium.launch({
    headless: !isInDebugMode,
    args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox'],
  })
}

// eslint-disable-next-line mocha/no-exports
export async function newBrowserContext(): Promise<BrowserContext> {
  return browser.newContext()
}

// eslint-disable-next-line mocha/no-exports
export async function newPage(context: BrowserContext): Promise<Page> {
  const result = await context.newPage()
  if (isInDebugMode) {
    result.on('console', (msg) => {
      // eslint-disable-next-line no-console
      console.log(`${result.url()}: ${msg.text()}`)
    })
  }
  await result.setViewportSize({ width: 1280, height: 1024 })
  return result
}

// eslint-disable-next-line mocha/no-exports
export async function newBrowserContextAndPage(): Promise<[BrowserContext, Page]> {
  const context = await newBrowserContext()
  const page = await newPage(context)
  return [context, page]
}
