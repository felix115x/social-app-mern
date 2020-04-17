const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authentication');

const Profile = require('../../models/Profile');

/**
 * @route   GET api/profile
 * @desc    Gets all profiles.
 *          TODO: Pagination, when delaing with front-end
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        let profiles = await Profile
            .find()
            .populate('user', ['firstname', 'lastname', 'avatar']);
        return res.json(profiles);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ msg: 'Server error '});
    }
});

module.exports = router;
