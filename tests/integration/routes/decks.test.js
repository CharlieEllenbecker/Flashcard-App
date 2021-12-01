const { Deck } = require('../../../models/deck');
const { Folder } = require('../../models/folder');
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
            const folder = new Folder({ name: 'folder1' });
            await folder.save();

            await Deck.collection.insertMany([
                {
                    name: 'deck1',
                    description: 'description1',
                    folder: folder._id,
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
                    folder: folder._id,
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

            const res = await request(server).get('/api/decks/');

            expect(res.status).toBe(200);
            expect(res.body.some(d => d.name === 'deck1')).toBeTruthy();
            expect(res.body.some(d => d.name === 'deck2')).toBeTruthy();
        });
    });

    describe('POST /', () => {
        let token;
        let name;
        let description;
        let folder;
        let cards;

        beroreEach(async () => {
            token = new User().generateAuthToken();
            name = 'deck1';
            description = 'description1';

            let folderInDb = new Folder({ name: 'folder1' });
            folderInDb = await folderInDb.save();
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
                .post('/api/decks/')
                .set('x-auth-token', token)
                .send({
                    name: name,
                    description: description,
                    folder: folder,
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

            let deck = await Folder.find({ name: 'deck1' });

            expect(res.status).toBe(200);
            expect(deck).not.toBeNull();
        });
    });

    describe('GET /:id', () => {
        it('should return the deck if valid id is passed', () => {
            const res = await exec();

            
        });

        it('should return 404 if no deck with the given id exists', async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/decks/' + id);
        
            expect(res.status).toBe(404);
        });

        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/decks/1');
        
            expect(res.status).toBe(404);
        });
    });

    // TODO:
    describe('PUT /:id', () => {
        let deck;
        let token;
        let id;
        let newName;
        let newDescription;
        let newFolder;
        let newCards;

        beforeEach(() => {
            let folderInDb = new Folder({ name: 'folder1' });
            folderInDb = await folderInDb.save();

            let newFolderInDb = new Folder({ name: 'newFolder1' });
            newFolderInDb = await newFolderInDb.save();

            deck = new Deck({
                name: 'deck1',
                description: 'description1',
                folder: folderInDb._id,
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
            });
            await deck.save();

            token = new User().generateAuthToken();
            id = deck._id;
            newName = 'updatedName';
            newDescription = 'updatedDescription';
            newFolder = newFolderInDb._id;
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
                .put('/api/decks/' + id)
                .set('x-auth-token', token)
                .send({
                    name: newName,
                    description: newDescription,
                    folder: newFolder,
                    cards: newCards
                });
        }

        
    });
});