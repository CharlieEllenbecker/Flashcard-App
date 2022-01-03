const { Folder, validate } = require('../models/folder');
const { Deck } = require('../models/deck');
const validateObjectIds = require('../middleware/validateObjectIds');
const auth = require('../middleware/auth');
const decodeJwt = require('jwt-decode');
const _ = require('lodash');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    GET - Get all folders
*/
router.get('/', auth, async (req, res) => {
    const userId = decodeJwt(req.header('x-auth-token'))._id;
    const folders = await Folder.find({ userId: userId }).select(['-userId']).sort('name');
    return res.status(200).send(folders);
});

/*
    POST - Add a new folder
*/
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    req.body.userId = decodeJwt(req.header('x-auth-token'))._id;
    let folder = await new Folder(_.pick(req.body, ['name', 'description', 'userId'])).save();
    folder = folder.toObject();
    delete folder.userId;

    return res.status(200).send(folder);
});

/*
    GET - The decks in the folder with the given id
*/
router.get('/:id', [auth, validateObjectIds], async (req, res) => {
    const folder = await Folder.findById(req.params.id).select(['-userId']).sort('name');
    if (!folder) {
        return res.status(404).send(`The folder with the given id ${req.params.id} does not exist.`);
    }

    const decks = await Deck.find({ folderId: req.params.id }).sort('name');

    return res.status(200).send(decks);
});

/*
    PUT - Update the folder with the given id
*/
router.put('/:id', [auth, validateObjectIds], async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    req.body.userId = decodeJwt(req.header('x-auth-token'))._id;
    const folder = await Folder.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'description', 'userId']), { new: true }).select(['-userId']);
    if (!folder) {
        return res.status(404).send(`The folder with the given id ${req.params.id} does not exist.`);
    }

    return res.status(200).send(folder);
});

/*
    DELETE - Delete the folder with the given id
*/
router.delete('/:id', [auth, validateObjectIds], async (req, res) => {
    const folder = await Folder.findByIdAndDelete(req.params.id).select(['-userId']);
    if (!folder) {
        return res.status(404).send(`The folder with the given id ${req.params.id} does not exist.`);
    }

    await Deck.updateMany({ folderId: req.params.id }, { $unset: { folder: '' } });

    return res.status(200).send(folder);
});

module.exports = router;