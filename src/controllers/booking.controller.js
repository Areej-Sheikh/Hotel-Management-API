const CustomError = require("../utils/CustomError");
const bookingModel = require ('../models/booking.model')
const propertyModel = require ('../models/property.model');
const { bookingConfirmationTemplate } = require("../utils/emailTemplates");
const { sendEmail } = require("../utils/email");

module.exports.createBooking = async (req, res, next) => {
    const{propertyId, checkInDate,checkOutDate,totalAmount,status,paymentId} = req.body;
    try {
        const property = await propertyModel.findById(propertyId);
        if(!propertyId ||!totalAmount ||!status ||!paymentId){
            return next(new CustomError('Missing Required Booking Details', 400))
        }
        if(!property){
            return res.status(404).json({message: 'Property Not Found'});
        }

        const newBooking = await bookingModel.create({
            user: req.user._id,
            property: propertyId,
            checkInDate: new Date(),
            checkOutDate: new Date(),
            totalPrice:totalAmount,
            status,
            razorpayOrderId: paymentId
        })
        await newBooking.save();

        const emailTemplate = bookingConfirmationTemplate(
            req.user.username,
            property.location,
            checkInDate,
            checkOutDate,
            totalAmount,
        )
        await sendEmail(req.user.email, "Booking Confirmation", emailTemplate)
        res
          .status(201)
          .json({
            success: true,
            message: "Booking Created Successfully",
            newBooking,
            paymentId,
            currency: "INR",
            amount: totalAmount,
          });
        
    } catch (error) {
        next(new CustomError("Error creating booking", 500));        
    }

}
module.exports.viewBooking = async (req, res, next) => {
    try {
      const id = req.user._id;
      const bookings = await bookingModel
        .find({ user: id })
        .populate("property", "title location price")
        .populate("user", "username email");
        res.status(200).json(bookings);

    } catch (error) {
      next(new CustomError("Error Fetching bookings", 500));
    }
}
module.exports.cancelBooking = async (req, res, next) => {
    try {
        const {id} = req.params;
        const booking = await bookingModel.findById(id);
        if(!booking){
            return res.status(404).json({message: 'Booking Not Found'});
        }
        if(booking.status === 'Cancelled'){
            return res.status(400).json({message: 'Booking is already cancelled'});
        }
        if(booking.user.toString() != req.user._id.toString()){
            return res.status(401).json({message: 'Unauthorized to cancel this booking'});
        }
        booking.status = 'Cancelled';
        await booking.save();
        res.status(200).json({message: 'Booking cancelled successfully', booking});
        
    } catch (error) {
        next(new CustomError("Error cancelling booking", 500));
    }
}
module.exports.updateBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { checkInDate, checkOutDate, totalAmount, status } = req.body;

        if (!checkInDate || !checkOutDate || !totalAmount || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const booking = await bookingModel.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking Not Found" });
        }

        if (booking.status === "Cancelled") {
            return res.status(400).json({ message: "Booking is already cancelled" });
        }

        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized to update this booking" });
        }

        booking.checkInDate = checkInDate;
        booking.checkOutDate = checkOutDate;
        booking.totalPrice = totalAmount;
        booking.status = status;

        await booking.save();

        res.status(200).json({
            message: "Booking updated successfully",
            booking
        });
    } catch (error) {
        console.error("Error updating booking:", error.message);
        next(new CustomError("Error updating booking", 500));
    }
};
