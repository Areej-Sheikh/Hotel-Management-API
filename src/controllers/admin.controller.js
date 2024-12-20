const userModel = require("../models/user.model")
const propertyModel = require("../models/property.model");
const CustomError = require("../utils/CustomError");

module.exports.getUsers = async (req,res,next)=>{
    try {
        const users = userModel.find({isAdmin:false});
        res.status(200).json(users)

    } catch (error) {  
        next(new CustomError(error.message, 500))      
    }
} 
module.exports.deleteUsers = async(req,res,next)=>{
    try {
        const user = await userModel.findByIdAndDelete(req.params.id)
        if(!user) return next(new CustomError("User not found", 404))
            
        res.status(200).json({message: "User deleted successfully"})
        
    } catch (error) {
        next(new CustomError(error.message, 500))        
    }
}
module.exports.getProperties = async(req,res,next)=>{
    try {
        const properties = await userModel.find();
        res.status(200).json(properties)        
    } catch (error) {
        next(new CustomError(error.message, 500))        
    }
}
module.exports.deleteProperties = async(req,res,next)=>{
    try {
        const property = await propertyModel.findByIdAndDelete(req.params.id)      
        if(!property) return next(new CustomError("Property not found", 404))
            
        res.status(200).json({message: "Property deleted successfully"})
    } catch (error) {
        next(new CustomError(error.message, 500))        
    }
}
module.exports.getBookings = async(req,res,next)=>{
    try {
        const bookings = await bookingModel.find().populate('property user')
        res.status(200).json(bookings)        
    } catch (error) {
        next(new CustomError(error.message, 500))        
    }
}
module.exports.Payments = async(req,res,next) =>{
    try {
        const {page =1, limit = 10,status, paymentStatus} = req.query;
        const filter ={};
        if(status)filter.status = status;
        const payments = await bookingModel.find(filter)
        .skip((page -1)*limit
        .limit(Number(limit)))
        .populate("user","username email")
        .populate("property","location price title")
        .sort({createAt: -1});
        res.status(200).json({
            success: true,
            data: payments,
            page,
            limit
        })
        
    } catch (error) {
        next(new CustomError(error.message, 500))        
    }
}
module.exports.singlePayment = async(req,res,next)=>{
    try {
        const bookingId = req.params.id;
        const payment = await bookingModel.findById(bookingId)
        .populate("user","username email")
        .populate("property","location price title")
        if(!payment) return next(new CustomError("Payment Not Found", 500))
            
        res.status(200).json({ success: true,
            data: payment,})
        
    } catch (error) {
        next(new CustomError(error.message, 500))        
    }
}