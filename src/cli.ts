#!/usr/bin/env node
import { program } from 'commander';
import { loadConfig } from './config';
import { generateStructure } from './generator';
import { loadEnv } from './env';

program
  .name('folder-gen')
  .description('CLI for generating folder structures')
  .version('1.0.0');

program.command('generate')
  .description('Generate folder structure')
  .requiredOption('-c, --config <path>', 'Configuration file path')
  .option('-o, --output <dir>', 'Output directory', process.cwd())
  .option('--dry-run', 'Simulate generation without writing files')
  .option('--verbose', 'Show detailed logs')
  .action(async (options) => {
    try {
      const config = await loadConfig(options.config);
      const envVars = await loadEnv();
      const variables = { ...envVars, ...config.variables };

      await generateStructure(
        config,
        options.output,
        variables,
        options.dryRun
      );

      console.log('Generation completed successfully!');
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();