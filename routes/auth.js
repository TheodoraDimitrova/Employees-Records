const express = require('express');
const router = express.Router();

//@route GET api/auth
// desc Get login user
//@access Private
router.get('/', (req, res) => {
  res.send('Get login user');
});

//@route POST api/auth
// desc Auth user and get token
//@access Public
router.post('/', (req, res) => {
  res.send('Login user');
});

// @route   GET api/auth/current
// @desc    Return current user
// @access  Private
router.get('/current', (req, res) => {
  res.send('Current user');
});

module.exports = router;
