/**
 * Shape of the shared Cucumber World. Scenarios read and write state here so
 * step definitions in different files can share context within a scenario.
 */
export interface IMobileWorld {
  // Auth
  email?: string;
  password?: string;
  authToken?: string;
  userType?: string;

  // Arbitrary scenario data
  temp: Record<string, any>;
  testData: Record<string, any>;

  // Methods
  setCredentials(email: string, password: string, authToken?: string): void;
  store(key: string, value: any): void;
  get<T = any>(key: string): T | undefined;

  // Cleanup tasks registered by a scenario, run in the After hook
  cleanupTasks: Array<() => Promise<void>>;
}
