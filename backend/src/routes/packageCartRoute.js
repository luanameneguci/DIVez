const express = require("express");
const router = express.Router();
const packageCartController = require("../controllers/PackageCartController");

router.get("/", packageCartController.packageCart_list); 
router.post("/create", packageCartController.packageCart_create);
router.put("/update/:idCart", packageCartController.packageCart_update);
router.get("/:idCart", packageCartController.packageCart_detail); 
router.delete("/delete/:idCart", packageCartController.packageCart_delete);

module.exports = router;
