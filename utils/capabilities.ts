export function getCapabilities(): WebdriverIO.Capabilities {
  return {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.DEVICE_NAME || 'Android Emulator',
    'appium:appPackage': process.env.APP_PACKAGE,
    'appium:appActivity': process.env.APP_ACTIVITY,
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 300,
    // The emulator host and its app are PERSISTENT across every generation/validation attempt —
    // without this, a fresh WDIO session just resumes the app on whatever screen a PREVIOUS
    // attempt/run left it on. forceAppLaunch (UiAutomator2-specific) stops and restarts the app
    // fresh at the start of every session, landing reliably on appActivity every time.
    'appium:forceAppLaunch': true,
  } as WebdriverIO.Capabilities;
}
