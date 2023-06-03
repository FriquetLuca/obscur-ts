#!/usr/bin/env node

import chalk from "chalk";
import { clear } from "console";
import path from "path";
import { program } from "commander";
import fs from "fs";

clear();

const packageJSONPath = path.join(__dirname, "../package.json");
const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath).toString()) as {
  name: string;
  description: string;
  version: string;
};

program
  .name(packageJSON.name)
  .description(packageJSON.description)
  .version(packageJSON.version);

program.command('dev')
  .description('The development command of obscur-ts.')
  .option('-l, --local', 'Only deploy a local server for development')
  .action((options: { local?: boolean }) => {
    console.log(
      options.local === true
      ? chalk.red("Local development started...")
      : chalk.blue("Development started...")
    );
  });

program.parse();