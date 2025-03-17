import express from "express"

import Product from "../models/Product.js"
import { protect } from "../middleware/authMiddleware.js"
import { admin } from "../middleware/authMiddleware.js"
import Subscriber from "../models/Subscriber.js"

const router = express.Router()


router.post("/subscribe", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }

    try {


        let subscribe = await Subscriber.findOne({ email });

        if (subscribe) {
            return res.status(400).json({ message: "email is already exists" })
        }

        subscribe = new Subscriber({ email });
        await subscribe.save()

        res.status(201).json({ message: "successfully subscribed to the newsletter" })


    } catch {
        console.log(error);
        res.status(500).send("server Error")

    }
})



export default router