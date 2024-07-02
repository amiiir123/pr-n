const mongoose = require("mongoose")


const schemas = new mongoose.Schema({
    title :{
        type: String,
        required : true
    },
    price :{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('test-v1',schemas);