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
    const employees = await Employee.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(employees);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/employees
// desc Add new employee
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Please enter a name!')
        .not()
        .isEmpty()
      //check('email', 'Please include valid email!').isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req); //result from validation
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // do something if hasErrors is true
    }
    const {
      name,
      DateOfBirth,
      email,
      davis_email,
      gender,
      drivingLicenceNo,
      contact_number,
      reg_number,
      employment_status,
      dl_status,
      address_2,
      address_1,
      nationality,
      fd_number,
      postcode,
      dbs_certificate,
      driver_app,
      town,
      niNo,
      application_status,
      utr,
      utr_id,
      utr_code,
      passport,
      Id,
      dvla
    } = req.body;

    try {
      // let employee = await Employee.findOne({ email, user: req.user.id });

      // if (employee) {
      //   return res
      //     .status(400)
      //     .json({ msg: 'You already record employee with such a email' });
      // }
      let newEmployee = new Employee({
        user: req.user.id,
        name,
        DateOfBirth,
        email,
        davis_email,
        gender,
        drivingLicenceNo,
        contact_number,
        reg_number,
        employment_status,
        dl_status,
        address_2,
        address_1,
        nationality,
        fd_number,
        postcode,
        town,
        dbs_certificate,
        driver_app,
        niNo,
        application_status,
        utr,
        utr_id,
        utr_code,
        passport,
        Id,
        dvla
      });

      let employee = await newEmployee.save();
      res.json(employee);
    } catch (err) {
      
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route PUT api/employees/:id
// desc Update employee
//@access Private

router.put('/:id', auth, async (req, res) => {
  const {
    name,
    DateOfBirth,
    email,
    davis_email,
    gender,
    contact_number,
    employment_status,
    driver_app,
    dbs_certificate,
    drivingLicenceNo,
    dl_status,
    address_1,
    town,
    postcode,
    application_status,
    niNo,
    reg_number,
    fd_number,
    utr,
    utr_id,
    utr_code,
    nationality,
    passport,
    Id,
    dvla
  } = req.body;

  //build employee object
  const employeeObject = {};
  if (name) employeeObject.name = name;
  if (email) employeeObject.email = email;
  if (davis_email) employeeObject.davis_email = davis_email;
  if (DateOfBirth) employeeObject.DateOfBirth = DateOfBirth;
  if (gender) employeeObject.gender = gender;
  if (contact_number) employeeObject.contact_number = contact_number;
  if (employment_status) employeeObject.employment_status = employment_status;
  if (driver_app) employeeObject.driver_app = driver_app;
  if (dbs_certificate) employeeObject.dbs_certificate = dbs_certificate;
  if (drivingLicenceNo) employeeObject.drivingLicenceNo = drivingLicenceNo;
  if (dl_status) employeeObject.dl_status = dl_status;
  if (address_1) employeeObject.address_1 = address_1;
  if (town) employeeObject.town = town;
  if (postcode) employeeObject.postcode = postcode;
  if (application_status)employeeObject.application_status = application_status;
  if (niNo) employeeObject.niNo = niNo;
  if (reg_number) employeeObject.reg_number = reg_number;
  if (fd_number) employeeObject.fd_number = fd_number;
  if (nationality) employeeObject.nationality = nationality;
  if (utr) employeeObject.utr = utr;
  if (utr_id) employeeObject.utr_id = utr_id;
  if (utr_code) employeeObject.utr_code = utr_code;
  if (passport) employeeObject.passport = passport;
  if (Id) employeeObject.Id = Id;
  if (dvla) employeeObject.dvla = dvla;
  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    //make sure user owns employee
    if (employee.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
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
router.delete('/:id', auth, async (req, res) => {
  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    //make sure user owns employee
    if (employee.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    employee = await Employee.findByIdAndRemove(req.params.id);
    res.json({ mgs: 'Employee removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
