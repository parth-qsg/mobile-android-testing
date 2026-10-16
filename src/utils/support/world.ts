import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { IMobileWorld } from './world.interface';

/**
 * Concrete Cucumber World implementation shared across all step definitions.
 * A fresh instance is created per scenario.
 */
class MobileWorld extends World implements IMobileWorld {
  // Auth
  email?: string;
  password?: string;
  authToken?: string;
  userType?: string;

  // Arbitrary scenario data
  temp: Record<string, any> = {};
  testData: Record<string, any> = {};

  // Cleanup tasks registered by a scenario, run in the After hook
  cleanupTasks: Array<() => Promise<void>> = [];

  constructor(options: IWorldOptions) {
    super(options);
  }

  setCredentials(email: string, password: string, authToken?: string): void {
    this.email = email;
    this.password = password;
    this.authToken = authToken;
  }

  store(key: string, value: any): void {
    this.testData[key] = value;
  }

  get<T = any>(key: string): T | undefined {
    return this.testData[key] as T | undefined;
  }
}

setWorldConstructor(MobileWorld);

export { MobileWorld };
