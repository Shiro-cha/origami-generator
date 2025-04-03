import path from 'path';
import fs from 'fs/promises';
import { Config } from './types';

export async function generateStructure(
  config: Config,
  outputDir: string,
  variables: Record<string, string> = {},
  dryRun = false
) {
  const root = path.join(outputDir, config.root || '');
  await processNode(root, config.structure, variables, dryRun);
}

async function processNode(
  currentPath: string,
  node: any,
  variables: Record<string, string>,
  dryRun: boolean
) {
  for (const [name, content] of Object.entries(node)) {
    const resolvedName = replaceVariables(name, variables);
    const fullPath = path.join(currentPath, resolvedName);

    if (typeof content === 'object') {
      await handleDirectory(fullPath, content, variables, dryRun);
    } else {
      await handleFile(fullPath, content, variables, dryRun);
    }
  }
}

async function handleDirectory(path: string, content: any, variables: Record<string, string>, dryRun: boolean) {
  if (!dryRun) await fs.mkdir(path, { recursive: true });
  console.log(`Created directory: ${path}`);
  await processNode(path, content, variables, dryRun);
}

async function handleFile(path: string, content: any, variables: Record<string, string>, dryRun: boolean) {
  const resolvedContent = replaceVariables(content.toString(), variables);
  if (!dryRun) await fs.writeFile(path, resolvedContent);
  console.log(`Created file: ${path}`);
}

function replaceVariables(str: string, variables: Record<string, string>) {
  return str.replace(/{{(\w+)}}/g, (_, key) => variables[key] || '');
}