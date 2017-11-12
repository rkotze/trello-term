const { baseQuery, openCardsOnBoard, listsOnBoard } = require('./buildQuery');

describe('Building queries', () => {
    it('base query with trello api and method', () => {
        const actual = baseQuery();
        expect(actual).toEqual({
            method: 'GET',
            url: 'https://api.trello.com/1',
            qs: {

            }
        });
    });

    it('base query send in new key and tokens', () => {
        const actual = baseQuery({}, { key: '12', token: '45' });
        expect(actual).toEqual({
            method: 'GET',
            url: 'https://api.trello.com/1',
            qs: {
                key: '12', 
                token: '45' 
            }
        });
    });
    
    it('open cards on a board', () => {
        const actual = openCardsOnBoard({
            idBoard: 'ysekw',
            fields: 'id,name,shortUrl,url,idList'
        }, 
        { key: '12', token: '45' });

        expect(actual).toEqual({
            method: 'GET',
            url: 'https://api.trello.com/1/boards/ysekw/cards/open',
            qs: {
              fields: 'id,name,shortUrl,url,idList',
              members: true,
              key: '12',
              token: '45'
            }
        });
    });

    it('lists on a board', () => {
        const actual = listsOnBoard({
            idBoard: 'ysekw',
            fields: 'id,name'
        }, 
        { key: '12', token: '45' });

        expect(actual).toEqual({
            method: 'GET',
            url: 'https://api.trello.com/1/boards/ysekw/lists',
            qs: {
              fields: 'id,name',
              key: '12',
              token: '45'
            }
        });
    });
});