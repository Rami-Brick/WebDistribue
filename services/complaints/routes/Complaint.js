const express = require('express');
const {
    createComplaint,
    updateComplaintStatus,
    getAllComplaints,
    respondToComplaint,
    DeleteComplaint
} = require('../Controller/ComplaintController');

const router = express.Router();

// Route for creating a new complaint
router.post('/complaints', createComplaint);

// Route for getting all complaints
router.get('/complaints', getAllComplaints);

// Route for updating the status of a complaint
router.put('/complaints/update-status', updateComplaintStatus);

// Route for admin response to a complaint
router.put('/complaints/respond', respondToComplaint);

// Route for deleting a complaint
router.delete('/complaints', DeleteComplaint);

module.exports = router;
