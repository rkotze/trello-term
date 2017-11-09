const { baseQuery } = require('./buildQuery');

describe('Building base queries', () => {
    it('base query with trello api and method', () => {
        const actual = baseQuery({ method: 'GET' });
        expect(actual).toEqual({
            method: 'GET',
            url: 'https://api.trello.com/1/',
            qs: {}
        });
    });
});