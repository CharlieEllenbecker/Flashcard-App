const { User } = require('../../../models/user');
const request = require('supertest');
const bcrypt = require('bcrypt');

let server;

describe('/api/login', () => {
    beforeEach(() => { server  = require('../../../index'); });
    afterEach(async () => {
        await User.deleteMany({});
        server.close();
    });

    describe('POST /', () => {
        let user;
        let email;
        let password;

        beforeEach(async () => {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash('password123', salt);

            user = await new User({
                email: 'john.smith@gmail.com',
                password: hash
            }).save();
            
            email = 'john.smith@gmail.com';
            password = 'password123';
        });

        const exec = async () => {
            return await request(server)
                .post('/api/login')
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

        it('should return 400 if user does not exist', async () => {
            email = 'joe.buck@gmail.com';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if password id incorrect', async () => {
            password = 'incorrectpassword';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return x-auth-token if valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.header).toHaveProperty('x-auth-token');
        });
    });

});