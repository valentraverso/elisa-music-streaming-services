const { auth } = require('express-oauth2-jwt-bearer');
const {AUTH0_AUDIENCE, AUTH0_ISSUER} = require("../config/config")

const jwtCheck = auth({
    audience: AUTH0_AUDIENCE,
    issuerBaseURL: AUTH0_ISSUER,
    tokenSigningAlg: 'RS256'
});

module.exports = jwtCheck 