const { Deck } = require('../../../models/deck');
const { Folder } = require('../../../models/folder');
const { User } = require('../../../models/user');
const request = require('supertest');
const mongoose = require('mongoose');

describe('/api/decks', () => {
    beforeEach(() => { server  = require('../../../index'); });
    afterEach(async () => {
        await Deck.deleteMany({});
        await Folder.deleteMany({});
        server.close();
    });

    describe('GET /', () => {
        it('should return all decks', async () => {
            const folder = await new Folder({ name: 'folder1' }).save();

            await Deck.collection.insertMany([
                {
                    name: 'deck1',
                    description: 'description1',
                    folderId: folder._id,
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
                },
                {
                    name: 'deck2',
                    description: 'description2',
                    folderId: folder._id,
                    cards: [
                        {
                            front: '3',
                            back: 'c'
                        },
                        {
                            front: '4',
                            back: 'd'
                        }
                    ]
                }
            ]);

            const res = await request(server).get('/api/decks');

            expect(res.status).toBe(200);
            expect(res.body.some(d => d.name === 'deck1')).toBeTruthy();
            expect(res.body.some(d => d.name === 'deck2')).toBeTruthy();
        });

        it('should return an empty array of decks', async () => {
            const res = await request(server).get('/api/decks');

            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        });
    });

    describe('POST /', () => {
        let token;
        let name;
        let description;
        let folder;
        let cards;

        beforeEach(async () => {
            token = new User().generateAuthToken();
            name = 'deck1';
            description = 'description1';

            const folderInDb = await new Folder({ name: 'folder1' }).save();
            folder = folderInDb._id;

            cards = [
                {
                    front: '1',
                    back: 'a'
                },
                {
                    front: '2',
                    back: 'b'
                }
            ];
        });

        const exec = async () => {
            return await request(server)
                .post('/api/decks')
                .set('authorization', token)
                .send({
                    name: name,
                    description: description,
                    folderId: folder,
                    cards: cards
                });
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if deck name is less than 5 characters', async () => {
            name = '1234';
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if deck name is more than 50 characters', async () => {
            name = new Array(52).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if deck description is less than 5 characters', async () => {
            description = '1234';
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if deck description is more than 200 characters', async () => {
            description = new Array(202).join('a');
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if deck folder id is invalid', async () => {
            folder = 1;
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if one of the decks cards front is an empty string', async () => {
            cards[0].front = '';
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if one of the decks cards back is an empty string', async () => {
            cards[0].back = '';
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if one of the decks cards front is more than 200 characters', async () => {
            cards[0].front = new Array(202).join('a');
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if one of the decks cards back is more than 200 characters', async () => {
            cards[0].back = new Array(202).join('a');
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the deck if it is valid', async () => {
            const res = await exec();

            const deck = await Deck.find({ name: name });

            expect(res.status).toBe(200);
            expect(deck).not.toBeNull();
        });
    });

    describe('GET /:id', () => {
        it('should return 404 if no deck with the given id exists', async () => {
            const id = mongoose.Types.ObjectId();

            const res = await request(server).get(`/api/decks/${id}`);
        
            expect(res.status).toBe(404);
        });

        it('should return 404 if invalid id is passed', async () => {
            const id = 1;

            const res = await request(server).get(`/api/decks/${id}`);
        
            expect(res.status).toBe(404);
        });

        it('should return the deck if valid id is passed', async () => {
            const folder = await new Folder({ name: 'folder1' }).save();

            const deck = await new Deck({
                    name: 'deck1',
                    description: 'description1',
                    folderId: folder._id,
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

            const res = await request(server).get(`/api/decks/${deck._id}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', deck._id.toHexString());
            expect(res.body).toHaveProperty('name', deck.name);
            expect(res.body).toHaveProperty('description', deck.description);
            expect(res.body).toHaveProperty('folderId', deck.folderId.toHexString());
            expect(res.body).toHaveProperty('cards');
        });
    });

    describe('PUT /:id', () => {
        let deck;
        let token;
        let id;
        let newName;
        let newDescription;
        let newFolderId;
        let newCards;

        beforeEach(async () => {
            const folderInDb = await new Folder({ name: 'folder1' }).save();
            const newFolderInDb = await new Folder({ name: 'newFolder1' }).save();

            deck = await new Deck({
                name: 'deck1',
                description: 'description1',
                folderId: folderInDb._id,
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

            token = new User().generateAuthToken();
            id = deck._id;
            newName = 'updatedName';
            newDescription = 'updatedDescription';
            newFolderId = newFolderInDb._id;
            newCards = [
                {
                    front: '3',
                    back: 'c'
                },
                {
                    front: '4',
                    back: 'd'
                }
            ];
        });

        const exec = async () => {
            return await request(server)
                .put(`/api/decks/${id}`)
                .set('authorization', token)
                .send({
                    name: newName,
                    description: newDescription,
                    folderId: newFolderId,
                    cards: newCards
                });
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 404 if no deck with the given id exists', async () => {
            id = mongoose.Types.ObjectId();

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should return 404 if invalid id is passed', async () => {
            id = 1;

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should return 400 if new deck name is less than 5 characters', async () => {
            newName = '1234';
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if new deck name is more than 50 characters', async () => {
            newName = new Array(52).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if new deck description is less than 5 characters', async () => {
            newDescription = '1234';
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if new deck description is more than 200 characters', async () => {
            newDescription = new Array(202).join('a');
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if new deck folder id is invalid', async () => {
            newFolderId = 1;
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if one of the new decks cards front is an empty string', async () => {
            newCards[0].front = '';
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if one of the new decks cards back is an empty string', async () => {
            newCards[0].back = '';
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if one of the new decks cards front is more than 200 characters', async () => {
            newCards[0].front = new Array(202).join('a');
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if one of the new decks cards back is more than 200 characters', async () => {
            newCards[0].back = new Array(202).join('a');
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should update the deck if it is valid', async () => {
            const res = await exec();

            const updatedDeck = await Deck.find({ name: newName });
            
            expect(res.status).toBe(200);
            expect(updatedDeck).not.toBeNull();
        });

        it('should return the updated deck if it is valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', id.toHexString());
            expect(res.body).toHaveProperty('name', newName);
            expect(res.body).toHaveProperty('description', newDescription);
            expect(res.body).toHaveProperty('folderId', newFolderId.toHexString());
            expect(res.body).toHaveProperty('cards');
        });
    });

    describe('DELETE /:id', () => {
        let deck;
        let token;
        let id;

        beforeEach(async () => {
            const folderInDb = await new Folder({ name: 'folder1' }).save();

            deck = await new Deck({
                name: 'deck1',
                description: 'description1',
                folderId: folderInDb._id,
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

            token = new User().generateAuthToken();
            id = deck._id;
        });

        const exec = async () => {
            return await request(server)
                .delete(`/api/decks/${id}`)
                .set('authorization', token)
                .send();
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 404 if no deck with the given id exists', async () => {
            id = mongoose.Types.ObjectId();

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should return 404 if invalid id is passed', async () => {
            id = 1;

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should delete the deck if input is valid', async () => {
            const res = await exec();

            const deckInDb = await Deck.find({ name: deck.name });

            expect(res.status).toBe(200);
            expect(deckInDb).toEqual([]);
        });

        it('should return the deleted deck', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', deck._id.toHexString());
            expect(res.body).toHaveProperty('name', deck.name);
            expect(res.body).toHaveProperty('description', deck.description);
            expect(res.body).toHaveProperty('folderId', deck.folderId.toHexString());
            expect(res.body).toHaveProperty('cards');
        });
    });
});