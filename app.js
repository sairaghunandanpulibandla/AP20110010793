const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const BASE_URL = 'http://20.244.56.144/train';
const AUTH_URL = `${BASE_URL}/auth`;
const TRAINS_URL = `${BASE_URL}/trains`;

// Replace these values with your actual client credentials
const clientID = 'b46128a0-fbde-4c16-a4b1-6ae6ad718e27';
const clientSecret = 'XDyo10RPayKBODAN';

app.get('/', (req, res) => {
    res.send('Welcome to Train API Demo');
});

app.get('/register', async (req, res) => {
    try {
        const registrationPayload = {
            companyName: 'Train Central',
            ownerName: 'Ran',
            ownerEmail: 'ran@abc.edu',
            rollNo: '1',
            clientSecret: 'XOyo10RPayKBODAN'
        };

        const response = await axios.post(`${BASE_URL}/register`, registrationPayload);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
});

app.get('/auth', async (req, res) => {
    try {
        const authPayload = {
            clientID,
            clientSecret
        };

        const response = await axios.post(AUTH_URL, authPayload);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
});

app.get('/trains', async (req, res) => {
    try {
        const response = [
            {
                trainName: "Chennai Exp",
                trainNumber: "2344",
                departureTime: {
                    Hours: 21,
                    Minutes: 35,
                    Seconds: 0
                },
                seatsAvailable: {
                    sleeper: 3,
                    AC: 1
                },
                price: {
                    sleeper: 2,
                    AC: 5
                },
                delayedBy: 15
            },
            {
                trainName: "Hyderabad Exp",
                trainNumber: "2341",
                departureTime: {
                    Hours: 23,
                    Minutes: 55,
                    Seconds: 0
                },
                seatsAvailable: {
                    sleeper: 6,
                    AC: 7
                },
                price: {
                    sleeper: 554,
                    AC: 1854
                },
                delayedBy: 5
            }
            // ... (add more train objects if needed)
        ];

        res.status(200).json(response);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
});

app.get('/trains/:trainNumber', async (req, res) => {
    try {
        const { trainNumber } = req.params;
        const access_token = req.query.access_token;
        const headers = {
            Authorization: `Bearer ${access_token}`
        };

        const response = await axios.get(`${TRAINS_URL}/${trainNumber}`, { headers });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
});

app.get("/train/trains", (req, res) => {

})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
