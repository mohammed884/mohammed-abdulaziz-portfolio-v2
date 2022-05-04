import Joi from "joi"
const Schema = Joi.object({
    name:Joi.string().min(3).max(40).required(),
    email:Joi.string().email().required(),
    socialLink:Joi.string().required(),
    description:Joi.string().min(20).max(400).required(),
})
module.exports = Schema