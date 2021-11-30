const request = require('supertest');
const { Folder } = require('../../models/folder');

let server;

describe('/api/folders', () => {
    beforeEach(() => { server  = require('../../index'); });
    afterEach(async () => {
        server.close();
        await Folder.deleteMany({});
    });

    describe('GET /', () => {
        it('should return all folders', async () => {
            await Folder.collection.insertMany([
                { name: 'folder1' },
                { name: 'folder2' }
            ]);

            const res = await request(server).get('/api/folders');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });
    });
});