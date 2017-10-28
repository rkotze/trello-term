var request = require("request");
const args = process.argv.slice(2)
const [username, idBoard] = args;

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

if (!TRELLO_API_KEY) {
    console.log('You need a Trello API KEY. Get one here: https://trello.com/app-key');
    process.exit(1);
}

if (TRELLO_API_KEY && !TRELLO_API_TOKEN) {
    console.log('You need a Trello token. Get one here: https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Server%20Token&key=' + TRELLO_API_KEY);
    process.exit(1);
}

request(listsOnBoard, function (error, response, body) {
    if (error) throw new Error(error);

    const listsOfLists = JSON.parse(body);

    request(openCardsOnBoard, function (error, response, body) {
        if (error) throw new Error(error);

        const cardList = JSON.parse(body);
        const userCards = cardList.filter((card) => {
            return card.members.length > 0 && card.members.some((member) => (member.username === username));
        });

        listsOfLists.forEach(function(list){
            console.log(list.name);
            userCards.forEach(function (card) {
                if(card.idList === list.id){
                    console.log(`-> ${card.name} ${card.shortUrl}`);
                }
            });
        });

    });
});