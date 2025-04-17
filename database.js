'use strict';

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));