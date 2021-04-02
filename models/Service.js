const {Schema, model, Types} = require('mongoose')

const schema = new Schema({

  title: {type: String, required: true},
  tasks: [{type: Types.ObjectId, ref: 'Tasks'}],
  subCategoryId: {type: Types.ObjectId, ref: 'SubCategory'},

})

module.exports = model('Service', schema)
