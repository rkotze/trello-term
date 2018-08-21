#!/usr/bin/env node

const program = require('commander');
const { spawn } = require('child_process');

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

program
  .command('commit')
  .description('Find your codes in a board')
  .action(function(){
    const child = spawn('git', ['commit', '-m', `Trello ticket commit`, '-e'], {
      stdio: 'inherit'
    });
    child.on('close', function (e, code) {
      console.log("finished", e, code);
    });
  });

program.parse(process.argv);

log(chTrello(' Trello Terminal '));