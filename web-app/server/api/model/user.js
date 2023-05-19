const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
    type: String,
    required: true
   },
    role: {
    type: String,
    required:true
   }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;