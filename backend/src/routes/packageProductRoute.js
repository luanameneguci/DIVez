const express = require("express");
const router = express.Router();
const packageProductController = require("../controllers/PackageProductController");

router.get("/", packageProductController.packageProduct_list); 
router.post("/create", packageProductController.packageProduct_create);
router.put("/update", packageProductController.packageProduct_update); // Assuming idProduct is sent in the body for update
router.get("/:idProduct", packageProductController.packageProduct_detail); 
router.delete("/delete/:idProduct", packageProductController.packageProduct_delete);

module.exports = router;
