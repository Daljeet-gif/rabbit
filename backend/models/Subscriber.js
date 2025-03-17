import mongoose from "mongoose";


const SubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    subscriberAt: {
        type: Date,
        default: Date.now
    }
})


const  Subscriber=mongoose.model("Subscriber",SubscriberSchema) 


export default Subscriber