const express =  require('express');
const { connect } = require('./src/db/db');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./src/middlewares/errorHandler');
require('dotenv').config('./.env');
const app = express();

connect()

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));


//setup cors
app.use(cors({
    origin: true,
    credentials: true,
}))

// Routes
const userRouter = require('./src/routes/user.route.js')
app.use('/api/users', userRouter)

const propertyRouter = require('./src/routes/property.route.js')
app.use('/api/properties', propertyRouter)

const reviewRouter = require('./src/routes/review.route.js')
app.use('/api/reviews', reviewRouter)

const bookingRouter = require('./src/routes/booking.route.js')
app.use('/api/bookings', bookingRouter)

const adminRouter = require('./src/routes/admin.route.js')
app.use('/api/admin', adminRouter)

const paymentRouter = require('./src/routes/payment.route.js')
app.use('/api/payments', paymentRouter)


// Error Handling
app.use("*", (req,res,next)=>{
    const error = new Error('Route Not Found');
    error.status = 404;
    next(error);
}) 

// Global Error Handler
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on Port ${process.env.PORT}`);
})