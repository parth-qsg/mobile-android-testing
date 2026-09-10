import fs from 'node:fs';
import path from 'node:path';
import { getCapabilities } from './utils/capabilities';

export const config: WebdriverIO.Config = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',

  // Connects to the persistent, already-running Appium server (see infra/android-emulator-host
  // in worker-manager) — NEVER add `services: ['appium']` here, which would try to spawn a
  // local Appium server/emulator that does not exist in this execution environment.
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: Number(process.env.APPIUM_PORT || 4723),
  path: '/',

  specs: [`${process.env.TEST_DESTINATION || 'tests'}/**/*.e2e.ts`],
  exclude: [],

  maxInstances: 1,
  capabilities: [getCapabilities()],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 300000,
  connectionRetryCount: 3,

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  // Screen recording — Appium/UiAutomator2's built-in recorder. Unlike Playwright, WebdriverIO
  // does NOT record video automatically; without these hooks every run produces zero video,
  // pass or fail. Best-effort only: a recording failure must never fail the actual test.
  beforeTest: async function () {
    try {
      await withTimeout(
        browser.startRecordingScreen({ videoSize: '480x854', bitRate: 500000, timeLimit: 180 }),
        15000,
        'startRecordingScreen'
      );
    } catch (err) {
      console.warn('[wdio.conf] startRecordingScreen failed (continuing without video):', err);
    }
  },
  afterTest: async function (test) {
    try {
      const video = await withTimeout(browser.stopRecordingScreen(), 20000, 'stopRecordingScreen');
      const outputDir = process.env.WDIO_VIDEO_DIR || './test-results/videos';
      fs.mkdirSync(outputDir, { recursive: true });
      const fileName = `${test.parent}-${test.title}`.replace(/[^a-z0-9-_]+/gi, '_');
      fs.writeFileSync(path.join(outputDir, `${fileName}.mp4`), Buffer.from(video, 'base64'));
    } catch (err) {
      console.warn('[wdio.conf] stopRecordingScreen failed:', err);
    }
  },
};

async function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer!);
  }
}
