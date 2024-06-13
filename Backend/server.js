import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import Razorpay from "razorpay"


// for payment integration
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });


// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB()

// api endpoint
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API WORKING")
})

app.listen(port,()=> {
    console.log(`Server Started on https://localhost:${port}`) 
})

// mongodb+srv://pratikpatel2123:7057347707@cluster0.otcrrz1.mongodb.net
