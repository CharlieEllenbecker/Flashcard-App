const { User } = require('../../../models/user');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');

describe('auth middleware', () => {
    let user;
    let token;
    let req;
    let res;
    const next =jest.fn();

    beforeEach(() => {
        user = { _id: mongoose.Types.ObjectId() };
        token = new User(user).generateAuthToken();
    });

    const exec = () => {
        req = {
            header: {
                'x-auth-token': token
            }
        };
        res = { // is there a better way of handling this?
            send: function(){},
            status: function(s) {
                this.statusCode = s;
                return this;
            }
        };

        auth(req, res, next);
    }

    it('should return 401 if no token is not provided', () => {
        token = undefined;

        exec();

        expect(res.statusCode).toBe(401);
    });

    it('should return 400 if jwt is invalid', () => {
        token = 1;

        exec();

        expect(res.statusCode).toBe(400);
    });

    it('should populate req.user with the payload of a valid JWT', () => {
        exec();
        
        expect(req.user).toMatchObject(user);
    });
});