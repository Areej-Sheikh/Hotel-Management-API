const CustomError = require("../utils/CustomError");
const reviewModel = require("../models/review.model");
const propertyModel = require("../models/property.model");

module.exports.addReview = async (req, res, next) => {
  try {
    const { propertyId, rating, comment } = req.body;
    const property = await propertyModel.findById(propertyId);
    if (!property) return next(new CustomError("Property not found", 404));
    const existingReview = await reviewModel.findOne({
      user: req.user._id,
      property: propertyId,
    });
    if (existingReview)
      return res
        .status(400)
        .json({ error: "You have already reviewed this property" });
    const newReview = new reviewModel({
      property: propertyId,
      user: req.user._id,
      rating,
      comment,
    });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    next(new CustomError("Error adding review", 500));
  }
};
module.exports.updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await reviewModel.findById(id);
    if (!review) {
      return next(new CustomError("Review not found", 404));
    }
    if (review.user.toString() !== req.user._id.toString()) {
      return next(
        new CustomError("You are not authorized to update this review", 401)
      );
    }
    review.rating = rating;
    review.comment = comment;

    await review.save();
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    next(new CustomError("Could not update review", 500));
  }
};
module.exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await reviewModel.findById(id);
    if (!review) return next(new CustomError("Review not found", 404));
    if (review.user.toString() !== req.user._id.toString()) {
      return next(
        new CustomError("You are not authorized to update this review", 401)
      );
    }
    await reviewModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(new CustomError("Error deleting review", 500));
  }
};

module.exports.allReviews = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const reviews = await reviewModel
      .find({
        property: propertyId,
      })
      .populate("user", "username email createdAt")
      .sort({ createdAt: -1 });
    if (reviews.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(reviews);
  } catch (error) {
    next(new CustomError("Error fetching reviews", 500));
  }
};
