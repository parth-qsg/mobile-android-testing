import * as dotenv from 'dotenv';
import * as path from 'path';
import { wdioHooks } from './src/hooks/wdio.hooks';
import { getCapabilities } from './src/utils/capabilities';
import { filterFeaturesByTag, loadTagFromCli } from './tagFilter';

// Resolve the tag passed to `wdio:test:byTag` before anything reads process.env.TAGS
loadTagFromCli();

// Load the environment file matching ENVIRONMENT (e.g. qa.env)
dotenv.config({
  path: path.resolve(process.cwd(), `${process.env.ENVIRONMENT || 'qa'}.env`),
});

export const config: WebdriverIO.Config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  runner: 'local',
  tsConfigPath: './tsconfig.json',

  //
  // ==================
  // Specify Test Files
  // ==================
  specs: filterFeaturesByTag(process.env.TAGS || '@mobile'),
  exclude: [],

  //
  // ============
  // Capabilities
  // ============
  maxInstances: 1,
  capabilities: [getCapabilities()],

  //
  // ===================
  // Test Configurations
  // ===================
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 300000,
  connectionRetryCount: 3,

  //
  // ========
  // Services
  // ========
  port: 4723,
  services: [
    [
      'appium',
      {
        args: {
          address: '0.0.0.0',
          port: 4723,
          relaxedSecurity: true,
        },
        command: 'appium',
        appiumStartTimeout: 50000,
        logPath: './logs',
      },
    ],
  ],

  //
  // =========
  // Framework
  // =========
  framework: 'cucumber',
  reporters: ['spec'],

  cucumberOpts: {
    require: [
      './src/stepDefinitions/**/*.ts',
      './src/utils/support/world.ts',
      './src/hooks/cucumber.hooks.ts',
    ],
    retry: 0,
    backtrace: true,
    requireModule: [],
    dryRun: false,
    failFast: false,
    name: [],
    snippets: true,
    source: true,
    strict: false,
    tags: process.env.TAGS || '@mobile',
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },

  ...wdioHooks,
};
