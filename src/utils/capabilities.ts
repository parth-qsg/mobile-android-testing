import fs from 'fs';
import os from 'os';
import path from 'path';

/**
 * Finds the app build to install on Android: the first `.apk` under `apps/`.
 * Drop your build there (it's gitignored) — no env var needed.
 */
function resolveAndroidApp(): string | undefined {
  const appsDir = path.resolve(process.cwd(), 'apps');
  if (!fs.existsSync(appsDir)) return undefined;
  const apk = fs.readdirSync(appsDir).find((file) => file.endsWith('.apk'));
  return apk ? path.join(appsDir, apk) : undefined;
}

/**
 * Builds the Appium capabilities for the current run straight from env vars.
 * Android installs the `.apk` found in `apps/`; iOS targets the installed app
 * by its bundle id.
 */
export function getCapabilities(): WebdriverIO.Capabilities {
  const platform = (process.env.PLATFORM || 'android').toLowerCase();

  if (platform === 'ios') {
    return {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:deviceName': process.env.DEVICE_NAME,
      'appium:platformVersion': process.env.PLATFORM_VERSION,
      'appium:bundleId': process.env.IOS_BUNDLE_ID,
      'appium:newCommandTimeout': 300,
    };
  }

  return {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.DEVICE_NAME || 'Android Emulator',
    'appium:app': resolveAndroidApp(),
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 300,
    // Resolve a matching Chromedriver for webview-context switches. Autodownload
    // fetches one on demand; a pre-seeded dir (see README) is used as a fallback
    // for the device's installed Chrome/WebView version.
    'appium:chromedriverAutodownload': true,
    'appium:chromedriverExecutableDir': path.join(os.homedir(), '.appium', 'chromedrivers'),
  } as WebdriverIO.Capabilities;
}
