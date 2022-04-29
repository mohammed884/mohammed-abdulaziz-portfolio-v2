import mongoose from 'mongoose';

const Schema = mongoose.Schema({
    name:{
        type: String,
        maxLength:250,
        minLength:3,
        required: true,
    },
    description:{
        type:String,
        maxLength:400,
        minLength:20,
        required: true,
    },
    stars:{
        type:Number,
        min:1,
        max:5,
        required: true,
    },
    cover:{
        type: String,
        default:"default.png"
    },
    link:{
        type:String,
    }
});
const Review = mongoose.models.Review || mongoose.model('Review', Schema);
module.exports = Review;