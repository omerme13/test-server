const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'A user must have a first name']
    },
    last_name: String,
    gender: String,
    avatar: String,
    job: Object,
    contacts: Object,
    location: Object
}, {versionKey: false});

const User = mongoose.model('User', UserSchema);

module.exports = User;
