"use strict";

const { mongoose, Schema } = require("mongoose");

// TODO: add updated_at field
const  userSchema = new Schema({
    name: { type: String, required: true },
    nickname: { type: String, default: "lorem ipsum" },
    picture: { type: String, default: "lorem ipsum" },
    sub_id: { type: String, default:""},
    email: { type: String, default:""},
    email_verified: { type: String, default:""},
    favorited: [{ type: Schema.Types.ObjectId, ref:"Favorite" }]
},{ collection: "users" })

const User = mongoose.model("User", userSchema)

module.exports = { User }
