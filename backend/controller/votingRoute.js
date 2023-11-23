const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require("express");
const userSchema = require('../model/userSchema');
const votingRoute = express.Router();

votingRoute.post('/vote', async (req, res) => {
  const { candidate } = req.body;
  const voterId = userSchema._id; 

  try {
    // Check if the voter has already voted
    const existingVote = await Vote.findOne({ voterId });
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted.' });
    }

    // Check if the candidate exists
    const candidateExists = await Student.findOne({ rollNumber: candidate });
    if (!candidateExists) {
      return res.status(404).json({ message: 'Candidate not found.' });
    }

    // Create a new vote
    const newVote = new Vote({
      voterId,
      options,
      castedAt
    });

    // Save the vote to the database
    await newVote.save();

    res.status(201).json({ message: 'Vote cast successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to cast vote.' });
  }
});

module.exports = votingRoute;