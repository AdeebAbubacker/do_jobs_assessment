const Group = require('../../models/group.js');
const User = require('../../models/user.js');



const createGroup = async (req, res) => {
  try {
    let groupData = req.body;
    // Check if users array is provided in the request body
    if (groupData.users && Array.isArray(groupData.users)) {
      // Fetch users by IDs from the database
      const users = await User.find({ _id: { $in: groupData.users } });
      // Check if all provided user IDs are valid
      if (users.length !== groupData.users.length) {
        return res.status(400).json({ error: 'One or more user IDs are invalid' });
      }
    }

    // Create a new group with the provided data
    const group = new Group(groupData);
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addUsersToGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const userIds = req.body.userIds; 

    // Validate user IDs
    if (!Array.isArray(userIds)) {
      return res.status(400).json({ error: 'User IDs must be provided as an array' });
    }

    // Fetch users by IDs
    const users = await User.find({ _id: { $in: userIds } });

    // Add users to the group
    group.users.push(...userIds);
    await group.save();

    res.status(200).json({ message: 'Users added to group', users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getUsersFromGroup = async (req, res) => {
  try {
    const { groupId } = req.query;  
    if (groupId) {
      const group = await Group.findById(groupId).populate('users');
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
      return res.status(200).json(group.users);
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
