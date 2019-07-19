const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile:{
    company_name: {type:String},
    country:{type:String},
    city:{type:String},
    address: {type:String},
    industry: {type:String}
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', UserSchema);
