const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');

router.get('/', (req, res)=>{
    Users.find({}, (err, foundUsers)=>{
        res.json(foundUsers);
    });
});

router.post('/', (req, res)=>{
    Users.create(req.body, (err, createdUser)=>{
        res.json(createdUser); //.json() will send proper headers in response so client knows it's json coming back
    });
});

router.put('/:id', (req, res)=>{
    Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser)=>{
        res.json(updatedUser);
    });
});

router.delete('/:id', (req, res)=>{
    Users.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
        res.json(deletedUser);
    });
});

module.exports = router;