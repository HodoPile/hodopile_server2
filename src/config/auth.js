const { auth } = require('express-openid-connect');

module.exports  = {
    config: {
        authRequired: false,
        auth0Logout: true,
        secret: process.env.AUTH0_SECRET,
        baseURL: process.env.LOCAL_SERVER_URL,
        clientID: process.env.AUTH0_CLIENTID,
        issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
    }
};


