const { User } = require('../../../models/user');
const { Folder } = require('../../../models/folder');
const request = require('supertest');

let server;

describe('auth middleware', () => {
    beforeEach(() => { server  = require('../../../index'); });
    afterEach(async () => {
        await Folder.deleteMany({});
        server.close();
    });
    
    let token;

    beforeEach(() => {
        token = new User().generateAuthToken();
    });

    const exec = async () => {
        return await request(server)
            .post('/api/folders')
            .set('x-auth-token', token)
            .send({ name: 'folder1' });
    }

    it('should return 401 if no token is provided', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = 'invalid token';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });
});