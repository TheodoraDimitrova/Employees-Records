const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('config');
const keys=require('../config/keys')
const User = require('../models/User');

// @route POST api/users
// desc Register a user
// @access Public
router.post(
  '/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check( 'password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req); //result from validation

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // do something if hasErrors is true
    }
    //hash password and return jsonwebtoken
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        //exist
        return res.status(400).json({ msg: 'E-mail already in use' });
      }
      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt); //hash password

      await user.save(); //save user

      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 3600 },
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

module.exports = router;
