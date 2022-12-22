"use strict";

const { mongoose, Schema } = require("mongoose");

const  dataSchema = new Schema({
    data: { type: String },
},{ collection: "datas" })

const Data = mongoose.model("Data", dataSchema)

module.exports = { Data }
