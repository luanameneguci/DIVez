const express = require("express");
const router = express.Router();

const packageController = require("../controllers/PackageController");

router.get("/", packageController.package_list); 

router.post("/create", packageController.package_create);

router.put("/update/:id", packageController.package_update);

router.get("/:id", packageController.package_detail); 

router.delete("/delete/:id", packageController.package_delete);

module.exports = router;