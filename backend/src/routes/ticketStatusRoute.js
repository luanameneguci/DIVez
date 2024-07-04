const express = require("express");
const router = express.Router();

const ticketStatusController = require("../controllers/TicketStatusController");

router.get("/", ticketStatusController.ticketStatus_list); 

router.post("/create", ticketStatusController.ticketStatus_create);

router.put("/update/:id", ticketStatusController.ticketStatus_update);

router.get("/:id", ticketStatusController.ticketStatus_detail); 

router.delete("/delete/:id", ticketStatusController.ticketStatus_delete);

module.exports = router;
