const CustomError = require("../utils/CustomError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const propertyModel = require("../models/property.model");

module.exports.createProperty = async (req, res, next) => {
    const { title, description, location, price, amenities, images } = req.body;
    try {
      if (
        !title ||
        !description ||
        !location ||
        !price ||
        !amenities ||
        !images
      ) {
        next(new CustomError("All fields are required", 400));
      }
      const newProperty = new propertyModel({
        title,
        description,
        location,
        price,
        amenities,
        images,
        host: req.user._id,
      });
      res
        .status(201)
        .json({ message: "Property created successfully", newProperty });
    } catch (error) {
      next(new CustomError("Error creating property", 500));
    }
  };
  module.exports.updateProperty = async (req, res, next) => {
    const { id } = req.params;
    try {
      if (!id) {
        next(new CustomError("Property ID is required", 400));
      }
      const updateProperty = await propertyModel.findOneAndUpdate(
        { _id: id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updateProperty) {
        return next(new CustomError("Property not found", 404));
      }
      res
        .status(200)
        .json({ message: "Property updated successfully", updateProperty });
    } catch (error) {
      next(new CustomError("Error updating property", 500));
    }
  };
module.exports.updateProperty = async (req, res, next) =>{
    try {
        
    } catch (error) {
        
    }
}