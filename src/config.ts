import fs from 'fs/promises';
import yaml from 'js-yaml';
import { ConfigSchema } from './types';

export async function loadConfig(filePath: string) {
  const content = await fs.readFile(filePath, 'utf-8');
  const rawConfig = filePath.endsWith('.yaml') || filePath.endsWith('.yml')
    ? yaml.load(content)
    : JSON.parse(content);

  return ConfigSchema.parse(rawConfig);
}