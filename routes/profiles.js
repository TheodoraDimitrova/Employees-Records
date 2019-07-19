const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Profile = require('../models/Profile');


// @route GET api/profile
// desc get profile of user
// @access Private
router.get('/', auth, async (req, res) => {
    try {
      const profile = await Profile.find({ user: req.user.id });
      res.json(profile);
  
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post('/',auth, [
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
router.put('/', auth, async (req, res) => {
  const { company_name, country, city, address, industry } = req.body;
  const profileNew={}
  if(company_name) profileNew.company_name=company_name;
  if(country) profileNew.country=country;
  if(city) profileNew.city=city;
  if(address) profileNew.address=address;
  if(industry) profileNew.industry=industry;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
   
    if (!profile) {
      return res.status(404).json({ msg: 'You don\'t have a profile yet ' });
    }
    //make sure user owns employee
    if(profile.user.toString() !== req.user.id){
      return res.status(401).json({msg:'Not authorized'})
    }
    profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
      { $set: profileNew },
      { new: true }
    );
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/',auth,
    async (req, res) => {
        try {
            let profile = await Profile.findOne({user:req.user.id});
            console.log(profile)
            if (!profile) {
              return res.status(404).json({ msg: 'Employee not found' });
            }
            //make sure user owns employee
            if(profile.user.toString() !==req.user.id){
              return res.status(401).json({msg:'Not authorized'})
            }
            profile = await Profile.findOneAndRemove({user:req.user.id});
            res.json({mgs:'Profile  removed'});
          } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
          }
    }
  );
module.exports = router;