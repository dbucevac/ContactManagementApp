const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/database').database;
const cors = require('cors')
const contacts = require('./routes/api/contacts')

const app = express();

app.use(cors());

//Bodyparser middleware

app.use(bodyParser.json());
// Connect to Mongo

mongoose.connect(db)
    .then(()=> console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use('/api/contacts', contacts)

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started on port ${port}`))
