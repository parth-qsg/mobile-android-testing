/**
 * Global setup run once in the WDIO `onPrepare` hook, before any session
 * starts. Add suite-wide preparation here (seed data, warm caches, validate
 * env vars, etc.).
 */
export async function globalSetup(): Promise<void> {
  const required = ['PLATFORM'];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
        'Populate them in your <ENVIRONMENT>.env file.',
    );
  }
}
