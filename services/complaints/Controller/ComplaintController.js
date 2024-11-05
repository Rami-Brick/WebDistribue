const Complaint = require("../models/Complaint"); // Ensure this is the Sequelize model

// Create a new complaint
const createComplaint = async (req, res) => {
    try {
        const { title, description } = req.body;

        const complaint = await Complaint.create({
            title,
            description,
        });

        res.status(201).json(complaint);
    } catch (error) {
        console.error('Error creating complaint:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all complaints
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.findAll();
        res.status(200).json({ complaints });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update the status of a complaint
const updateComplaintStatus = async (req, res) => {
    try {
        const { complaintId, status } = req.body;

        const complaint = await Complaint.update(
            { status },
            { where: { id: complaintId }, returning: true }
        );

        if (!complaint[1][0]) {
            return res.status(404).json({ error: 'Complaint not found.' });
        }

        res.status(200).json({ complaint: complaint[1][0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin responds to a complaint
const respondToComplaint = async (req, res) => {
    try {
        const { complaintId, admin_response } = req.body;
        console.log('Request Payload:', req.body);

        if (!complaintId || !admin_response) {
            return res.status(400).json({ error: 'Invalid input. Both complaintId and adminResponse are required.' });
        }

        const complaint = await Complaint.update(
            { admin_response },
            { where: { id: complaintId }, returning: true }
        );

        if (!complaint[1][0]) {
            return res.status(404).json({ error: 'Complaint not found.' });
        }

        return res.status(200).json({ complaint: complaint[1][0] });
    } catch (error) {
        console.error('Error responding to complaint:', error);
        return res.status(500).json({ error: error.message });
    }
};

// Delete a complaint
const DeleteComplaint = async (req, res) => {
    try {
        const { complaintId } = req.body;

        if (!complaintId) {
            return res.status(400).json({ error: 'Invalid input. complaintId is required.' });
        }

        const deletedCount = await Complaint.destroy({ where: { id: complaintId } });

        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Complaint not found.' });
        }

        return res.status(200).json({ message: 'Complaint deleted successfully.' });
    } catch (error) {
        console.error('Error deleting complaint:', error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createComplaint,
    getAllComplaints,
    updateComplaintStatus,
    respondToComplaint,
    DeleteComplaint
};
