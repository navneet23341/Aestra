const { verifyAccessToken } = require("../utils/jwt");

async function authMiddleware(req, res, next) {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message: "Access token is required."

            });

        }

        const token = authHeader.split(" ")[1];

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Invalid authorization header."

            });

        }

        const decoded = verifyAccessToken(token);

        req.user = decoded;

        next();

    }

    catch (error) {

        return res.status(401).json({

            success: false,

            message: "Invalid or expired access token."

        });

    }

}

module.exports = authMiddleware;