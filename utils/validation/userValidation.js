const Joi = require('joi');


const create_user_schema_validation = Joi.object({
    username: Joi.string()
        .required(),
    
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required(),
});


const login_schema_validation = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required(),
});


module.exports = {
    create_user_schema_validation,
    login_schema_validation
};