const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  value: {type: String, default: 'CLIENT'}
})

module.exports = model('Role', schema)
