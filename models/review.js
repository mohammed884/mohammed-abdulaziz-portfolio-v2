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
        type: { url: { type: String }, publicId: { type: String } },
        default: { url: "https://res.cloudinary.com/dhbkgb3ss/image/upload/v1654283968/uploads/default_q3xlly.png", publicId: "default" }
    },
    projectLink: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
    analysis_date: {
        type: String,
        required: true,
    },
});
const Review = mongoose.models.Review || mongoose.model('Review', Schema);
module.exports = Review;