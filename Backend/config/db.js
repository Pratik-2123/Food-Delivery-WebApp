import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://pratikpatel2123:7057347707@cluster0.otcrrz1.mongodb.net/food-del').then(() => console.log("DB connected"))
}