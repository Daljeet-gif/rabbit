import mongoose from "mongoose";
import dotenv from "dotenv"
import Product from "./models/Product.js";
import User from "./models/User.js";
import Cart from "./models/Cart.js";
import products from "./data/products.js"

dotenv.config()

mongoose.connect(process.env.DR_URL)


const seedData=async()=>{
    try {
        await Product.deleteMany()
        await User.deleteMany()
        await Cart.deleteMany()


        const createdUser=await User.create({
            name:"Daljeet ",
            email:"singhdaljeet6283@gmail.com",
            password:"Moddi75@",
            role:"admin"
        })

        const userID=createdUser._id;
        const sampleProducts=products.map((product)=>{
            return {...product,user:userID}
        })

        await Product.insertMany(sampleProducts)
        console.log("Product data seeded successfully");
        process.exit()
        
    } catch (error) {
        console.error("Error seeding the data",error);
        process.exit(1);
    }
}

seedData()
