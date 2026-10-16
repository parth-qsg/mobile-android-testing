import { After } from '@wdio/cucumber-framework';
import { IMobileWorld } from '../utils/support/world.interface';

/**
 * After each scenario: run any cleanup tasks the scenario registered on the
 * World (e.g. test data it created), so state doesn't leak between scenarios.
 */
After(async function (this: IMobileWorld) {
  await Promise.allSettled(this.cleanupTasks.map((task) => task()));
  this.cleanupTasks.length = 0;
});
