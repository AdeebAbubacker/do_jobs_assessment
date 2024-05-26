const Group = require('../../models/group.js');
const User = require('../../models/user.js');
const mongoose = require('mongoose');


const createGroup = async (req, res) => {
  try {
    let groupData = req.body;
    if (groupData.users && Array.isArray(groupData.users)) {
      const userAggregation = await User.aggregate([
        { $match: { _id: { $in: groupData.users.map(userId => new mongoose.Types.ObjectId(userId)) } } },
        { $group: { _id: null, count: { $sum: 1 } } }
      ]);
      
      if (userAggregation.length === 0 || userAggregation[0].count !== groupData.users.length) {
        return res.status(400).json({ error: 'One or more user IDs are invalid' });
      }
    }

    const group = new Group(groupData);
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    if (error.keyPattern && error.keyPattern.name) {
      return res.status(400).json({ error: 'Group already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const addUsersToGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    const usersToAdd = req.body.users; 
    if (!Array.isArray(usersToAdd) || usersToAdd.length === 0) {
      return res.status(400).json({ error: 'Users must be provided as a non-empty array' });
    }

    const existingUsersAggregation = await User.aggregate([
      { $match: { email: { $in: usersToAdd.map(user => user.email) } } },
      { $project: { _id: 1 } }
    ]);

    const existingUserIds = existingUsersAggregation.map(user => user._id);
    group.users.push(...existingUserIds);
    await group.save();

    if (existingUsersAggregation.length !== usersToAdd.length) {
      return res.status(400).json({ error: 'One or more users do not exist' });
    }

    res.status(200).json({ message: 'Users added to group', users: existingUsersAggregation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsersFromGroup = async (req, res) => {
  try {
    const { groupId } = req.query;
    if (groupId) {
      const groupAggregation = await Group.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(groupId) } },
        { $lookup: {
            from: 'users',
            localField: 'users',
            foreignField: '_id',
            as: 'users'
          }
        },
        { $project: { _id: 0, users: 1 } }
      ]);

      if (groupAggregation.length === 0) {
        return res.status(404).json({ error: 'Group not found' });
      }

      return res.status(200).json(groupAggregation[0].users);
    } else {
      const users = await User.find();
      return res.status(200).json(users);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createGroup,
  addUsersToGroup,
  getUsersFromGroup
};
