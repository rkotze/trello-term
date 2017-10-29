#!/usr/bin/env node

const request = require('request');
const chalk = require('chalk');
const program = require('commander');

const log = console.log;

program
  .version('1.0.0')
  .description('See trello cards you belong to on a board.');

program
  .command('mycards <username> <idBoard> [codePrefix]')
  .alias('mc')
  .description('Find your codes in a board')
  .action(yourCards);

program.parse(process.argv);

// Themes:
const chTrello = chalk.bgHex('#026AA7').hex('#fff');
const chCard = chalk.cyan;
const chList = chalk.gray;
const chError = chalk.bold.red;

log(chTrello(' Trello Terminal '));

function yourCards(username, idBoard, codePrefix = '') {
  const { TRELLO_API_KEY, TRELLO_API_TOKEN } = process.env;
  if (!TRELLO_API_KEY) {
    log(chError('You need a Trello API KEY. Get one here: https://trello.com/app-key'));
    process.exit(1);
  }
  
  if (TRELLO_API_KEY && !TRELLO_API_TOKEN) {
    log(chError('You need a Trello token. Get one here: https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Trello%20Terminal&key=' + TRELLO_API_KEY));
    process.exit(1);
  }
  var openCardsOnBoard = {
    method: 'GET',
    url: 'https://api.trello.com/1/boards/' + idBoard + '/cards/open',
    qs: {
      fields: 'id,name,shortUrl,url,idList',
      members: true,
      key: TRELLO_API_KEY,
      token: TRELLO_API_TOKEN
    }
  };
  
  var listsOnBoard = {
    method: 'GET',
    url: 'https://api.trello.com/1/boards/' + idBoard + '/lists',
    qs: {
      fields: 'id,name',
      key: TRELLO_API_KEY,
      token: TRELLO_API_TOKEN
    }
  };

  request(listsOnBoard, function (error, response, body) {
    if (error) throw new Error(error);
    log(chTrello(' Your cards '));

    const listsOfLists = JSON.parse(body);

    request(openCardsOnBoard, function (error, response, body) {
      if (error) throw new Error(error);

      const cardList = JSON.parse(body);
      const userCards = cardList.filter((card) => {
        return card.members.length > 0 && card.members.some((member) => (member.username === username));
      });

      listsOfLists.forEach(function (list) {
        let cardsToList = 0;
        userCards.forEach(function (card) {
          if (card.idList === list.id) {
            if (cardsToList === 0) log(chList(' LIST  ' + list.name));

            const cardCode = codePrefix + card.url.match(/\/(\d+)-/)[1] + ' ';
            log(chCard(`  CARD  ${card.name} `));
            log('        ' + cardCode + ' ' + card.shortUrl);
            cardsToList++;
          }
        });
      });
    });
  });
}