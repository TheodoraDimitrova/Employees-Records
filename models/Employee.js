const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  name: { type: String, required: true },
  age: { type: Number, min: 18, max: 65, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Male', 'Female'] },
  nationality: { type: String, required: true },
  education_qualification: { type: String, required: true },
  date: { type: Date, default: Date.now },
  contact_number: { type: String, required: true },
  githubusername: { type: String, required: true },
  employment_status: { type: String, enum: ['Active', 'Inactive'] }
});

module.exports = mongoose.model('employee', EmployeeSchema);
