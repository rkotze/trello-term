var request = require("request");

const { TRELLO_API_KEY, TRELLO_API_TOKEN } = process.env;
var options = {
  method: 'POST',
  url: 'https://api.trello.com/1/boards/',
  qs: { 
      name: 'BOARD NAME HERE',
      key: TRELLO_API_KEY,
      token: TRELLO_API_TOKEN
    }
};

if(!TRELLO_API_KEY){
    console.log('You need a Trello API KEY. Get one here: https://trello.com/app-key');
    process.exit(1);
}

if(TRELLO_API_KEY && !TRELLO_API_TOKEN) {
    console.log('You need a Trello token. Get one here: https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Server%20Token&key=' + TRELLO_API_KEY);
    process.exit(1);
}

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});