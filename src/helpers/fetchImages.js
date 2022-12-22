"use strict";

const fetch = require("node-fetch")

module.exports =  { 
    getUnsplashImages : ( query ) => {
        return fetch(`${ process.env.UNSPLASH_BASE_URL }/search/photos?client_id=${ process.env.UNSPLASH_ACCESS_KEY }&page=1&per_page=1&query=${ query }}`)
            .then( response => response.json() )
            .then( data => {
                return data.results[0].urls["regular"]
            })
            .catch( err => console.log(err) )
    },
}