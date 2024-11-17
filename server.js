const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./routes/auth');
const book = require('./routes/book');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');


dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

app.use(cookieParser())

app.use('/book-barter-platform/api', auth);
app.use('/book-barter-platform/api', book);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold);
});