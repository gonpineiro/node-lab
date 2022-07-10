const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { APP_PORT } = process.env;

const db = require("./src/db");
const mongoRouter = require("./src/routes/mongo-routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api", mongoRouter);

app.listen(APP_PORT, () => console.log(`http//:localhost:${APP_PORT}`));