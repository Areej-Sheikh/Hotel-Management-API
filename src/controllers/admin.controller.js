const userModel = require("../models/user.model")
const propertyModel = require("../models/property.model");
const CustomError = require("../utils/CustomError");
const bookingModel = require("../models/booking.model");

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({ isAdmin: false }).lean();
    res.status(200).json(users);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
module.exports.deleteUsers = async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) return next(new CustomError("User not found", 404));

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
module.exports.deleteProperties = async (req, res, next) => {
  try {
    const property = await propertyModel.findByIdAndDelete(req.params.id);
    if (!property) return next(new CustomError("Property not found", 404));

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
module.exports.getBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find()
      .populate("user", "username email")
      .populate("property", "title price");

    res.status(200).json(bookings || []);
  } catch (error) {
    console.error("Error in getBookings:", error.message);
    res.status(500).json({ message: error.message });
  }
};
module.exports.Payments = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, status } = req.query;

    page = Number(page);
    limit = Number(limit);

    if (isNaN(page) || isNaN(limit)) {
      return next(new CustomError("Invalid page or limit", 400));
    }

    const filter = {};
    if (status) filter.status = status;

    const payments = await bookingModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", "username email")
      .populate("property", "location price title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: payments,
      page,
      limit,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports.singlePayment = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const payment = await bookingModel
      .findById(bookingId)
      .populate("user", "username email")
      .populate("property", "location price title");
    if (!payment) return next(new CustomError("Payment Not Found", 500));

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
module.exports.getProperties = async (req, res, next) => {
  try {
    const nonAdminUsers = await userModel
      .find({ isAdmin: false })
      .select("_id username");

    const properties = await propertyModel
      .find({ host: { $in: nonAdminUsers.map((user) => user._id) } })
      .populate("host", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(properties);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
module.exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await bookingModel.findByIdAndDelete(req.params.id);
    if (!booking) return next(new CustomError("Booking not found", 404));

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
