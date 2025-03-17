import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DR_URL)
        console.log("MONGODB CONNECTED SUCCSSFULLY");

    } catch (error) {
        console.error("MONGODB DATABASE CONNECTION FAILED",error)
        process.exit(1)
    }
}

export  default connectDB