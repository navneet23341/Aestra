const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 3000;


const pool = require("./config/db");

pool.connect()
.then(() => {
    console.log("✅ PostgreSQL Connected");
})
.catch((err) => {
    console.log(err);
});

const app = express();

app.use(cors({

    origin: "http://localhost:5173",

    credentials: true

}));
app.use(express.json());
app.use(cookieParser());

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});