const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
// const Web3 = require('web3');
const { Web3 } = require('web3');
const contract = require('@truffle/contract');
const path = require('path');
const cors = require('cors'); // Import CORS middleware

const app = express();
const port = 8080; // Use the correct variable name: port, not PORT

app.use(express.static(path.join(__dirname, 'web')));
app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware

// Connect to local Ethereum node
// const web3 = new Web3('http://127.0.0.1:7545');

// Load compiled smart contract
const contractJSON = require(path.join(__dirname, 'build/contracts/UserValidation.json'));
const UserValidation = contract(contractJSON);
UserValidation.setProvider(web3.currentProvider);

// Set up Ethereum account
web3.eth.getAccounts().then(accounts => {
    UserValidation.defaults({ from: accounts[0] });
});

// MySQL database connection
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'yashitha',
    password: 'password',
    database: 'sample' // Name of your database
});

// Connect to MySQL database
dbConnection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Handle registration requests
app.post('/register', (req, res) => {
    const { fullName, address, dob, password, ethereumId } = req.body;

    // Insert user data into users table
    const sql = 'INSERT INTO users (fullName, address, dob, password, ethereumId) VALUES (?, ?, ?, ?, ?)';
    dbConnection.query(sql, [fullName, address, dob, password, ethereumId], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('User registered successfully');
        const userId = result.insertId;
        res.status(200).json({ userId, ethereumId });
    });
});

// Handle login for age gated service endpoint
app.post('/login/ageGated', async (req, res) => {
    // Login logic for age gated service
    const { userId, ethereumId, age } = req.body;

    try {
        const userValidationInstance = await UserValidation.deployed();
        const isValid = await userValidationInstance.validateLoginAgeGated(userId, ethereumId);
        if (isValid) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(403).json({ error: 'Age validation failed or invalid credentials' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Handle login for non-age gated service endpoint
app.post('/login/nonAgeGated', async (req, res) => {
    // Login logic for non-age gated service
    const { userId, ethereumId } = req.body;

    try {
        const userValidationInstance = await UserValidation.deployed();
        const isValid = await userValidationInstance.validateLoginNonAgeGated(userId, ethereumId);
        if (isValid) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(403).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});