import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

export const addFoodItem = async (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file.filename;

  const food = new foodModel({
    name,
    description,
    image,
    price,
    category,
  });

  try {
    await food.save();
    res.status(201).json({
        success: true,
        message: "Food item added successfully",
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const getFoodItems = async (req, res) => {
  try {
    const foodItems = await foodModel.find();
    res.status(200).json({
        success: true,
        data: foodItems,
    });
  } catch (error) {
    res.status(404).json({ 
        success: false,
        message: error.message 
    });
  }
}

export const deleteFoodItem = async (req, res) => {
  const id = req.params.id;
  try {
    const foodItem = await foodModel.findById(id);
    fs.unlink(`uploads/${foodItem.image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    await foodModel.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Food item deleted successfully",
    });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    } 
}

// delete all
export const deleteAllFoodItems = async (req, res) => {
    try {
        const foodItems = await foodModel.find();
        foodItems.forEach((item) => {
            fs.unlink(`uploads/${item.image}`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
        await foodModel.deleteMany();
        res.status(200).json({
            success: true,
            message: "All food items deleted successfully",
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

export const addBulkFoodItems = async (req, res) => {
    const foodItems = JSON.parse(req.body.foodItems);
    const files = req.files;

    try {
        foodItems.forEach((item, index) => {
            const file = files.find(file => file.originalname === item.image);
            if (file) {
                // Update the image path in the food item
                item.image = file.filename;
            }
        });

        await foodModel.insertMany(foodItems);
        res.status(201).json({
            success: true,
            message: "Bulk food items added successfully",
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}