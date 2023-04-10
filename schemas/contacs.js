const Joi = require("joi");

const addSchema = Joi.object({
    phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required()
})

module.exports = {
    addSchema,
}