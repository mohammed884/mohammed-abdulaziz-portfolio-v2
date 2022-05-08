import mongoose from 'mongoose';

const Schema = mongoose.Schema({
    arTitle: {
        type: String,
        maxLength: 250,
        minLength: 3,
        required: true,
    },
    enTitle: {
        type: String,
        maxLength: 250,
        minLength: 3,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    },
    slider: {
        type: Array,
        required: true,
    },
    date: {
        type: {
            published: {
                type: String
            },
            yearOfCreation: {
                type: String
            }
        },
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    client: {
        type: String,
        required: true,
    },
})
const Project = mongoose.models.Project || mongoose.model('Project', Schema)
module.exports = Project