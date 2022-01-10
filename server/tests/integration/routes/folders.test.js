const { Folder } = require('../../../models/folder');
const { Deck } = require('../../../models/deck');
const { User } = require('../../../models/user');
const request = require('supertest');
const mongoose = require('mongoose');

let server;
let globalUserId;
let globalUserToken;

describe('/api/folders', () => {
    beforeEach(async () => {
        server  = require('../../../index');
        const user = await new User({
            email: 'john.smith@gmail.com',
            password: 'password'
        }).save();
        globalUserId = user._id;
        globalUserToken = new User(user).generateAuthToken();
    });
    afterEach(async () => {
        await User.deleteMany({});
        await Folder.deleteMany({});
        await Deck.deleteMany({});
        server.close();
    });

    describe('GET /', () => {
        it('should return all folders', async () => {
            await Folder.collection.insertMany([
                { name: 'folder1', userId: globalUserId },
                { name: 'folder2', userId: globalUserId }
            ]);

            const res = await request(server)
                .get('/api/folders')
                .set('x-auth-token', globalUserToken)
                .send();

            expect(res.status).toBe(200);
            expect(res.body.some(f => f.name === 'folder1')).toBeTruthy();
            expect(res.body.some(f => f.name === 'folder2')).toBeTruthy();
        });

        it('should return an empty array of folders', async () => {
            const res = await request(server)
                .get('/api/folders')
                .set('x-auth-token', globalUserToken)
                .send();

            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        });
    });

    describe('POST /', () => {
        let token;
        let name;
        let description;

        beforeEach(() => {
            token = globalUserToken;
            name = 'folder1';
            description = 'description1';
        });

        const exec = async () => {
            return await request(server)
                .post('/api/folders')
                .set('x-auth-token', token)
                .send({
                    name: name,
                    description: description
                });
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if folder name is less than 5 characters', async () => {
            name = '1234';
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if folder name is more than 50 characters', async () => {
            name = new Array(52).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if folder description is less than 5 characters', async () => {
            description = '1234';
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if folder description is more than 200 characters', async () => {
            description = new Array(202).join('a');
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the folder if it is valid', async () => {
            const res = await exec();

            const folder = await Folder.find({ name: 'folder1' });

            expect(res.status).toBe(200);
            expect(folder).not.toBeNull();
        });

        it('should return the folder if it is valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', name);
            expect(res.body).toHaveProperty('description', description);
        });
    });

    describe('GET /:id', () => {
        it('should return 404 if no folder with the given id exists', async () => {
            const id = mongoose.Types.ObjectId();

            const res = await request(server)
                .get(`/api/folders/${id}`)
                .set('x-auth-token', globalUserToken)
                .send();
            
            expect(res.status).toBe(404);
        });

        it('should return 404 if invalid id is passed', async () => {
            const id = 1;
            
            const res = await request(server)
                .get(`/api/folders/${id}`)
                .set('x-auth-token', globalUserToken)
                .send();
        
            expect(res.status).toBe(404);
        });

        it('should return an empty array of decks if valid id is passed', async () => {
            const folder = await new Folder({ name: 'folder1' }).save();

            const res = await request(server)
                .get(`/api/folders/${folder._id}`)
                .set('x-auth-token', globalUserToken)
                .send();
        
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', folder.name);
            expect(res.body).toHaveProperty('decks');
        });

        it('should return a populated array of decks if valid id is passed', async () => {
            const folder = await new Folder({ name: 'folder1' }).save();
            const decks = [
                {
                    name: 'deck1',
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
                    name: 'deck12',
                    folderId: folder._id,
                    cards: [
                        {
                            front: '2',
                            back: 'c'
                        },
                        {
                            front: '3',
                            back: 'd'
                        }
                    ]
                }
            ];
            await Deck.collection.insertMany(decks);

            const res = await request(server)
                .get(`/api/folders/${folder._id}`)
                .set('x-auth-token', globalUserToken)
                .send();
        
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', folder.name);
            expect(res.body).toHaveProperty('decks');
        });
    });
    
    describe('PUT /:id', () => {
        let folder;
        let token;
        let id;
        let newName;
        let newDescription;

        beforeEach(async () => {
            folder = await new Folder({
                name: 'folder1',
                description: 'description1'
            }).save();

            token = globalUserToken;
            id = folder._id;
            newName = 'updatedName';
            newDescription = 'updatedDescription';
        });

        const exec = async () => {
            return await request(server)
                .put(`/api/folders/${id}`)
                .set('x-auth-token', token)
                .send({
                    name: newName,
                    description: newDescription
                });
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 404 if no folder with the given id exists', async () => {
            id = mongoose.Types.ObjectId();

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should return 404 if invalid id is passed', async () => {
            id = 1;

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should return 400 if new folder name is less than 5 characters', async () => {
            newName = '1234';
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if new folder name is more than 50 characters', async () => {
            newName = new Array(52).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if new folder description is less than 5 characters', async () => {
            newDescription = '1234';
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if new folder description is more than 200 characters', async () => {
            newDescription = new Array(202).join('a');
            
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should update the folder if it is valid', async () => {
            const res = await exec();

            const updatedFolder = await Folder.find({name: newName });
            
            expect(res.status).toBe(200);
            expect(folder).not.toBeNull();
        });

        it('should return the updated folder if it is valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', newName);
            expect(res.body).toHaveProperty('description', newDescription);
        });
    });

    describe('DELETE /:id', () => {
        let folder;
        let token;
        let id;

        beforeEach(async () => {
            folder = await new Folder({
                name: 'folder1',
                description: 'description1'
            }).save();

            token = globalUserToken;
            id = folder._id;
            
        });

        const exec = async () => {
            return await request(server)
                .delete(`/api/folders/${id}`)
                .set('x-auth-token', token)
                .send();
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 404 if no folder with the given id exists', async () => {
            id = mongoose.Types.ObjectId();

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should return 404 if invalid id is passed', async () => {
            id = 1;

            const res = await exec();
        
            expect(res.status).toBe(404);
        });

        it('should delete the folder if input is valid', async () => {
            let deck = await new Deck({
                name: 'deck1',
                folderId: id,
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

            const res = await exec();

            const folderInDb = await Folder.findById(id);
            const deckInDb = await Deck.findById(deck._id);

            expect(res.status).toBe(200);
            expect(folderInDb).toBeNull();
            expect(deckInDb).not.toContain('folder');
        });

        it('should return the deleted folder', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', folder._id.toHexString());
            expect(res.body).toHaveProperty('name', folder.name);
            expect(res.body).toHaveProperty('description', folder.description);
        });
    });
});