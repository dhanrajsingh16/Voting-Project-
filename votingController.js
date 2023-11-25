
const Vote = require('../models/Vote');
const User = require('../models/User');

async function castVote(req, res) {
  try {
    const { candidate } = req.body;
    const userId = req.user.email;

    const existingVote = await Vote.findOne({ voterId: email });
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted' });
    }
    
    // Save the vote in the database
    const newVote = new Vote({ candidate, voterId: email });
    await newVote.save();

    // Redirect to the thank you page after successful vote casting
    res.status(201).redirect('/thank-you'); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { castVote };
