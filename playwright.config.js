import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 240000,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: 'http://localhost:5173/cidadao-digital-seguro/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev -- --host localhost --port 5173',
    url: 'http://localhost:5173/cidadao-digital-seguro/',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
