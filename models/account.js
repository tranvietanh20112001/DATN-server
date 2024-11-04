const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, required: true },
  full_name: { type: String},
  description: { type: String},
  phone_number: {type: String},
  image:{
    type: String,
}, 
campus:{type: String},
faculty:{type: String}
});

accountSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Account = mongoose.model('accounts', accountSchema);
module.exports = Account;
