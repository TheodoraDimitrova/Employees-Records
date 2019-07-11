const express = require('express');
const router = express.Router();

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', (req, res) => res.json({ msg: 'Profile of the current user' }));

// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post('/', (req, res) => res.json({ msg: 'Create profile' }));

// @route   PUT api/profile
// @desc    Edit user profile
// @access  Private
router.put('/', (req, res) => res.json({ msg: 'Edit profile' }));

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', (req, res) => ({ msg: 'Delete profile' }));

module.exports = router;
