const Slot = require('../../models/slot.js');

const createSlot = async (req, res) => {
  try {
    const { startTime, endTime, users } = req.body;
    const start = new Date(startTime);
    const end = new Date(endTime);
    const overlappingSlots = await Slot.aggregate([
      {
        $match: {
          users: { $in: users },
          $or: [
            { startTime: { $lt: end }, endTime: { $gt: start } },
            { startTime: { $lt: end }, endTime: null },
            { startTime: { $eq: start } }
          ]
        }
      },
      { $count: "count" }
    ]);
    if (overlappingSlots.length > 0 && overlappingSlots[0].count > 0) {
      return res.status(400).json({ error: 'Slot conflict detected for one or more users' });
    }
    const slot = new Slot(req.body);
    await slot.save();
    res.status(201).json(slot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSlots = async (req, res) => {
  try {
    const slots = await Slot.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: '_id',
          as: 'users'
        }
      }
    ]);
    res.status(200).json(slots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createSlot,
  getSlots

};

