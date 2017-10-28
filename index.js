var request = require("request");
const args = process.argv.slice(2)
const [username, idBoard] = args;

const { TRELLO_API_KEY, TRELLO_API_TOKEN } = process.env;

https://api.trello.com/1/boards/590ae5512bc2087d623b4bc5/cards/open?fields=id,name,shortUrl,url&lists=true&members=true
var options = {
    method: 'GET',
    url: 'https://api.trello.com/1/boards/' + idBoard + '/cards/open',
    qs: {
        fields: 'id,name,shortUrl,url',
        lists: true,
        members: true,
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

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    const cardList = JSON.parse(body);
    const userCards = cardList.filter((card) => {
        return card.members.length > 0 && card.members.some((member) => (member.username === username));
    });

    userCards.forEach(function (card, i) {
        console.log(`${i + 1}. ${card.name} ${card.shortUrl}`);
    });
});