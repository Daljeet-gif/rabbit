import express from "express"

import { protect } from "../middleware/authMiddleware.js"

import Cart from "../models/Cart.js"
import Order from "../models/Order.js"
import Checkout from "../models/Checkout.js"
import mongoose from "mongoose"
const router = express.Router()





router.post("/", protect, async (req, res) => {
  
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    // ✅ Check if checkoutItems is an array before checking length
    if (!checkoutItems || !Array.isArray(checkoutItems) || checkoutItems.length === 0) {
        return res.status(400).json({ message: "No items in Checkout" });
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems:checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false
        });

        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Checkout Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body

    try {
        const checkout = await Checkout.findById(req.params.id)

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not founded" })
        }

        if (paymentStatus === "paid") {
            checkout.isPaid = true,
                checkout.paymentStatus = paymentStatus,
                checkout.paymentDetails = paymentDetails,
                checkout.paidAt = Date.now()

            await checkout.save();

            res.status(200).json(checkout)
        } else {
            res.status(404).json({ message: "Invalid Payemnt Status" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server Error"})

    }

})


router.post("/:id/finalize", protect, async (req, res) => {
    try {

        const checkout = await Checkout.findById(req.params.id)

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not founded" })
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMehtod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentMethod: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails
            })

            checkout.isFinalized = true,
                checkout.finalizedAt = Date.now()
            await checkout.save()

        
            await Cart.findOneAndDelete({ user: new mongoose.Types.ObjectId(checkout.user) });
            


            res.status(201).json(finalOrder)
        } else if (checkout.isFinalized) {
            res.status(400).json({ message: "checkout Already finalized" })
        } else {
            res.status(400).json({ message: "Checkout is not paid" })
        }



    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server Error"})

    }
})
export default router