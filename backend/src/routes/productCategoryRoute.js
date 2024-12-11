const express = require("express");
const router = express.Router();
const productCategoryController = require("../controllers/ProductCategoryController");

router.get("/", productCategoryController.productCategory_list); 
router.post("/create", productCategoryController.productCategory_create);
router.put("/update/:id", productCategoryController.productCategory_update);
router.get("/:id", productCategoryController.productCategory_detail); 
router.delete("/delete/:id", productCategoryController.productCategory_delete);

module.exports = router;
