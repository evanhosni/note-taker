const notes = require('express').Router()
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

const db = require('../db/db.json')

notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
    .then(data => res.json(JSON.parse(data)))
})

notes.get('/:id', (req, res) => {
    for (let i = 0; i < db.length; i++) {
        if (db[i].id == req.params.id) {
            return res.json(db[i])
        }
    }
    res.status(404).send("no note found")
})

notes.post('/', (req, res) => {
    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid()
        }

        readAndAppend(newNote, './db/db.json')
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
})

notes.delete('/:id', (req, res) => {
    let id = req.params.id;
    const filtered = db.filter(note => note.id !== id)
    writeToFile('./db/db.json', filtered)
    readFromFile('./db/db.json')
    .then(data => res.json(JSON.parse(data)))
})

module.exports = notes;