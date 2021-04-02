const {Schema, model, Types} = require('mongoose')

const schema = new Schema({

  title: {type: String, required: true},
  text: {type: String, required: true},
  subCategories: [{type: Types.ObjectId, ref: 'SubCategory'}]

})

module.exports = model('Category', schema)
