const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
    id:{type: String,required:true},
    link:{type: String,required:true},
    title:{type: String,required:true},
    singer:{type: String,required:true},
    service:{type: String,required:true},
    descripcion:{type: String,required:false},
    thumbnail:{type: String,required:true}

})


module.exports = songSchema;