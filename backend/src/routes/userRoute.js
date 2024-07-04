const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController");

router.get("/", userController.user_list); 
router.post("/create", userController.user_create);
router.put("/update/:id", userController.user_update);
router.get("/:id", userController.user_detail); 
router.delete("/delete/:id", userController.user_delete);

module.exports = router;