import mongoose from 'mongoose';

const Schema = mongoose.Schema({
    name:{
        type: String,
        maxLength:250,
        minLength:3,
        required: true,
    },
    stars:{
        type:Number,
        min:1,
        max:5,
        required: true,
    },
    image:{
        type: String,
        default:"default.jpg"
    },
})
const Work = mongoose.models.Work || mongoose.model('Work', Schema)
module.exports = Work