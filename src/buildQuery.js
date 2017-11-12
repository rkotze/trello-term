const joinable = require('joinable').joinStrings;
const BASE_URI = 'https://api.trello.com/1';
const { TRELLO_API_KEY, TRELLO_API_TOKEN, TEST } = process.env;

function baseQuery(query, authObject){
    let newQuery = Object.assign({
        method: 'GET',
        url: BASE_URI,
        qs: {}
    }, query);

    let keyToken = authObject;
    if(!TEST){
        keyToken = {
            key: TRELLO_API_KEY,
            token: TRELLO_API_TOKEN
        };
    }

    newQuery.qs = Object.assign(newQuery.qs, keyToken);
    return newQuery;
};

function openCardsOnBoard(query, authObject){
    let newQuery = {
        url: joinable(BASE_URI, 'boards', query.idBoard, 'cards', 'open', { separator: '/' }),
        qs: {
            fields: query.fields,
            members: true
        }
    };
    return baseQuery(newQuery, authObject);
};

function listsOnBoard(query, authObject){
    let newQuery = {
        url: joinable(BASE_URI, 'boards', query.idBoard, 'lists', { separator: '/' }),
        qs: {
            fields: query.fields
        }
    };
    return baseQuery(newQuery, authObject);
};
module.exports = {
    baseQuery,
    openCardsOnBoard,
    listsOnBoard
};