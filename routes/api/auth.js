const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const {
    check,
    validationResult
} = require('express-validator');
// auth is a middleware
const auth = require('../../middleware/auth');

const User = require('../../models/User');
// @route    GET api/auth
// @desc     Test route
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/auth
// @desc     Authenticate User & get Token
// @access   Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        email,
        password
    } = req.body;

    try {
        // See if user exists

        let user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid credentials'
                }]
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid credentials'
                }]
            });
        }

        // Return the jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload,
            config.get('jwtSecret'), {
                expiresIn: 360000 // Optional but recommended
            }, (err, token) => {
                if (err) throw err;
                res.json({
                    token
                });
            });

        // res.send('User registered!');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error..!');
    }
});

module.exports = router;