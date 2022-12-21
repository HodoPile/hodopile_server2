"use strict";
const { start } = require("../server.js")
const mongoose = require('mongoose');
const PORT = 3000
const connectionString = "mongodb+srv://antoni909:8X1Minktmi5kiX8B@cluster0.pgojx7a.mongodb.net/hodopile?retryWrites=true&w=majority"

module.exports = { 
    runApp: () => {
        mongoose.connect( connectionString, { useNewUrlParser: true })
        .then( ( { connections } ) => {
            const { name } = connections[0]
            start( PORT )
            console.log(`connected to: ${name}`)
        })  
        .catch( ( err ) => console.log( "ERR: ", err ))
    },
    stopApp: () => mongoose.disconnect()
}
