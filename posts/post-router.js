const express = require('express');
// install knex, sqlite3
// database access using knex
const db = require('../data/db-config.js');//connection to the DB

const router = express.Router();

router.get('/', (req, res) => {
    //get the data from the database
    //send it back
    db.select('*').from('posts') // returns a promise
    .then( rows => {
        res.status(200).json( { data: rows });
    })
    .catch(error => {
        res.status(500).json( { message: 'Sorry, ran into an error'});
    }); 
});

router.get('/:id', (req, res) => {

});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;