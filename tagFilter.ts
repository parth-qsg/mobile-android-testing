import { globSync } from 'glob';
import fs from 'fs';
import parseTagExpression from 'cucumber-tag-expressions';

/**
 * Returns only the feature files whose tags satisfy the given tag expression,
 * so a run scoped to a tag doesn't load the whole suite.
 */
export function filterFeaturesByTag(tagExpression: string): string[] {
  const expr = parseTagExpression(tagExpression);

  const featureFiles = globSync('./src/features/**/*.feature');

  return featureFiles.filter((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const tags = content.match(/@[A-Za-z0-9-_]+/g) || [];
    return expr.evaluate(tags);
  });
}

/**
 * When invoked through `wdio:test:byTag`, reads the trailing CLI argument as the
 * tag and stores it in `process.env.TAGS` for the config to consume.
 */
export function loadTagFromCli(): void {
  const args = process.argv;
  const currentScript = process.env.npm_lifecycle_event || '';
  const tag = args[args.length - 1];

  if (currentScript.includes('wdio:test:byTag')) {
    if (!tag || !tag.startsWith('@')) {
      throw new Error(`
Missing tag name!

Usage:
  yarn wdio:test:byTag "@tagName"

Example:
  yarn wdio:test:byTag "@smoke"
`);
    }
    process.env.TAGS = tag;
  }
}
