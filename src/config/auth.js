const { auth } = require('express-openid-connect');

let SERVER_URL = ( process.env.NODE_ENV === "production" )? process.env.HEROKU_SERVER_URL : process.env.LOCAL_SERVER_URL;
module.exports  = {
    config: {
        authRequired: false,
        auth0Logout: true,
        secret: process.env.AUTH0_SECRET,
        baseURL: SERVER_URL,
        clientID: process.env.AUTH0_CLIENTID,
        issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
    }
};


