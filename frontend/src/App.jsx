import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/home'
import Cart from './Pages/Cart/cart'
import Footer from './Components/Footer/Footer'
import LoginPopUp from './Components/LoginPopup/LoginPopUp'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import PaymentSuccess from './PaymentSuccess'
import MyOrders from './Pages/MyOrders/MyOrders'


const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showLogin ? <LoginPopUp setShowLogin = {setShowLogin}/> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder/>} />
          <Route path='/paymentsuccess' element={<PaymentSuccess/>} />
          <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
