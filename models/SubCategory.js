const {Schema, model, Types} = require('mongoose')

const schema = new Schema({

  title: {type: String, required: true},
  services: [{type: Types.ObjectId, ref: 'Service'}],
  categoryId: {type: Types.ObjectId, ref: 'Category'},

})

module.exports = model('SubCategory', schema)
