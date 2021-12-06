const validateObjectIds = require('../../../middleware/validateObjectIds');
const mongoose = require('mongoose');

describe('validateObjectIds middleware', () => {
    let id = mongoose.Types.ObjectId().toHexString();
    let deckId = mongoose.Types.ObjectId().toHexString();
    let cardId = mongoose.Types.ObjectId().toHexString();
    let req;
    let params;
    let res;
    const next = jest.fn();

    const exec = () => {
        req = {
            params: params
        };
        res = { // is there a better way of handling this?
            send: function(){},
            status: function(s) {
                this.statusCode = s;
                return this;
            }
        };

        validateObjectIds(req, res, next);
    }

    describe('validate id', () => {
        it('should return 404 if id is not valid', () => {
            id = 1;
            
            exec();
            
            expect(res.statusCode).toBe(404);
        });
    });

    describe('validate deckId and cardId', () => {
        it('should return 404 if deckId is not valid', () => {
            deckId = 1;
            params = {
                deckId: deckId,
                cardId: cardId
            };

            exec();

            expect(res.statusCode).toBe(404);
        });

        it('should return 404 if cardId is not valid', () => {
            cardId = 1;
            params = {
                deckId: deckId,
                cardId: cardId
            };

            exec();

            expect(res.statusCode).toBe(404);
        });
    });
});