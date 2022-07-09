const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Form = new Schema(
    {
        nombre: { type: String, required: true },
        estado: { type: String, required: true },
        description: { type: String, required: true },
        hcolor: { type: String, required: true },
        banner: { type: String, required: true },
        terminosCondiciones: { type: String, required: true },
        fields: { type: [Object], required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("forms", Form);