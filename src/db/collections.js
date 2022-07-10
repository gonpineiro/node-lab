
const client = require(".");

const dynamicSchema = require("../models/dynamic-model");

const getCollections = () => client.db.listCollections().toArray()

const existCollection = async (collection) => {
    const collections = await getCollections();
    const find = collections.find(col => col.name === collection)

    if (find) return true
    return false
}

/**
 * 
 * @param {*} collection 
 * @param {*} contactId 
 * @param {*} chatId 
 */
const addChat = async (collection, contactId, chatId) => {
    const Col = dynamicSchema(collection)

    const chat = {
        _id: chatId,
        messages: []
    }

    const find = await Col.findById(contactId)
    if (!find) {
        await new Col({ _id: contactId }).save()
    }

    await Col.findOneAndUpdate(
        { _id: contactId },
        { $push: { chats: chat } },
    );
}
module.exports = { getCollections, existCollection, addChat }