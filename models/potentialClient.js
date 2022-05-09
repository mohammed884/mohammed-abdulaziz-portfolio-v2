import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    project_description: {
        type: String,
        required: true
    },
    socialLink: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    analysis_date: {
        type: String,
        required: true,
    },
    sendMessage: {
        type: Boolean,
        default: false,
    },
    deal:{
        type:Boolean,
        default: false,
    }
});
const PotentialClient = mongoose.models.PotentialClient || new mongoose.model("PotentialClient", Schema);
module.exports = PotentialClient