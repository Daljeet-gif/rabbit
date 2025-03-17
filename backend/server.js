import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import UserRoutes from "./routes/userRoutes.js"
import ProductRoutes from "./routes/productRoutes.js"
import CartRoutes from "./routes/CartRoutes.js"
import CheckoutRoutes from "./routes/CheckoutRoutes.js"
import OrderRoutes from "./routes/OrderRoutes.js"
import UploadRoutes from "./routes/UploadRoutes.js"
import Subscriber from "./routes/Subscriber.js"
import adminRoutes from "./routes/adminRoutes.js"
import ProductAdminRoutes from "./routes/ProductAdminRoutes.js"
import adminOrderRoutes from "./routes/adminOrderRoutes.js"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors());

const port = process.env.PORT

app.get("/", (req, res) => {
    res.send("WELCOME TO RABBIT APP")
})



connectDB()

app.use("/api/users",UserRoutes)
app.use("/api/products",ProductRoutes)
app.use("/api/cart",CartRoutes)
app.use("/api/checkout",CheckoutRoutes)
app.use("/api/orders",OrderRoutes)
app.use("/api/Upload",UploadRoutes)
app.use("/api/",Subscriber)
app.use("/api/admin/users",adminRoutes)
app.use("/api/admin/products",ProductAdminRoutes)
app.use("/api/admin/orders",adminOrderRoutes)

app.listen(port, () => {
    console.log(`SERVER RUN AT PORT : ${port}`);

})