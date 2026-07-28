const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

function generateAccessToken(user) {

    return jwt.sign(

        {
            id: user.id,
            email: user.email
        },

        process.env.JWT_SECRET,

        {
            expiresIn: jwtConfig.ACCESS_TOKEN_EXPIRY
        }

    );

}

function generateRefreshToken(user) {

    return jwt.sign(

        {
            id: user.id
        },

        process.env.REFRESH_SECRET,

        {
            expiresIn: jwtConfig.REFRESH_TOKEN_EXPIRY
        }

    );

}

function verifyAccessToken(token) {

    return jwt.verify(

        token,

        process.env.JWT_SECRET

    );

}

function verifyRefreshToken(token) {

    return jwt.verify(

        token,

        process.env.REFRESH_SECRET

    );

}

module.exports = {

    generateAccessToken,

    generateRefreshToken,

    verifyAccessToken,

    verifyRefreshToken

};