const Form = require("../models/form-model");

createSchema = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a form",
        });
    }

    const form = new Form(body);

    if (!form) {
        return res.status(400).json({ success: false, error: err });
    }

    form
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: form._id,
                message: "Form created!",
            });
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: "Form not created!",
            });
        });
};

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
};