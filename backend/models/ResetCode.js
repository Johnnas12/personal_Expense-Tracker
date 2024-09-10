const mongoose = require('mongoose');

const resetCodeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

const ResetCode = mongoose.model('ResetCode', resetCodeSchema);

module.exports = ResetCode;
