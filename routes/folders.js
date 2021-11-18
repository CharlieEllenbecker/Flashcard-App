const express = require('express');
const router = express.Router();
const Joi = require('joi');

const user = require('./mock-user.json');

let folderCount = 2;    // amount of folders in mock-user.json
const folders = user.data.folders;

/*
    GET - Get all folders
*/
router.get('/', (req, res) => {
    return res.send(folders);
});

/*
    POST - Add a new folder
*/
router.post('/', (req, res) => {
    const { error } = validateFolder(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const folder = {
        id: folderCount + 1,
        name: req.body.name
    };
    folderCount++;

    folders.push(folder);

    return res.send(folder);
});

/*
    GET - The folder with the given id
    This might include some folder data and the decks in the folder
*/
router.get('/:id', (req, res) => {
    const folder = folders.find(f => f.id === parseInt(req.params.id));

    if (!folder) {
        return res.status(404).send(`The folder with the given id ${req.params.id} does not exist`);
    }

    return res.send(folder);
});

/*
    PUT - Update the folder with the given id
*/
router.put('/:id', (req, res) => {
    const folder = folders.find(f => f.id === parseInt(req.params.id));

    if (!folder) {
        return res.status(404).send(`The folder with the given id ${req.params.id} does not exist`);
    }

    const { error } = validateFolder(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    folder.name = req.body.name;

    return res.send(folder);
});

/*
    DELETE - Delete the folder with the given id
    This might delete the folder but not the decks inside that folder
*/
router.delete('/:id', (req, res) => {
    const folder = folders.find(f => f.id === parseInt(req.params.id));

    if (!folder) {
        return res.status(404).send(`The folder with the given id ${req.params.id} does not exist`);
    }

    const index = folders.indexOf(folder);
    folders.splice(index, 1);

    return res.send(folder);
});

function validateFolder(folder) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(25).required()
    });

    return schema.validate(folder);
}

module.exports = router;