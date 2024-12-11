const express = require("express");
const router = express.Router();
const ticketPriorityController = require("../controllers/TicketPriorityController");

router.get("/", ticketPriorityController.ticketPriority_list); 
router.post("/create", ticketPriorityController.ticketPriority_create);
router.put("/update/:id", ticketPriorityController.ticketPriority_update);
router.get("/:id", ticketPriorityController.ticketPriority_detail); 
router.delete("/delete/:id", ticketPriorityController.ticketPriority_delete);

module.exports = router;
