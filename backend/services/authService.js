const db = require("../config/db");
const jwtConfig = require("../config/jwt");

const { hashPassword , comparePassword} = require("../utils/password");


const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} = require("../utils/jwt");

async function signup(userData) {

    const {

        fullName,
        email,
        password

    } = userData;

    // Check if email already exists
    const existingUser = await db.query(

        `
        SELECT id
        FROM users
        WHERE email = $1
        `,

        [email]

    );

    if (existingUser.rows.length > 0) {

        throw new Error("Email already exists");

    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const result = await db.query(

        `
        INSERT INTO users(

            full_name,
            email,
            password_hash

        )

        VALUES($1,$2,$3)

        RETURNING
            id,
            full_name,
            email
        `,

        [

            fullName,
            email,
            passwordHash

        ]

    );

    const user = result.rows[0];

    // Generate JWTs
    const { accessToken, refreshToken } = await createUserSession(user);

    return {

        user: {

        id: user.id,

        fullName: user.full_name,

        email: user.email

        },

        accessToken,
        refreshToken

    };

}

async function login(userData) {

    const {

        email,
        password

    } = userData;

    // Find user
    const result = await db.query(

        `
        SELECT

            id,
            full_name,
            email,
            password_hash

        FROM users

        WHERE email = $1
        `,

        [email]

    );

    if (result.rows.length === 0) {

        throw new Error("Invalid email or password");

    }

    const user = result.rows[0];

    // Compare password
    const passwordMatch = await comparePassword(

        password,

        user.password_hash

    );

    if (!passwordMatch) {

        throw new Error("Invalid email or password");

    }

    // Create user session
    const {

        accessToken,

        refreshToken

    } = await createUserSession(user);

    return {

        user: {

            id: user.id,

            fullName: user.full_name,

            email: user.email

        },

        accessToken,

        refreshToken

    };

}

async function refreshAccessToken(refreshToken) {

    // Verify JWT
    const decoded = verifyRefreshToken(refreshToken);

    // Find stored refresh token
    const result = await db.query(

        `
        SELECT
            token_hash
        FROM refresh_tokens
        WHERE user_id = $1
          AND expires_at > NOW()
        `,

        [decoded.id]

    );

    if (result.rows.length === 0) {

        throw new Error("Refresh token not found.");

    }

    // Compare hashed token
    const tokenMatch = await comparePassword(

        refreshToken,

        result.rows[0].token_hash

    );

    if (!tokenMatch) {

        throw new Error("Invalid refresh token.");

    }

    // Fetch user information
    const userResult = await db.query(

        `
        SELECT

            id,
            full_name,
            email

        FROM users

        WHERE id = $1
        `,

        [decoded.id]

    );

    if (userResult.rows.length === 0) {

        throw new Error("User not found.");

    }

    const user = userResult.rows[0];

    // Create a brand new access token
    const accessToken = generateAccessToken(user);

    return {

        accessToken

    };

}

async function saveRefreshToken(userId, refreshToken) {

    const tokenHash = await hashPassword(refreshToken);

    const expiresAt = new Date();

    expiresAt.setDate(

        expiresAt.getDate() + jwtConfig.REFRESH_TOKEN_DAYS

    );

    await db.query(

        `
        DELETE FROM refresh_tokens
        WHERE user_id = $1
        `,

        [userId]

    );

    await db.query(

        `
        INSERT INTO refresh_tokens(

            user_id,

            token_hash,

            expires_at

        )

        VALUES($1,$2,$3)
        `,

        [

            userId,

            tokenHash,

            expiresAt

        ]

    );

}

async function createUserSession(user) {

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    await saveRefreshToken(user.id, refreshToken);

    return {

        accessToken,
        refreshToken

    };

}

async function logout(refreshToken) {

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Delete refresh token
    await db.query(

        `
        DELETE FROM refresh_tokens

        WHERE user_id = $1
        `,

        [decoded.id]

    );

}

module.exports = {

    signup,
    login,
    refreshAccessToken,
    logout
};