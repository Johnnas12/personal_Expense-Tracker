const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect')
const userRoutes = require('./routes/userRoutes')
const bodyParser = require('body-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');
const eventsRoutes = require('./routes/eventsRoutes')

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

dbConnect();

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false, 
    saveUninitialized: false, 
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_SESSION_URI, 
        collectionName: 'sessions'
    }), 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes)
app.use('/api/events', eventsRoutes)



module.exports = app;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
