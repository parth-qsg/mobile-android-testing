import { globalSetup } from '../utils/setup/globalSetup';

/**
 * WDIO lifecycle hooks. Spread into the config so they live alongside the rest
 * of the framework wiring rather than inline in wdio.conf.
 */
export const wdioHooks = {
  /**
   * Take a screenshot after any failed step so it lands in the report.
   */
  afterStep: async function (step, scenario, result) {
    if (!result.passed) {
      await browser.takeScreenshot();
    }
  },

  /**
   * Runs once before any session starts.
   */
  onPrepare: async function () {
    process.env.TEST_START_TIME = Date.now().toString();
    console.log('Running global setup tasks');
    await globalSetup();
    console.log('Global setup tasks completed');
  },
};
