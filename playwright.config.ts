import { defineConfig } from '@playwright/test'

export default defineConfig({
  reporter: [['list'], ['html', { open: 'never' }], ['junit', { outputFile: 'playwright-report.xml' }]],
  webServer: {
    command: 'npm run watch',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  retries: 1,
  use: {
    baseURL: 'http://localhost:8080',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'on-first-retry'
  },
  outputDir: './playwright-results',
  testDir: './test',
  workers: 1
})
