const express = require("express");

const MongoCtrl = require("../controllers/mongo-ctrl");

const router = express.Router();

router.post("/createSchema", MongoCtrl.createSchema);
router.get("/listCollection", MongoCtrl.getCollectionsController);
router.post("/existCollection", MongoCtrl.existCollectionController);
router.post("/addChat", MongoCtrl.addChatController);

/* router.put("/form/:id", FormCtrl.updateForm);
router.delete("/form/:id", FormCtrl.deleteForm);
router.get("/form/:id", FormCtrl.getFormById);
router.get("/form", FormCtrl.getForms);
 */
module.exports = router;