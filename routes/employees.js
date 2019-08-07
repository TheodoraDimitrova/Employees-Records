const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Employee = require('../models/Employee');


// @route GET api/employees
// desc Get all employees
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find({ user: req.user.id }).sort({date: -1});
    res.json(employees);
   

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/employees
// desc Add new employee
// @access Private
router.post('/',
  [
    auth,
    [
      check('name', 'Please enter a name!').not().isEmpty(),
      check('age', 'Please enter age').isNumeric(),
      check('email', 'Please include valid email!').isEmail(),
      check('gender', 'Please include male or female').not().isEmpty(),
      check('contact_number','Please enter a mobile-Phone').isMobilePhone('bg-BG'),
      check('githubusername', 'Please enter github username').not().isEmpty(),
      check('employment_status', 'Please mark Employment Status').not().isEmpty(),
      check('education_qualification', 'Please enter Qualifications').not().isEmpty(),
      check('nationality', 'Please enter nationality').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req); //result from validation
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // do something if hasErrors is true
    }
    const {
      name,
      age,
      email,
      gender,
      contact_number,
      githubusername,
      employment_status,
      education_qualification,
      nationality
    } = req.body;
    try {
      let employee = await Employee.findOne({ email, user: req.user.id });
     
      if (employee) {
        return res
          .status(400)
          .json({ msg: 'You already record employee with such a email' });
      }
     let newEmployee = new Employee({
        user: req.user.id,
        name,
        age,
        email,
        gender,
        contact_number,
        githubusername,
        employment_status,
        education_qualification,
        nationality
      });
      
      employee=await newEmployee.save();
      res.json(employee)

    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route PUT api/employees/:id
// desc Update employee
//@access Private
     
router.put('/:id',auth,async(req, res) => {

  const {
    name,
    age,
    email,
    gender,
    contact_number,
    githubusername,
    employment_status,
    education_qualification,
    nationality
  } = req.body;
  //build employee object
  const employeeObject={}
  if(name) employeeObject.name=name;
  if(email) employeeObject.email=email;
  if(age) employeeObject.age=age;
  if(gender) employeeObject.gender=gender;
  if(contact_number) employeeObject.contact_number=contact_number;
  if(githubusername) employeeObject.githubusername=githubusername;
  if(employment_status) employeeObject.employment_status=employment_status;
  if(education_qualification) employeeObject.education_qualification=education_qualification;
  if(nationality) employeeObject.nationality=nationality;
  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    //make sure user owns employee
    if(employee.user.toString() !==req.user.id){
      return res.status(401).json({msg:'Not authorized'})
    }
    employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: employeeObject },
      { new: true }
    );
    res.json(employee);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/employees/:id
// desc Delete employee
// @access Private
router.delete('/:id',auth,async (req, res) => {
 
  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    //make sure user owns employee
    if(employee.user.toString() !==req.user.id){
      return res.status(401).json({msg:'Not authorized'})
    }
    employee = await Employee.findByIdAndRemove(req.params.id);
    res.json({mgs:'Employee removed'});
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
  
});

module.exports = router;
