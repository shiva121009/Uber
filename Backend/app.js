const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectToDb = require('./db/db');       // make sure this path is correct
const userRoutes = require('./routes/user.routes.js'); // correct
const cookiesParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes')



const app = express();
app.use(cookiesParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectToDb();
app.get('/', (req, res) => {
  res.send("Hello World 🚀 Uber Backend is Running");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes )
module.exports = app;
