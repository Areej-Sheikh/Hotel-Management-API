const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username Is Required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email Is Required"],
      unique: true,
      validate: {
        validator: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Please enter a valid email address.",
      },
    },
    password: {
      type: String,
      required: [true, "Password Is Required"],
    },
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

userSchema.statics.authenticate = async (email,password)=>{
    const user = await this.findOne({ email }).select('+password') ;
    if(!user){
        throw new Error("Invalid Email or Password");
    }
    const IsMatch = await bcrypt.compare(password, user.password); 
    if(!IsMatch){
        throw new Error("Invalid Email or Password");
    }
    return user;
}
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})
module.exports = mongoose.model("User", userSchema);
