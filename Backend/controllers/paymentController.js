import { instance } from "../server.js"
import crypto from "crypto"
import 'dotenv/config'

export const checkOut = async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };

    try {
        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
};

export const paymentVerification = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
        .update(body.toString())
        .digest("hex")

    console.log("sig recieved", razorpay_signature)
    console.log("sig generated", expectedSignature)

    const isAuthentic = expectedSignature === razorpay_signature

    if(isAuthentic) {
        // database comes here


        res.redirect(`http://localhost:5173/paymentsuccess?.reference=${razorpay_payment_id}`)
    } else {
        res.status(400).json({success:false})
    }

    
};
