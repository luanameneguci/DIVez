const express = require('express');
const router = express.Router();

const middleware = require('../middleware');

const userController = require("../controllers/UserController");

router.get('/list', middleware.checkToken, userController.list);
router.get("/", userController.user_list); 
router.post("/create", userController.user_create);
router.put("/update/:id", userController.user_update);
router.get("/:id", userController.user_detail); 
router.delete("/delete/:id", userController.user_delete);
router.get("/managers/:idBuyer", userController.getManagers);
router.get("/:idUser/billings", userController.billingByUser);
router.post('/login', userController.login);
router.post('/updateBuyerId', userController.updateBuyerId);
router.get('/checkIdBuyer/:idUser', userController.getIdBuyerId);

module.exports = router;