import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { setCartItems } from '../redux/user/userSlice';

const Carts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
    const back = () => {
        navigate(-1)
    }
    const removeCartItem = (e) => {
      const updatedItem = cartItems.filter(item=>item.id !== e.target.id)
      dispatch(setCartItems(updatedItem))
      location.reload()
    }
  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
    }}
    className='max-w-6xl mx-auto p-3 bg-slate-200 my-3'>

        {totalAmount > 0 && <div style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
      }}
      className='text-slate-700'>
        <div className='font-bold' style={{fontSize:'1.2rem'}}>&#8358;{totalAmount}</div>
        <Link to='/checkout'><button className='bg-slate-700 text-white p-3 rounded border-slate-700'>Checkout</button></Link>
      </div>}

          <div class="relative overflow-x-auto my-2">
        {cartItems.length ? <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 text-center">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" class="px-2 py-2">
                          Product
                      </th>
                      <th scope="col" class="px-2 py-2">
                          Price(&#8358;)
                </th>
                <th scope="col" class="px-2 py-2">
                    Quantity
                </th>
                <th scope="col" class="px-2 py-2">
                    Amount(&#8358;)
                </th>
                <th colSpan={2} scope="col" class="px-2 py-2">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
          {
              cartItems.map(item=>(
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="text-left px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.name}
                </th>
                <td class="px-2 py-2">
                    {item.price}
                </td>
                <td class="px-2 py-2">
                    {item.quantity}
                </td>
                <td class="px-2 py-2">
                    {item.quantity*item.price}
                </td>
                <td className="px-2 py-2">
                    <Link to={`/product/${item.id}`}>
                      <button className='bg-slate-700 text-white uppercase p-2 rounded'>view</button>
                    </Link>
                </td>
                <td class="px-2 py-2">
                  <button id={item.id} onClick={removeCartItem} className='bg-red-900 text-white uppercase p-2 rounded'>remove</button>
                </td>
            </tr>
              ))
          }
        </tbody>
    </table>
  :
  <h4>No item in the cart. <button onClick={back} className='bg-slate-700 text-white uppercase p-2 rounded'>back</button></h4>  
  }
</div>
    </div>
  )
}

export default Carts