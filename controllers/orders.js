const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const cors = require('cors');

router.get("/orders", auth, async (req, res) => {

})





module.exports = router;