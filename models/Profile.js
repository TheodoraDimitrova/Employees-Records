const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    company_name: {type:String,required:true},
    country:{type:String},
    city:{type:String},
    address: {type:String},
    industry: {type:String}
  
});

module.exports = mongoose.model('profile', ProfileSchema);
