const Joi = require('joi');

const password_schema_validation = Joi.object({
    id:  Joi.string(),
    password: Joi.string(),
    confirmPassword: Joi.ref('password'),
});


module.exports = {
    password_schema_validation
}