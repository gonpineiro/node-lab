var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dynamicSchema = (collection) => {
    const schema = new Schema(
        {
            _id: Number,
            chats: Array
        },
        { timestamps: true }
    );
    return mongoose.model(collection, schema);
}

//no we export dynamicSchema function
module.exports = dynamicSchema;