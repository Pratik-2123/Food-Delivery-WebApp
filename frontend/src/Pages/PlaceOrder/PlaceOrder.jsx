import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'



const PlaceOrder = () => {

  const { getTotalCartAmount } = useContext(StoreContext)

  const checkOutHandler = async (event) => {
    event.preventDefault()
 
    try {
      const amount = getTotalCartAmount() + 2
      const { data: { key } = {}} = await axios.get("http://localhost:4000/api/getKey")
      const { data: { order } = {}} = await axios.post("http://localhost:4000/api/payment/checkout", {
        amount
      })
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Pratik Patel",
        description: "Test Transaction",
        image: "https://avatars.githubusercontent.com/u/141320778?s=400&u=ea4be5151dfaa5920fd831e836062124f09e90a1&v=4",
        order_id: order.id,
        callback_url: "http://localhost:4000/api/payment/paymentverification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000"
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#121212"
        }
      };
      const razor = new window.Razorpay(options);
      razor.open();


    } catch (error) {
      console.log(error);
      
    }

  }

  

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>
        <input type="email" placeholder='Email address' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip Code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={checkOutHandler}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
