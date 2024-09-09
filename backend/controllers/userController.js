const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')


// controller method for registering new users
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
  
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      const savedUser = await user.save();
  
  
      res.status(201).json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

   // Controller for Log in the user
   const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // generate token
      // const token = jwt.sign({ id: user._id  },process.env.JWT_SECRET , {
      //   expiresIn: '1h',
      // });
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // create session
      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
  
      res.status(200).json({ 
        message: 'Login successful', 
        id : user._id,
        name: user.name ,
        email: user.email, 
        token
       });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  // controller to logout from the system
  const logoutUser = (req, res) => {
    // destroying the session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      res.status(200).json({ 
        message: 'Logout successful'
       });
    });
  };
 
module.exports = {registerUser, loginUser, logoutUser}