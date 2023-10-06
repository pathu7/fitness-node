const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoute = require('./routes/user');
const workoutPlanRoute = require('./routes/workoutPlan')
const exerciseRoute = require('./routes/exercise')
const nutritionTrackerRoute = require('./routes/nutritionTracker')
const gymLocatorRoute = require('./routes/gymLocator')
const CommunityRoute = require('./routes/community')
const ClassRoute = require('./routes/class')
const BookingRoute = require('./routes/booking')
const healthNewsRoute = require('./routes/healthNews')
const supportRoute = require('./routes/support')
const CONFIG = require('./Constants/config');

mongoose.connect(CONFIG.MONGO_DB, {
    // useMongoClient: true
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('connected');
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('images'))
app.use(express.static('public'))

app.use('/user', userRoute)
app.use('/workout', workoutPlanRoute)
app.use('/exercise', exerciseRoute)
app.use('/nutritionTracker', nutritionTrackerRoute)
app.use('/gym', gymLocatorRoute)
app.use('/community', CommunityRoute)
app.use('/classes', ClassRoute)
app.use('/bookings', BookingRoute)
app.use('/healthNews', healthNewsRoute)
app.use('/support', supportRoute)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            error: error.message
        }
    })
})

module.exports = app