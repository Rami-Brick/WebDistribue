const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration

const Complaint = sequelize.define('Complaint', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('OPEN', 'IN_PROGRESS', 'CLOSED'),
        defaultValue: 'IN_PROGRESS'
    },
    admin_response: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'complaints',
    timestamps: false // Set to true if you need `createdAt` and `updatedAt` managed automatically
});

module.exports = Complaint;
