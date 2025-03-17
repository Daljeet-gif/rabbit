import express from "express"

import Product from "../models/Product.js"
import { protect } from "../middleware/authMiddleware.js"
import { admin } from "../middleware/authMiddleware.js"
import Cart from "../models/Cart.js"
import User from "../models/User.js"

const router = express.Router()



router.get("/", protect, admin, async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "server Error" })
    }
})

router.post("/", protect, admin, async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });


        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        user = new User({
            name, email, password, role: role || "customer",

        })

        await user.save()

        res.status(201).json({ message: "User created successfully", user })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "server Error" })
    }
})

router.put("/:id", protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;

        }

        const updatedUser = await user.save();
        res.json({ message: "User updated successfully", user: updatedUser })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "server Error" })
    }
})

router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne()
            res.json({ message: "User deleted successfuly" })
        } else {
            res.status(404).json({ message: "User not founded" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "server Error" })
    }
})



export default router