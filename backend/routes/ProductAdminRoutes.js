import express from "express"

import Product from "../models/Product.js"
import { protect } from "../middleware/authMiddleware.js"
import { admin } from "../middleware/authMiddleware.js"

const router = express.Router()




router.get("/", protect, admin, async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "server Error" })
    }
})



export default router