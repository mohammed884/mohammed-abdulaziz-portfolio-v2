import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    project_description: {
        type:String,
        required: true
    },
    socialLink:{
        type:String,
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
});
const PotentialClient = mongoose.models.PotentialClient || new mongoose.model("PotentialClient", Schema);
module.exports = PotentialClient