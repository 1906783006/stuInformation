const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema

var stuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
  },
  age: {
    type: String
  },
  hobbies: {
    type: String
  }
})

module.exports = mongoose.model('Student', stuSchema)

/* var xx = new Student({
  name: '小花',
  gender: 0
})

xx.save(function(err,ret) {
  if(err) {
    console.log(存储失败);
    
  } else {
    console.log(ret);
    
  }
}) */