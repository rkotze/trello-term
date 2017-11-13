
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

  flow
  .request(listsOnBoardQ)
  .request(openCardsOnBoardQ)
  .then(function (listsOfLists, cardList) {
    log(chTrello(' Your cards '));

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
}
  
function whenListFilter(listName, filter) {
    if(typeof filter === 'undefined') return true;

    return new RegExp(filter, 'i').test(listName);
}

const flow = {
  store: [],
  requestCount: 0,
  callThen: function(){},
  request: function(query){
    this.requestCount++;
    request(query, (error, response, body) => {
      if (error) throw new Error(error);
      
      this.store.push(JSON.parse(body));
      this.callThen();
    });

    return this;
  },

  then: function(cb) {
    this.callThen = () => {
      if(this.store.length === this.requestCount){
        cb(...this.store);
        this.store = [];
        this.requestCount = 0;
      }
    }
    return this;
  }
}