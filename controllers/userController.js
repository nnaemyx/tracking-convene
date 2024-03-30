const User = require("../models/userModel");

const UserController = {
  signup: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      // Check if user with the same email already exists
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Create a new user
      const newUser = new User({
        username,
        email,
        password, // Note: In a real-world application, you should hash the password before saving it to the database
      });

      // Save the user to the database
      await newUser.save();

      // Respond with success message
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      // Handle any errors
      console.error('Error signing up user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Validate password
      const isValidPassword = (password === user.password); // Note: In a real-world application, you should use bcrypt to compare hashed passwords
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Check user role
      if (user.role === 'admin') {
        return res.status(200).json({ message: 'Login successful', isAdmin: true });
      }
  
      // Respond with success message or user data
      res.status(200).json({ message: 'Login successful', isAdmin: false });
    } catch (error) {
      // Handle any errors
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  

};

module.exports = UserController;
