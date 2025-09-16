const CustomError = require("../utils/CustomError");
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

    await newProperty.save();
    await req.user.updateOne({ $push: { properties: newProperty._id } });
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
module.exports.deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      next(new CustomError("Property ID is required", 400));
    }
    const deletedProperty = await propertyModel.findByIdAndDelete(id);
    if (!deletedProperty) {
      return next(new CustomError("Property not found", 404));
    }
    res
      .status(200)
      .json({ message: "Property deleted successfully", deletedProperty });
  } catch (error) {
    next(new CustomError("Error deleting property", 500));
  }
};
module.exports.viewProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return new CustomError("Property ID is required", 400);
    }
    const property = await propertyModel
      .findById(id)
      .populate("host", "username email");
    if (!property) {
      return next(new CustomError("Property not found", 404));
    }
    res.json({ property });
  } catch (error) {
    next(new CustomError("Error fetching property details", 500));
  }
};

module.exports.searchMyProperties = async (req, res, next) => {
  try {
    const properties = await propertyModel.find({ host: req.user._id });
    res.json({ properties });
  } catch (error) {
    next(new CustomError("Error fetching user properties", 500));
  }
};

module.exports.searchProperties = async (req, res, next) => {
  try {
    const { location, minPrice, maxPrice } = req.query;
    const query = {
      ...(location && { location: { $regex: location, $options: "i" } }),
      ...(minPrice && { minPrice: { $gte: minPrice } }),
      ...(maxPrice && { maxPrice: { $lte: maxPrice } }),
    };
    const properties = await propertyModel.find(query);
    res.status(200).json({ properties });
  } catch (error) {
    next(new CustomError("Error searching properties", 500));
  }
};
