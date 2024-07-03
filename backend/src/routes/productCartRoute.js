const express = require("express");
const router = express.Router();
const productCartController = require("../controllers/ProductCartController");

router.get("/", productCartController.productCart_list); 
router.post("/create", productCartController.productCart_create);
router.put("/update", productCartController.productCart_update); // Assuming idCart is sent in the body for update
router.get("/:idCart", productCartController.productCart_detail); 
router.delete("/delete/:idCart", productCartController.productCart_delete);

module.exports = router;
