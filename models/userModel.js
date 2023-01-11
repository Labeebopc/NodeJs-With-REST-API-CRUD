const mongoose = require("mongoose")


const Schema = mongoose.Schema;
const objectId = Schema.objectId;



//export 
const UserSchema = new Schema({
    name: { type: String, required: [true, "Please provide a name"] },

    email: { type: String, required: [true, "Please provide your email"], unique: true },

    gender: { type: String, enum: ["Male", "Female", "Others"], default: "Male" },

    password: { type: String, required: true, minlength: 6, select: false },

    place: { type: String, required: [true, "Please provide a place"] }

}, { timestamps: true })

module.exports = { UserSchema };