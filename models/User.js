const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  created: {type: Date, default: Date.now()},
  dateOfBirth: {type: Date},
  name: {type: String},
  surname: {type: String},
  phone: {type: String},
  imgUrl: {type: String, default: 'avatar.png'},
  lastSeen: {type: Date},
  paidUntil: {type: Date},

  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: true, ref: 'Role'},
  tasks: [{type: Types.ObjectId, ref: 'Task'}],
  messages: [{type: Types.ObjectId, ref: 'Chat'}]
})

module.exports = model('User', schema)
