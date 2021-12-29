const { Card } = require('../../../models/card');
const { Deck } = require('../../../models/deck');
const { User } = require('../../../models/user');
const request = require('supertest');
const mongoose = require('mongoose');

let server;
let globalUserToken;

describe('/api/cards', () => {
    beforeEach(async () => {
        server  = require('../../../index');
        const user = await new User({
                email: 'john.smith@gmail.com',
                password: 'password'
            }).save();
        globalUserToken = new User(user).generateAuthToken();
    });
    afterEach(async () => {
        await User.deleteMany({});
        await Deck.deleteMany({});
        await Card.deleteMany({});
        server.close();
    });

    describe('PUT /:deckId/:cardId', () => {
        let deck;
        let token;
        let deckId;
        let cardId;
        let newFront;
        let newBack;

        beforeEach(async () => {
            deck = await new Deck({
                name: 'deck1',
                description: 'description1',
                cards: [
                    {
                        front: '1',
                        back: 'a'
                    },
                    {
                        front: '2',
                        back: 'b'
                    }
                ]
            }).save();

            token = globalUserToken;
            deckId = deck._id;
            cardId = deck.cards[0]._id;
            newFront = 'newFront';
            newBack = 'newBack';
        });

        const exec = async () => {
            return await request(server)
                .put(`/api/cards/${deckId}/${cardId}`)
                .set('x-auth-token', token)
                .send({
                    front: newFront,
                    back: newBack
                });
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 404 if no deck with the given id exists', async () => {
            deckId = mongoose.Types.ObjectId();

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should return 404 if no card with the given id exists in the deck with the given id', async () => {
            cardId = mongoose.Types.ObjectId();

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should return 404 if invalid deckId is passed', async () => {
            deckId = 1;

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should return 404 if invalid cardId is passed', async () => {
            cardId = 1;

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should return 400 if one of the cards front is an empty string', async () => {
            newFront = '';
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if one of the new cards back is an empty string', async () => {
            newBack = '';
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if one of the new cards front is more than 200 characters', async () => {
            newFront = new Array(202).join('a');
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if one of the new cards back is more than 200 characters', async () => {
            newBack = new Array(202).join('a');
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should update the card in the deck if it is valid', async () => {
            const res = await exec();

            const updatedDeck = await Deck.findById(deckId);

            expect(res.status).toBe(200);
            expect(updatedDeck.cards[0]).toHaveProperty('front', newFront);
            expect(updatedDeck.cards[0]).toHaveProperty('back', newBack);
        });

        it('should return the deck with the updated card if it is valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', deckId.toHexString());
            expect(res.body).toHaveProperty('name', deck.name);
            expect(res.body).toHaveProperty('description', deck.description);
            expect(res.body).toHaveProperty('cards');
        });
    });

    describe('DELETE /:deckId/:cardId', () => {
        let deck;
        let token;
        let deckId;
        let cardId;

        beforeEach(async () => {
            deck = await new Deck({
                name: 'deck1',
                description: 'description1',
                cards: [
                    {
                        front: '1',
                        back: 'a'
                    },
                    {
                        front: '2',
                        back: 'b'
                    }
                ]
            }).save();

            token = globalUserToken;
            deckId = deck._id;
            cardId = deck.cards[0]._id;
        });

        const exec = async () => {
            return await request(server)
                .delete(`/api/cards/${deckId}/${cardId}`)
                .set('x-auth-token', token)
                .send();
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 404 if no deck with the given id exists', async () => {
            deckId = mongoose.Types.ObjectId();

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should return 404 if no card with the given id exists in the deck with the given id', async () => {
            cardId = mongoose.Types.ObjectId();

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should return 404 if invalid deckId is passed', async () => {
            deckId = 1;

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should return 404 if invalid cardId is passed', async () => {
            cardId = 1;

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should delete the card if input is valid', async () => {
            const res = await exec();

            const deckInDb = await Deck.findById(deckId);

            expect(res.status).toBe(200);
            expect(deckInDb.cards).toEqual(expect.not.arrayContaining([deck.cards[0]]));
        });

        it('should return the deck without the deleted card ', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', deckId.toHexString());
            expect(res.body).toHaveProperty('name', deck.name);
            expect(res.body).toHaveProperty('description', deck.description);
            expect(res.body).toHaveProperty('cards');
        });
    });
});