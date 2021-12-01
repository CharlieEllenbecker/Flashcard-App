const { Folder, validate } = require('../models/folder');
const validateObjectIds = require('../middleware/validateObjectIds');
const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
const { Mongoose } = require('mongoose');
require('express-async-errors');
const router = express.Router();

/*
    GET - Get all folders
*/
router.get('/', async (req, res) => {
    const folders = await Folder.find().sort('name');
    return res.send(folders);
});

/*
    POST - Add a new folder
*/
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let folder = new Folder(_.pick(req.body, ['name', 'description']));
    folder = await folder.save();

    return res.send(folder);
});

/*
    GET - The folder with the given id
*/
router.get('/:id', validateObjectIds, async (req, res) => {
    const folder = await Folder.findById(req.params.id);
    if (!folder) {
        return res.status(404).send(`The folder with the given id ${req.params.id} does not exist.`);
    }

    return res.send(folder);
});

/*
    PUT - Update the folder with the given id
*/
router.put('/:id', [auth, validateObjectIds], async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    const folder = await Folder.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'description']), { new: true });

    if (!folder) {
        return res.status(404).send(`The folder with the given id ${req.params.id} does not exist.`);
    }

    return res.send(folder);
});

/*
    DELETE - Delete the folder with the given id
*/
router.delete('/:id', [auth, validateObjectIds], async (req, res) => {
    const folder = await Folder.findByIdAndDelete(req.params.id);
    if (!folder) {
        return res.status(404).send(`The folder with the given id ${req.params.id} does not exist.`);
    }

    return res.send(folder);
});

module.exports = router;