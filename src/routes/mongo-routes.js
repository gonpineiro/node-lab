const express = require("express");

const MongoCtrl = require("../controllers/form-ctrl");

const router = express.Router();

router.post("/form", FormCtrl.createForm);
router.put("/form/:id", FormCtrl.updateForm);
router.delete("/form/:id", FormCtrl.deleteForm);
router.get("/form/:id", FormCtrl.getFormById);
router.get("/form", FormCtrl.getForms);

module.exports = router;