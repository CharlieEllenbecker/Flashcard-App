const { User } = require('../../../models/user');
const request = require('supertest');
const mongoose = require('mongoose');

let server;

describe('/api/users', () => {
    beforeEach(() => { server  = require('../../../index'); });
    afterEach(async () => {
        await User.deleteMany({});
        server.close();
    });

    describe('GET /me', () => {
        let user;
        let token;
        let email = 'john.smith@gmail.com';

        beforeEach(async () => {
            user = await new User({
                email: email,
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
        });

        const exec = async () => {
            return await request(server)
                .get('/api/users/me')
                .set('Cookie', `token=${token};`)
                .send();
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return user data if valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('email', email);
        });
    });

    describe('POST /', () => {
        let email;
        let password;

        beforeEach(async () => {
            email = 'john.smith@gmail.com';
            password = 'password123';
        });

        const exec = async () => {
            return await request(server)
                .post('/api/users')
                .send({
                    email: email,
                    password: password
                });
        }

        it('should return 400 if email is not valid', async () => {
            email = 'invalid email';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if email is less than 5 characters', async () => {
            email = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if email is more than 256 characters', async () => {
            email = new Array(258).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if password is less than 5 characters', async () => {
            password = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if password is more than 1024 characters', async () => {
            email = new Array(1026).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if user already exist', async () => {
            const user = await new User({
                email: email,
                password: password
            }).save();

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return authorization if valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.cookie).toHaveProperty('token');
        });
    });
});