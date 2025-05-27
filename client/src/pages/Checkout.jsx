import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { usePaystackPayment } from 'react-paystack';



const Checkout = () => {
  const {cartItems} = useSelector((state) => state.user)
  const [totalAmount, setTotalAmount] = useState(0)
  useEffect(() => {
    let sum = 0
    cartItems.forEach(item => {
      const amount = item.price * item.quantity
      sum += amount
    });
    setTotalAmount(sum)
  },[cartItems])
  const config = {
    reference: (new Date()).getTime().toString(),
    email:'emmanuelaraoye794@gmail.com',
    amount: totalAmount*100,
    publicKey: 'pk_test_57c80cb6bf5905138f51f5357decc373cb3d9fb9'
  };
  const onSuccess = (reference) => {
    console.log(reference);
  };

  const onClose = () => {
    console.log('closed')
  }
  const Checkout = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'80vh'}}>
          <p className='text-slate-700'>Pay Total Amount</p>
          <p className='text-slate-700'>&#8358;{totalAmount}</p>
          <button
            className='bg-slate-700 p-2 border-1 text-white font-bold rounded'
           onClick={() => {
              initializePayment(onSuccess, onClose)
          }}>Proceed to Payment</button>
      </div>
    );
};
   
  return (
    <Checkout />
  )
}
export default Checkout