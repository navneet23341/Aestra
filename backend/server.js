const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

pool.connect()
.then(() => {
    console.log("✅ PostgreSQL Connected");
})
.catch((err) => {
    console.log(err);
});

const app = express();

app.use(cors());
app.use(express.json());

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.listen(3000, () => {
    console.log("Server listening on port 3000...");
});