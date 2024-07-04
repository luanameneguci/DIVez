const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.product_list); 

router.post("/create", productController.product_create);

router.put("/update/:id", productController.product_update);

router.get("/:id", productController.product_detail); 

router.delete("/delete/:id", productController.product_delete);

module.exports = router;