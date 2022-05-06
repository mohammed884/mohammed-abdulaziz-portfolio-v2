import Joi from "joi"
const Schema = Joi.object({
    name:Joi.string().min(3).max(40).required(),
    description:Joi.string().min(20).max(400).required(),
    stars:Joi.number().min(1).max(5).required(),
    mimetype:Joi.string().valid("image/png", "image/jpg", "image/jpeg"),
})
module.exports = Schema