const express = require('express');
const router = express.Router();
const config = require('config');
const {
    check,
    validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/authentication');

const User = require('../../models/User');
const SECRET = config.get('secret');

/**
 * @route   GET /api/auth
 * @desc    User authentication. Uses custom login middleware
 *          reqired in ../../middleware/authentication
 * @access  Public
 */
router.get('/', auth, async(req, res) => {
    try {
        let user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (e) {
        console.error(e.message);
        res.send(e);
    }
});

/**
 * @route   POST /api/auth
 * @desc    Authenticate and retrieve json web tokenon
 * @access  Public
 */
router.post(
    '/', [
        check('username', 'Username is required').exists(),
        check('password', 'Password is required').exists()
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                req: req.body
            });
        }

        const {
            username,
            password
        } = req.body;

        try {
            let user = await User.findOne({
                username
            });
            if (!user) {
                return res
                    .status(401)
                    .json({
                        errors: [{
                            msg: 'Invalid credentials'
                        }]
                    })
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res
                    .status(401)
                    .json({
                        errors: [{ msg: 'Invalid credentials' }]
                    });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, SECRET, {
                expiresIn: 3600
            }, (err, token) => {
                if (err) {
                    throw err;
                }
                res.json({
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