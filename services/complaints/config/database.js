const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('productdb', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432, // Adjust if needed
    logging: false, // Disable logging for cleaner output
});

module.exports = sequelize;
