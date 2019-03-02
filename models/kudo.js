const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KudoSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "Need a title"
    },
    body: {
        type: String,
        trim: true,
        required: "Gotta tell em why they're getting a Kudo"
    },
    fromUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    toUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Kudo = mongoose.model("Kudo", KudoSchema);

module.exports = Kudo;