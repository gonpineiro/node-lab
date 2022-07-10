const mongoose = require("mongoose");
const { DB_HOST } = process.env;

mongoose.connect(DB_HOST, { useNewUrlParser: true }).catch((e) => {
    console.error("Connection error", e.message);
});

const client = mongoose.connection;

module.exports = client;