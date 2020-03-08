const { Schema, model } = require('mongoose');

const schema = new Schema({
    UserName: {
        type: String,
        required: true,
    },
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Age: {
        type: String,
        required: true,
    }
}, { versionKey: false })

module.exports = model('users', schema);