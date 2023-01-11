const mongoose = require("mongoose")


const Schema = mongoose.Schema;
const objectId = Schema.objectId;



//export 
const PostSchema = new Schema({
    title: { type: String, required: [true, "Please provide a title"] },

    body: { type: String, required: [true, "Please provide a body"]},

    user: { type: String, ref: "User"}

}, { timestamps: true })

module.exports = { PostSchema };