import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel
        .findOne({ email })
        .select("+password")
        .exec();
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
            type: 'email'
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid password",
            type: 'password'
        })
    }
    const token = createToken(user._id);
    res.status(200).json({
        success: true,
        token,
        message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(404).json({
        success: false,
        message: error.message,
    });
  }
}

// register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {

    // check for valid email
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email",
            type : 'email'
        });
    }

    // check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
            type : 'email'
        });
    }

    // check for strong password
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character",
            type : 'password'
        });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new userModel({
        name,
        email,
        password: hashedPassword,
    });

    const newUser = await user.save();
    const token = createToken(newUser._id);
    
    res.status(201).json({
        success: true,
        token,
        message: "User registered successfully",
    });
  } catch (error) {
    res.status(409).json({
        success: false,
        message: error.message,
    });
  }
}
