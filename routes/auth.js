const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

// @route POST api/auth
// desc login user
// @access Public
router.post('/',
  [
    check('email', 'Please include valid email!').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req); //result from validation
    if (!errors.isEmpty()) {
      //has errors
      return res.status(400).json({ errors: errors.array() }); // do something if hasErrors is true
    }
    //hash password and return jsonwebtoken
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({msg:'Invalid email'});
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid password' });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/auth
// desc   Get login user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
  
    const user = await User.findById(req.user.id).select('-password');//current login user id 
    res.send(user)
 
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
