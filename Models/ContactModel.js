const mongoose = require('mongoose');
const joi = require('joi');


const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ContactModel = mongoose.model('Contact', contactSchema);

const contactValidationSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    message: joi.string().required(),
});
module.exports = {
    ContactModel,
    contactValidationSchema,
};