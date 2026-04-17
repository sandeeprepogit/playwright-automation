// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  reporter: 'html',

  use: {
   browserName : 'chromium',
   headless : false

  },

  
});

module.exports = config