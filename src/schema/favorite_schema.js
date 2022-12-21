"use strict";

const { mongoose, Schema } = require("mongoose");

const  favoriteSchema = new Schema({
    card_id: { type: String, default:""},
    title: { type: String, default:"" },
    img_url: { type: String, default: "" },
    alt_description: { type: String, default: "" },
    description: { type: String, default: "" },
    selected_tags: [{ type: {type: String}, title: {type: String} }],
    users: [{type: Schema.Types.ObjectId, ref: "User"}]
},{ collection: "favorites" })

const Favorite = mongoose.model("Favorite", favoriteSchema)

module.exports = { Favorite }