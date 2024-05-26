const Group = require('../../models/group.js');
const User = require('../../models/user.js');



const createGroup = async (req, res) => {
  try {
    let groupData = req.body;
    if (groupData.users && Array.isArray(groupData.users)) {
      const users = await User.find({ _id: { $in: groupData.users } });
      if (users.length !== groupData.users.length) {
        return res.status(400).json({ error: 'One or more user IDs are invalid' });
      }
    }


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

    const usersToAdd = req.body.users; 

  
    if (!Array.isArray(usersToAdd) || usersToAdd.length === 0) {
      return res.status(400).json({ error: 'Users must be provided as a non-empty array' });
    }

    
    const existingUsers = await User.find({ email: { $in: usersToAdd.map(user => user.email) } });


    group.users.push(...existingUsers.map(user => user._id));
    await group.save();

    res.status(200).json({ message: 'Users added to group', users: existingUsers });
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
