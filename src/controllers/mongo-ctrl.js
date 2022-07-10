const dynamicSchema = require("../models/dynamic-model");

const { getCollections, existCollection, addChat } = require('../db/collections');

createSchema = async ({ body }, res) => {
    const exist = await existCollection(body.name)
    if (!exist) {
        dynamicSchema(body.name)
        res.status(200).json('ok')
    } else {
        res.status(300).json('Ya existe el esquema')
    }
};

getCollectionsController = async (req, res) => {
    res.status(200).json(await getCollections())
}

existCollectionController = async ({ body }, res) => {
    res.status(200).json(await existCollection(body.collection))
}

addChatController = async ({ body }, res) => {
    const { collection, contactId, chatId } = body
    addChat(collection, contactId, chatId)
    res.status(200).json('ok');
}

updateForm = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a body to update",
        });
    }

    Form.findOne({ _id: req.params.id }, (err, form) => {
        if (err) {
            return res.status(404).json({
                err,
                message: "Form not found!",
            });
        }
        form.name = body.name;
        form.time = body.time;
        form.rating = body.rating;
        form
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: form._id,
                    message: "Form updated!",
                });
            })
            .catch((error) => {
                return res.status(404).json({
                    error,
                    message: "Form not updated!",
                });
            });
    });
};

deleteForm = async (req, res) => {
    await Form.findOneAndDelete({ _id: req.params.id }, (err, form) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!form) {
            return res.status(404).json({ success: false, error: `Form not found` });
        }

        return res.status(200).json({ success: true, data: form });
    }).catch((err) => console.log(err));
};

getFormById = async (req, res) => {
    await Form.findOne({ _id: req.params.id }, (err, form) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!form) {
            return res.status(404).json({ success: false, error: `Form not found` });
        }
        return res.status(200).json({ success: true, data: form });
    }).catch((err) => console.log(err));
};

getForms = async (req, res) => {
    await Form.find({}, (err, forms) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!forms.length) {
            return res.status(404).json({ success: false, error: `Form not found` });
        }
        return res.status(200).json({ success: true, data: forms });
    }).catch((err) => console.log(err));
};

module.exports = {
    createSchema,
    getCollectionsController,
    existCollectionController,
    addChatController
};