const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: true,},
  tasks: [{type: Types.ObjectId, ref: 'Task'}],
  name: {type: String},
  surname: {type: String},
  phone: {type: String},
})

module.exports = model('User', schema)
