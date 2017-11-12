
const request = require('request');
const { openCardsOnBoard, listsOnBoard } = require('./buildQuery');

const { chTrello, chCard, chList, chError } = require('./terminalThemes');
const log = console.log;

module.exports.getUserBoardCards = function getUserBoardCards(username, idBoard, codePrefix = '', option) {
    const { TRELLO_API_KEY, TRELLO_API_TOKEN } = process.env;

    if (!TRELLO_API_KEY) {
      log(chError('You need a Trello API KEY. Get one here: https://trello.com/app-key'));
      process.exit(1);
    }
    
    if (TRELLO_API_KEY && !TRELLO_API_TOKEN) {
      log(chError('You need a Trello token. Get one here: https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Trello%20Terminal&key=' + TRELLO_API_KEY));
      process.exit(1);
    }
  
    const openCardsOnBoardQ = openCardsOnBoard({
      idBoard: idBoard,
      fields: 'id,name,shortUrl,url,idList'
    });
    
    const listsOnBoardQ = listsOnBoard({
      idBoard: idBoard,
      fields: 'id,name'
    }); 
      
    const listFilter = option.listfilter;
  
    request(listsOnBoardQ, function (error, response, body) {
      if (error) throw new Error(error);
      log(chTrello(' Your cards '));
  
      const listsOfLists = JSON.parse(body);
  
      request(openCardsOnBoardQ, function (error, response, body) {
        if (error) throw new Error(error);
  
        const cardList = JSON.parse(body);
        const userCards = cardList.filter((card) => {
          return card.members.length > 0 && card.members.some((member) => (member.username === username));
        });
  
        listsOfLists.forEach(function (list) {
          let cardsToList = 0;
          userCards.forEach(function (card) {
            if (card.idList === list.id && whenListFilter(list.name, listFilter)) {
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
  
function whenListFilter(listName, filter) {
    if(typeof filter === 'undefined') return true;

    return new RegExp(filter, 'i').test(listName);
}