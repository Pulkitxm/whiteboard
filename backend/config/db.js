import mongoose from "mongoose";
import "dotenv/config";

try {
    const isDevMode = process.env.NODE_ENV === 'production';
    const uri = !isDevMode ? process.env.DEV_MONGO_URI : process.env.MONGO_URI;
    console.log(process.env.NODE_ENV,uri);
    mongoose.connect(uri).then(() => {
        console.log("MongoDB connected");
    });
    console.log("MongoDB connected");
} catch (err) {
    console.log(err);
}