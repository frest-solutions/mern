const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  date: {type: Date, default: Date.now()},

  title: {type: String, required: true},
  description: {type: String, required: true},
  address: {type: String, required: true},
  price: {type: String, required: true},
  phone: {type: String, required: true},

  photos: [{type: String}],
  isCanCall: {type: Boolean, default: true},
  isCanText: {type: Boolean, default: true},

  owner: {type: Types.ObjectId, ref: 'User'},
  serviceId: {type: Types.ObjectId, ref: 'Service'},
  status: {type: String, default: 'active'}
})

module.exports = model('Task', schema)
