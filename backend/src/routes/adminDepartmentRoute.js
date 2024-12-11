const express = require("express");
const router = express.Router();

const adminDepartmentController = require("../controllers/AdminDepartmentController");

// Get all admin departments
router.get("/", adminDepartmentController.adminDepartment_list);

// Create a new admin department
router.post("/create", adminDepartmentController.adminDepartment_create);

// Update an admin department by ID
router.put("/update/:id", adminDepartmentController.adminDepartment_update);

// Get an admin department by ID
router.get("/:id", adminDepartmentController.adminDepartment_detail);

// Delete an admin department by ID
router.delete("/delete/:id", adminDepartmentController.adminDepartment_delete);

module.exports = router;