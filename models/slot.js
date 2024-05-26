
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const slotSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  });



const Slot = model('Slot', slotSchema);

module.exports = Slot;