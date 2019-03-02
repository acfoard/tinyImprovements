const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type:String,
        trim: true,
        required: "Username is required"
    },
    password:{
        type: String,
        required: "Password is required"
    },
    noteFrom: [
        {
        type: Schema.Types.ObjectId,
        ref: "Kudo"
    }
],
noteTo: [
        {
        type: Schema.Types.ObjectId,
        ref: "Kudo"
    }
]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;