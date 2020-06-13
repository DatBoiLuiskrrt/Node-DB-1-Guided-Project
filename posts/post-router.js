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
    db('posts')
    // .where( "id", "=", req.params.id)
    .where( { id: req.params.id })
    .first()// grabs first elemento of the array 
    .then( post => {
        if(post) {
        res.status(201).json( { data: post });
        } else {
            res.status(404).json( { message: "nothing found"});
        }
    })
    .catch( error => {
        res.status(500).json( { message: error });
    });

});

router.post('/', (req, res) => {
    db('posts')
    .insert(req.body, 'id')
    .then(ids => {
        res.status(201).json( { results: ids });
    })
    .catch( error => {
        res.status(500).json( { message: "error"});
    });
});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {
    db('posts')
    .where( { id: req.params.id }) // remember to use where
    .del() //deletes the records
    .then( count => {
        if(count >= 1){
        res.status(200).json( { message: "Record deleted succesfully"})
    }else{
        res.status(500).json( { message: "post not found"});
    }});
});

module.exports = router;