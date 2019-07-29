const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth =require('../middleware/auth')
const User = require('../models/User');


// @route POST api/users
// desc Register a user
// @access Public
router.post('/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req); //result from validation
    console.log(req.body)
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
      console.log(user)
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt); //hash password
    
      await user.save(); //save user

      const payload = {
        user: {
          id:user.id
        }
      };
      jwt.sign(payload,config.get('jwtSecret'),{expiresIn: 3600},
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

// @route   POST api/users/profile
// @desc    Create user profile
// @access  Private
router.post('/',auth,
  [
    check('company_name', 'Please enter the name of your company!').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req); //result from validation
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // do something if hasErrors is true
    }
    const {company_name}=req.body;
    try {
       let profile = new Profile({
            user: req.user.id,
            company_name
          
          });
          await profile.save();
          res.json(profile)
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/users/profile
// @desc    Edit user profile
// @access  Private
router.put('/:id', (req, res) => res.json({ msg: 'Edit profile' }));

// @route   DELETE api/users/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', (req, res) => ({ msg: 'Delete profile' }));

module.exports = router;
