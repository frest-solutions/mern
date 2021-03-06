const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  date: {type: Date, default: Date.now()},
  message: {type: String, required: true},
  username: {type: String},
  sender: {type: Types.ObjectId, ref: 'User'},
  to: {type: Types.ObjectId, ref: 'User'},
  status: {type: String, required: true},
})

module.exports = model('Chat', schema)
