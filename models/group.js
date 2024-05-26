

const mongoose = require('mongoose');
const { Schema, model } = mongoose;


  const groupSchema = new Schema({
    name: { type: String, required: true, unique: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  });
  


const Group = model('Group', groupSchema);

module.exports = Group;