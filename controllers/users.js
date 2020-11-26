const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const cors = require('cors');

// router.get('/', (req, res)=>{
//     Users.find({}, (err, foundUsers)=>{
//         res.json(foundUsers);
//     });
// });

// router.post('/', (req, res)=>{
//     Users.create(req.body, (err, createdUser)=>{
//         res.json(createdUser); //.json() will send proper headers in response so client knows it's json coming back
//     });
// });

// router.put('/:id', (req, res)=>{
//     Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser)=>{
//         res.json(updatedUser);
//     });
// });

// router.delete('/:id', (req, res)=>{
//     Users.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
//         res.json(deletedUser);
//     });
// });

router.post("/register", async (req, res) => {
    try {
        let { email, password, passwordCheck, displayName } = req.body;

        //validate
        if (!email || !password || !passwordCheck)
            return res.status(400).json({msg: "Missing Required Information"});

        if (password.length < 6)
            return res.status(400).json({msg: "Password must be at leat 6 characters long."});

        if (password !== passwordCheck)
            return res.status(400).json({msg: "Password must match."});

        const existingUser = await User.findOne({email: email})
        if (existingUser)
            return res.status(400).json({msg: "An account with that email already exists"})

        if (!displayName) displayName = email;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            password: passwordHash,
            displayName
        });

        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (err) {
        res.status(500).json({error: err.message})
    }

})

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body
        //validate
        if (!email || !password)
            return res.status(400).json({ msg: "Not ass fields have been entered."})

        const user = await User.findOne({email: email})
        if (!user)
            return res.status(400).json({ msg: "No account with that email has been registered."})

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid Credentials."})
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email
            }
        })

    } catch (err) {
        res.status(500).json({error: err.message})
    }

})

router.delete("/delete", auth, async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.user)
        res.json(deleteUser);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.post("/tokenIsValid", async ( req, res ) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false)

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified) return res.json(false)

        const user = await User.findById(verified.id)
        if (!user) return res.json(false)

        return res.json(true)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req, user)
    res.json(user)
})



module.exports = router;