const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  candidate: { type: String, required: true },
  voterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
