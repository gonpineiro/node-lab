const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");
const formRouter = require("./routes/form-router");

const app = express();
const port = 3005;

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api", formRouter);

app.listen(port, () => console.log(`http//:localhost:${port}`));