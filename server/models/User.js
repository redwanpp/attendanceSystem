const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
            },
            message: (prop) => `Invalid Email ${prop.value}`
        }
    },
    password: {
        type: String,
        minlength: [4, 'password must be minimum 4 characters.'],
        required: true
    },
    roles: {
        type: [String],
        required: true,
        default: ['STUDENT']
    },
    accountStatus: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
        default: 'PENDING',
        required: true
    },
});

const User = model('User', userSchema);
module.exports = User;
