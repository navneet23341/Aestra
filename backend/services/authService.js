const db = require("../config/db");

const { hashPassword } = require("../utils/password");

const {
    generateAccessToken,
    generateRefreshToken
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
    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    // Save refresh token
    await saveRefreshToken(

        user.id,

        refreshToken

    );

    return {

        user,
        accessToken,
        refreshToken

    };

}

async function saveRefreshToken(userId, refreshToken) {

    // We'll implement this next

}

module.exports = {

    signup

};