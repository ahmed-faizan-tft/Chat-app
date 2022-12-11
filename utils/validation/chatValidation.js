const Joi = require('joi');


const chat_schema_validation = Joi.object({
    message: Joi.string()
        .required(),
    
    sender: Joi.string()
        .required(),

    receiver: Joi.string()
        .required(),
});

module.exports = chat_schema_validation;