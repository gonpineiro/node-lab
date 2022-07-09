const mongoose = require("mongoose");
const { DB_HOST } = require("../config/env");

mongoose.connect(DB_HOST, { useNewUrlParser: true }).catch((e) => {
    console.error("Connection error", e.message);
});

const db = mongoose.connection;

module.exports = db;