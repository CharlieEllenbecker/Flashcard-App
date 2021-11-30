const request = require('supertest');
const { Folder } = require('../../models/folder');

let server;

describe('/api/folders', () => {
    beforeEach(() => { server  = require('../../index'); });
    afterEach(async () => {
        await Folder.deleteMany({});
        server.close();
    });

    describe('GET /', () => {
        it('should return all folders', async () => {
            await Folder.collection.insertMany([
                { name: 'folder1' },
                { name: 'folder2' }
            ]);

            const res = await request(server).get('/api/folders');

            expect(res.status).toBe(200);
            expect(res.body.some(f => f.name === 'folder1')).toBeTruthy();
            expect(res.body.some(f => f.name === 'folder2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a folder if valid id is passed', async () => {
            const folder = new Folder({ name: 'folder1' });                 // look into whether or not the save() method or insertOne() should be used
            await folder.save();

            const res = await request(server).get('/api/folders/' + folder._id);
        
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', folder.name);
        });
    });

    describe('GET /:id', () => {
        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/folders/1');
        
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        it('should return 401 if client is not logged in', async () => {
            const res = await request(server)
                .post('/api/folders')
                .send({ name: 'folder1' });

            expect(res.status).toBe(401);
        });
    });
});