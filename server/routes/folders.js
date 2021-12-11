const { Folder, validate } = require('../models/folder');
const { Deck } = require('../models/deck');
const validateObjectIds = require('../middleware/validateObjectIds');
const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    GET - Get all folders
*/
router.get('/', async (req, res) => {
    const folders = await Folder.find().select('-__v').sort('name');
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

    let folder = new Folder(_.pick(req.body, ['name', 'description'])); // make const instead and see if there is no '__v' property
    folder = await folder.save();

    return res.status(200).send(folder);
});

/*
    GET - The decks in the folder with the given id
*/
router.get('/:id', validateObjectIds, async (req, res) => {
    const folder = await Folder.findById(req.params.id);
    if (!folder) {
        return res.status(404).send(`The folder with the given id ${req.params.id} does not exist.`);
    }

    const decks = await Deck.find({ folderId: req.params.id }).select('-__v').sort('name');

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
    
    const folder = await Folder.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'description']), { new: true }).select('-__v');

    if (!folder) {
        return res.status(404).send(`The folder with the given id ${req.params.id} does not exist.`);
    }

    return res.status(200).send(folder);
});

/*
    DELETE - Delete the folder with the given id
*/
router.delete('/:id', [auth, validateObjectIds], async (req, res) => {
    const folder = await Folder.findByIdAndDelete(req.params.id).select('-__v');
    if (!folder) {
        return res.status(404).send(`The folder with the given id ${req.params.id} does not exist.`);
    }

    await Deck.updateMany({ folderId: req.params.id }, { $unset: { folder: '' } });

    return res.status(200).send(folder);
});

module.exports = router;