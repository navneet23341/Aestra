const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors);
app.use(express.json());

const genRoute = require("./routes/gen")

app.post("", handleSubmit);

app.listen(3000,()=>{
    console.log("server is listening on port 3000...");
})
