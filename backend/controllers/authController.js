const authService = require("../services/authService");

async function signup(req, res) {

    try {

        const result = await authService.signup(req.body);

        res.status(201).json({

            success: true,

            message: "Account created successfully.",

            ...result

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

        res.status(200).json({

            success: true,

            message: "Login successful.",

            ...result

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

        const { refreshToken } = req.body;

        const result = await authService.refreshAccessToken(refreshToken);

        res.status(200).json({

            success: true,

            accessToken: result.accessToken

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

        const { refreshToken } = req.body;

        await authService.logout(refreshToken);

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