const User = require('../../models/user.js');

const createUser = async (req, res) => {
  try {
    const existingUser = await User.aggregate([
      { $match: { email: req.body.email } },
      { $limit: 1 }
    ]);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createUser, getAllUsers
};

