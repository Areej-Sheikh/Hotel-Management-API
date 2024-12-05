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