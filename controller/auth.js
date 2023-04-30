const express = require('express')
const router = new express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const SECERET_KEY = process.env.SECRET_KEY


router.post('/signup', async (req, res) => {

    try {
        const { email, userName, password } = req.body;
        let adminExists = await User.findOne({ email: email })
        if (adminExists) {
            return res.json({
                msg: "error",
                error: "Admin with this email already exists!"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new User({ email, password: hashedPassword, userName });
        await user.save();
        const token = jwt.sign({ userId: user._id }, 'NOTESAPT');
        return res.json({
            msg: "success",
            data: user
        })

        // if (adminExists) {
        //     return res.json({
        //         msg: "error",
        //         error: "Admin with this email already exists!"
        //     })
        // }
        // let admin = await Models.Admins.create(req.body)
        // return res.json({
        //     msg: "success",
        //     data: admin
        // })

    } catch (error) {
        return res.json({
            message: 'Error',
            error: error.message
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password');
        }
        const token = jwt.sign({ userId: user._id }, 'NOTESAPT');
        return res.json({
            msg: "success",
            data: user
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});



module.exports = router