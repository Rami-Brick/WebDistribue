const express = require("express");
const http = require("http");
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg'); // Use pg for PostgreSQL
const Eureka = require('eureka-js-client').Eureka; // Import Eureka client
const app = express();
const server = http.createServer(app);
const cookieParser = require('cookie-parser');


const client = new Client({
    user: 'admin', // Replace with your PostgreSQL user
    host: 'localhost', // Replace with your PostgreSQL host
    database: 'productdb', // Replace with your PostgreSQL database name
    password: 'admin', // Replace with your PostgreSQL password
    port: 5432, // Replace with your PostgreSQL port (default is 5432)
    connectionTimeoutMillis: 10000, // Equivalent to connectTimeout in JDBC
    ssl: false // Disable SSL as your server does not support it
});

client.connect()
    .then(async () => {
        console.log('Database connected!');
        // Create tables if they do not exist
        try {
            await client.query(`
                CREATE TABLE IF NOT EXISTS complaints (
                                                          id SERIAL PRIMARY KEY,
                                                          title VARCHAR(255) NOT NULL,
                    description TEXT NOT NULL,
                    status VARCHAR(50) DEFAULT 'IN_PROGRESS',
                    admin_response TEXT DEFAULT '',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
            `);
            console.log('Tables ensured in the database.');
        } catch (tableError) {
            console.error('Error creating tables:', tableError);
        }
    })
    .catch((error) => console.log('Not connected', error));

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
require('dotenv').config();

// Routes
const ComplaintRouter = require("./routes/Complaint");
app.use("/api", ComplaintRouter);

const PORT = 3000; // Move this declaration to the top, before the eurekaClient configuration

const eurekaClient = new Eureka({
    instance: {
        app: 'complaint',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: {
            '$': PORT,
            '@enabled': 'true',
        },
        statusPageUrl: `http://localhost:${PORT}/api/complaints`, // Utilisez /api/complaint comme URL de la page de statut
        healthCheckUrl: `http://localhost:${PORT}/api/complaints`, // Peut être configuré selon vos besoins
        vipAddress: 'complaint',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        preferIpAddress: true,
    },
    eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/',
    },
});


eurekaClient.start((error) => {
    if (error) {
        console.log('Failed to start Eureka client:', error);
    } else {
        console.log('Eureka client started successfully');
    }
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;
