const express = require('express');
const router = express.Router();
const Orders = require('../models/orders.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const cors = require('cors');

router.get("/orders", auth, async (req, res) => {
    Orders.find();
})

router.post("/orders", auth, async (req, res) => {
    
    try { 
        const newOrder = new Order({
            orderer_name,
            order_email,
            product_amount,
            street_address,
            city,
            state_region,
            country

        });

        const savedOrder = await newOrder.save();
        res.json(savedOrder);

    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.put("/orders", auth, async (req, res) => {

})

router.delete("/orders", auth, async (req, res) => {

})




module.exports = router;