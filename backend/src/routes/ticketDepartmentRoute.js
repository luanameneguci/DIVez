const express = require("express");
const router = express.Router();

const ticketDepartmentController = require("../controllers/TicketDepartmentController");

router.get("/", ticketDepartmentController.ticketDepartment_list); 

router.post("/create", ticketDepartmentController.ticketDepartment_create);

router.put("/update/:id", ticketDepartmentController.ticketDepartment_update);

router.get("/:id", ticketDepartmentController.ticketDepartment_detail); 

router.delete("/delete/:id", ticketDepartmentController.ticketDepartment_delete);

module.exports = router;