const express = require("express");
const router = express.Router();
const ticketController = require('../controllers/TicketController');

router.get('/dpending', ticketController.countTicketsByStatusAndDepartment);
router.get('/', ticketController.ticket_list);
router.post('/create', ticketController.ticket_create);
router.get('/pending', ticketController.countTicketsWithStatus2);
router.put('/update/:id', ticketController.ticket_update);
router.get('/:id', ticketController.ticket_detail);
router.delete('/delete/:id', ticketController.ticket_delete);
router.get('/buyer/:idBuyer', ticketController.TicketsById);

module.exports = router;
