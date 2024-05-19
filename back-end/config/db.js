import mongoose from "mongoose";


export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://tomato:Tomato143@cluster0.viav0dw.mongodb.net/Tomato')
    .then(() => {
        console.log("MongoDB Connected");
    }).catch((err) => {
        console.log(err);
    });
}