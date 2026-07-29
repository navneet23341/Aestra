const authService = require("../services/authService");

async function signup(req, res) {

    try {

        const result = await authService.signup(req.body);

        const { accessToken, refreshToken, user } = result;

        res.cookie(

            "accessToken",

            accessToken,

            {

                httpOnly: true,

                secure: false,

                sameSite: "lax"

            }

        );

        res.cookie(

            "refreshToken",

            refreshToken,

            {

                httpOnly: true,

                secure: false,

                sameSite: "lax"

            }

        );

        res.status(201).json({

            success: true,

            message: "Account created successfully.",

            user

        });


    }

    catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

}

async function login(req, res) {

    try {

        const result = await authService.login(req.body);

                const { accessToken, refreshToken, user } = result;

        res.cookie(

            "accessToken",

            accessToken,

            {

                httpOnly: true,

                secure: false,   // true in production with HTTPS

                sameSite: "lax"

            }

        );

        res.cookie(

            "refreshToken",

            refreshToken,

            {

                httpOnly: true,

                secure: false,

                sameSite: "lax"

            }

        );

        res.status(200).json({

            success: true,

            message: "Login successful.",

            user

        });


    }

    catch (error) {

        res.status(401).json({

            success: false,

            message: error.message

        });

    }

}

async function profile(req, res) {

    res.status(200).json({

        success: true,

        user: req.user

    });

}

async function refresh(req, res) {

    try {

        const refreshToken = req.cookies.refreshToken;

        const result = await authService.refreshAccessToken(refreshToken);

        res.cookie(

            "accessToken",

            result.accessToken,

            {

                httpOnly: true,

                secure: false,

                sameSite: "lax"

            }

        );

        res.status(200).json({

            success: true

        });

    }

    catch (error) {

        res.status(401).json({

            success: false,

            message: error.message

        });

    }

}

async function logout(req, res) {

    try {

        const refreshToken = req.cookies.refreshToken;

        await authService.logout(refreshToken);

        res.clearCookie(

            "accessToken",

            {

                httpOnly: true,

                secure: false,

                sameSite: "lax"

            }

        );

        res.clearCookie(

            "refreshToken",

            {

                httpOnly: true,

                secure: false,

                sameSite: "lax"

            }

        );

        res.status(200).json({

            success: true,

            message: "Logged out successfully."

        });

    }

    catch (error) {

        res.status(401).json({

            success: false,

            message: error.message

        });

    }

}

module.exports = {

    signup,

    login,
    profile,
    refresh,
    logout

};