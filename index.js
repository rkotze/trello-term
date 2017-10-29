#!/usr/bin/env node

const program = require('commander');

const { chTrello } = require('./src/terminalThemes');
const { getUserBoardCards } = require('./src/getCards');
const log = console.log;

program
  .version('1.0.0')
  .description('See trello cards you belong to on a board.');

program
  .command('mycards <username> <idBoard> [codePrefix]')
  .alias('mc')
  .description('Find your codes in a board')
  .option('-f, --listfilter <name>', 'Filter by list name')
  .action(getUserBoardCards);

program.parse(process.argv);

log(chTrello(' Trello Terminal '));