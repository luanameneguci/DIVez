const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");

// Get all carts
router.get("/", cartController.cart_list);

// Create a new cart
router.post("/create", cartController.cart_create);

// Update a cart by ID
router.put("/update/:id", cartController.cart_update);

// Get a cart by ID
router.get("/:id", cartController.cart_detail);

// Delete a cart by ID
router.delete("/delete/:id", cartController.cart_delete);

router.get("/user/:idUser", cartController.getUserCartDetails);

router.get("/:idCart/products", cartController.getAllProductsInCart);

router.get("/all/:idUser", cartController.CartsByUserId);

module.exports = router;
