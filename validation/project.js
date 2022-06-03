import Joi from "joi";
const Schema = Joi.object({
    arTitle: Joi.string().required(),
    enTitle: Joi.string().required(),
    // slider: Joi.array().required(),
    description: Joi.string().required(),
    client:Joi.string().required(),
    duration: Joi.string().required(),
});
module.exports = Schema;