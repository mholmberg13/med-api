const express = require('express');
const router = express.Router();
const Printers = require('../models/printers.js');

router.get('/', (req, res)=>{
    Printers.find({}, (err, foundPrinters)=>{
        res.json(foundPrinters);
    });
});

router.post('/', (req, res)=>{
    Printers.create(req.body, (err, createdPrinter)=>{
        res.json(createdPrinter); //.json() will send proper headers in response so client knows it's json coming back
    });
});

router.put('/:id', (req, res)=>{
    Printers.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPrinter)=>{
        res.json(updatedPrinter);
    });
});

router.delete('/:id', (req, res)=>{
    Printers.findByIdAndRemove(req.params.id, (err, deletedPrinter)=>{
        res.json(deletedPrinter);
    });
});

module.exports = router;