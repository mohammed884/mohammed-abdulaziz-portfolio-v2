import mongoose from 'mongoose';

const Schema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 250,
        minLength: 3,
        required: true,
    },
    description: {
        type: String,
        maxLength: 400,
        minLength: 15,
        required: true,
    },
    stars: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    cover: {
        type: String,
        default: "default.png"
    },
    projectLink: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
    analysis_date: {
        type:String,
        required:true,
    },
});
const Review = mongoose.models.Review || mongoose.model('Review', Schema);
module.exports = Review;