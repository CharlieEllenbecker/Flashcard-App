const { Deck } = require('../../../models/deck');
const { User } = require('../../../models/user');
const request = require('supertest');
const mongoose = require('mongoose');

describe('/api/decks', () => {
    beforeEach(() => { server  = require('../../../index'); });
    afterEach(async () => {
        await Deck.deleteMany({});
        server.close();
    });

    // TODO:
    // describe('GET /', () => {
    //     it('should return all decks', async () => {
    //         await Deck.collection.insertMany([
    //             {
    //                 name: 'deck1',
    //                 description: 'description1',
    //                 folder: mongoose.Types.ObjectId(),
    //                 cards: [
    //                     {
    //                         front: '1',
    //                         back: 'a'
    //                     },
    //                     {
    //                         front: '2',
    //                         back: 'b'
    //                     }
    //                 ]
    //             },
    //             {
    //                 name: 'deck2',
    //                 description: 'description2',
    //                 folder: mongoose.Types.ObjectId(),
    //                 cards: [
    //                     {
    //                         front: '3',
    //                         back: 'c'
    //                     },
    //                     {
    //                         front: '4',
    //                         back: 'd'
    //                     }
    //                 ]
    //             }
    //         ]);

    //         const res = await request(server).get('/api/decks');

    //         expect(res.status).toBe(200);
    //         expect(res.body.some(d => d.name === 'deck1')).toBeTruthy();
    //         expect(res.body.some(d => d.name === 'deck2')).toBeTruthy();
    //         expect(res.body.some(d => d.name === 'deck1')).toBeTruthy();
    //     });
    // });
});