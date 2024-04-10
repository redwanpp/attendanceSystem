const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    avater: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Profile = model('Profile', userSchema);
model.exports = Profile;