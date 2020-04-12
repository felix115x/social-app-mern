const express = require('express');
const router = express.Router();
const config = require('config');
const {
    check,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const SECRET = config.get('secret');

/**
 * @route POST api/users
 * @desc Register a new user
 * @access Public
 */
router.post(
    '/',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password is required to be 8 symbols').isLength({
            min: 8
        }),
        check('email', 'Incorrect email format').isEmail()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        let {
            username,
            password,
            email,
            avatar,
            firstname,
            lastname
        } = req.body;

        try {
            let user = await User.findOne({
                username
            });
            if (user) {
                return res.status(400).json({
                    msg: 'User already exists'
                });
            }

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            // TODO: Create default avatar

            user = new User({
                username,
                password,
                email,
                avatar,
                firstname,
                lastname
            });

            await user.save(); // new user created and saved into database

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, SECRET, {
                expiresIn: 3600
            }, (err, token) => {
                if (err) throw err;
                res.json({  // if no errors, json web token is returned
                    token
                });
            });
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
