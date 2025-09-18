const CustomError = require("../utils/CustomError");
const RazorpayInstance = require("../config/razorpay");

module.exports.processPayment = async (req, res, next) => {
  try {
    const { amount, currency } = req.body;
    if (!amount || !currency) {
      return next(new CustomError("All fields are required", 400));
    }

    const options = {
      amount: Number(amount) * 100,
      receipt: `receipt_${Date.now()}`,
      currency: "INR",
      payment_capture: 1,
    };

    const order = await RazorpayInstance.orders.create(options);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
     console.error("Razorpay Error Object:", error);
     console.error("Razorpay Error Response Data:", error?.response?.data);
     next(new CustomError("Error processing payment", 500));
  }
};

module.exports.fetchPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      next(new CustomError("Payment ID is required", 400));
    }
    const payment = await RazorpayInstance.payments.fetch(id).catch((error) => {
      return next(new CustomError(error.message, 404));
    });
    if (!payment) {
      return next(new CustomError("Error Fetching Payment", 404));
    }
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
