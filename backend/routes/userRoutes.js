import express from "express"
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()


router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "User already exists" })

        user = new User({ name, email, password })
        await user.save()

        const payload = { user: { id: user._id, role: user.role } }
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" },
            (err, token) => {
                if (err) throw err;

                res.status(201).json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }, token
                })

            })

    } catch (error) {
        res.status(500).send("Server Error")
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "User doesn't exists" })
        const isMatch = await user.matchPassword(password)

        if (!isMatch) return res.status(400).json({ message: "inValid credientials" })

        const payload = { user: { id: user._id, role: user.role } }
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" },
            (err, token) => {
                if (err) throw err;

                res.status(200).json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }, token
                })

            })

    } catch (error) {
        res.status(500).send("Server Error", error)
    }



})

router.get("/profile", protect, async (req, res) => {
    res.json(req.user)
})

export default router