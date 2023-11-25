const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function register(req, res) {
  try {
    const saltRounds = 10;
    const { name, email, age, password } = req.body;
    console.log('Received data:', { name, email, age, password });
    if (!name || !email || !age || !password) {
      return res.status(400).json({ message: 'Name, email, age, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email id already exists' });
    }

    const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = new User({ name, email, age, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function login(req, res) {
  try {
    
    const user = await User.findOne({ email_1: req.body.email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const validated = await bcrypt.compare(req.body.password, user.password);

    if (!validated) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
module.exports = { register, login };