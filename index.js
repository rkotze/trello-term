const request = require('request');
const chalk = require('chalk');

const log = console.log;

const args = process.argv.slice(2)
const [username, idBoard] = args;

// Themes:
const chTrello = chalk.bgHex('#026AA7').hex('#fff');
const chCard = chalk.bgWhite.black;
const chLink = chalk.hex('#026AA7');
const chList = chalk.gray;
const error = chalk.bold.red;

const { TRELLO_API_KEY, TRELLO_API_TOKEN } = process.env;

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

log(chTrello(' Trello Terminal '));

if (!TRELLO_API_KEY) {
    log(chError('You need a Trello API KEY. Get one here: https://trello.com/app-key'));
    process.exit(1);
}

if (TRELLO_API_KEY && !TRELLO_API_TOKEN) {
    log(chError('You need a Trello token. Get one here: https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Server%20Token&key=' + TRELLO_API_KEY));
    process.exit(1);
}

request(listsOnBoard, function (error, response, body) {
    if (error) throw new Error(error);
    log(chTrello(' > Your cards '));

    const listsOfLists = JSON.parse(body);

    request(openCardsOnBoard, function (error, response, body) {
        if (error) throw new Error(error);

        const cardList = JSON.parse(body);
        const userCards = cardList.filter((card) => {
            return card.members.length > 0 && card.members.some((member) => (member.username === username));
        });

        listsOfLists.forEach(function(list){
            let cardsToList = 0;
            userCards.forEach(function (card) {
                if(card.idList === list.id){
                    if(cardsToList === 0) log(chList(' ' + list.name));
                    log('   ' + chCard(` ${card.name} `) + ' ' + chLink(card.shortUrl));
                    cardsToList++;
                }
            });
        });

    });
});