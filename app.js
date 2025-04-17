'use strict';

const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const methodOverride = require('method-override');
require("dotenv").config();
require('./database');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use('/uploads', express.static('uploads'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const userRoutes = require('./routes/userRoutes');


app.use('/api/user', userRoutes);


const server = createServer(app);

server.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});