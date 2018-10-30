const mongoose = require('mongoose')

let personSchema = new mongoose.Schema({
    // 建表
    name: String,
    age: Number
})

module.exports = mongoose.model('Person', personSchema)