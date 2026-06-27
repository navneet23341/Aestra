const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log(process.env.Nvidea_API_KEY);
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

const genRoute = require("./routes/adminRoutes")

app.use("/", genRoute);

app.listen(3000,()=>{
    console.log("server is listening on port 3000...");
})
