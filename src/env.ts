import { config } from 'dotenv';
import fs from 'fs/promises';

export async function loadEnv() {
  try {
    const envContent = await fs.readFile('.env', 'utf-8');
    return config({ parse: envContent }).parsed || {};
  } catch {
    return {};
  }
}