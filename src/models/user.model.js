const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username Is Required'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'Email Is Required'],
        unique: true,
        validate: {
            validator: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Please enter a valid email address.'
        }
    },
    password: {
        type: String,
        required: [true, 'Password Is Required'],
    },
    properties:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property'
        }
    ],
    bookings:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ]
},{timestamps: true})

module.exports = mongoose.model('User', userSchema)