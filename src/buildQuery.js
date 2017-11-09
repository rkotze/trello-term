module.exports.baseQuery = function(query){
    return Object.assign({
        method: 'GET',
        url: 'https://api.trello.com/1/',
        qs: {}
    }, query);
}