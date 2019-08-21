const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },

  name: { type: String, required: true },
  email: { type: String ,unique: false},
  davis_email: { type: String },
  contact_number: { type: String },
  DateOfBirth: { type: String },
  drivingLicenceNo: { type: String },
  employment_status: { type: String, enum: ['Active', 'Inactive'] },
  application_status: { type: String, enum: ['Complete', 'Incomplete'] },
  gender: { type: String, enum: ['Male', 'Female'] },
  dl_status: { type: String, enum: ['EU', 'UK'] },
  driver_app: { type: String, enum: ['Yes', 'No'] },
  dbs_certificate: { type: String, enum: ['Yes', 'No'] },
  nationality: { type: String },
  address_1: { type: String },
  town: { type: String },
  niNo: { type: String },
  postcode: { type: String },
  reg_number: { type: String },
  fd_number: { type: String },
  utr: { type: String },
  utr_id: { type: String },
  utr_code: { type: String },
  passport: { type: String ,enum: ['Yes', 'No']},
  Id: { type: String ,enum: ['Yes', 'No']},
  dvla: { type: String ,enum: ['Yes', 'No']},

  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('employee', EmployeeSchema);
