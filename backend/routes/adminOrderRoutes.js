import express from "express"

import { admin, protect } from "../middleware/authMiddleware.js"
import Order from "../models/Order.js"

const router = express.Router()


router.get("/", protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email")
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "server Error" })
    }
})


router.put("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
    
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? Date.now() : order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }

    } catch (error) {
        console.error("Update Order Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});





router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order) {
            await order.deleteOne();
            res.json({ message: "Order deleted" })
        } else {
            res.status(404).json({ message: "Order not founded" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "server Error" })
    }
})



export default router