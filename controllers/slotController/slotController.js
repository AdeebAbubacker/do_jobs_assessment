
const Slot = require('../../models/slot.js');


const createSlot = async (req, res) => {
  try {
    const slot = new Slot(req.body);
    await slot.save();
    res.status(201).json(slot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSlots = async (req, res) => {
  try {
    const slots = await Slot.find().populate('users'); 
    res.status(200).json(slots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createSlot,
  getSlots

};

