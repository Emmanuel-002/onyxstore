import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  FaMoneyBill,
} from 'react-icons/fa';
import { MdFormatListNumbered } from 'react-icons/md';
import { setCartItems, updateCartItem } from '../redux/user/userSlice';

export default function Product() {
  SwiperCore.use([Autoplay]);
  const [product, setProduct] = useState(null);
  let [itemCount, setItemCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser, cartItems } = useSelector((state) => state.user);
  let items = cartItems

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/get/${params.productId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setProduct(data);
        items.map(item=>{
          if(item.id===params.productId)
            setItemCount(item.quantity)
        })
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.productId]);

  const addToCart = () =>{
    let cart = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: itemCount,
    };
    if(items.find(item=>item.id===product._id)){
      items=items.map(i=>{
    if(i.id===product._id) return cart
    else return i
    })
    dispatch(setCartItems(items))
  }else {
    dispatch(updateCartItem(cart))
  }
  navigate('/carts')
  }

  const increaseItemCount = () => {
    setItemCount(++itemCount)
  }
  const decreaseItemCount = () => {
    setItemCount(--itemCount)
  }

  return (
    <main className='m-5'>
       {/* <div className='flex flex-col gap-4 flex-1'> */}
       {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {product && !loading && !error && (
        <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1 border-slate' style={{border:'1px solid #e3e3e3',borderRadius:'10px'}}>
          <Swiper
          slidesPerView={'auto'}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  loop={true}
                          autoplay={{
                              delay: 5000,
                              disableOnInteraction: true
                          }}
          >
            {product.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <img src={url}/>
                {/* <div style={{backgroundImage:`url(${url})`}}></div> */}
              </SwiperSlide>
            ))}
          </Swiper>
         
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4 bg-slate-200'>
            <div className='flex gap-4'>
            </div>
            <ul className='text-slate-700 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaMoneyBill className='text-lg' />
                {product.price}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <MdFormatListNumbered className='text-lg' />
                {product.quantity}
              </li>
            </ul>
            <div className='text-white font-semibold text-md flex flex-wrap items-center'>
              <button
                onClick={decreaseItemCount}
                className='bg-slate-700 p-2'
                style={{cursor:'pointer', border:'1px solid #708090'}}
                disabled={itemCount <= 1 ? true : false}
                >
                  -
                </button>
              <span className='text-slate-700 p-2 text-center' 
                style={{width:'5rem', maxWidth:'5rem', border:'1px solid #708090'}}>
                {itemCount}</span>
              <button className='bg-slate-700 p-2'
                style={{cursor:'pointer', border:'1px solid #708090'}}
                disabled={itemCount < product.quantity ? false : true}
                onClick={increaseItemCount}>+
                </button>
                <button className='mx-2 bg-slate-700 p-2' 
                style={{borderRadius:'5px', border:'1px solid #708090'}} 
                onClick={addToCart}>Add to Cart
                </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 flex-1' style={{border:'1px solid #e3e3e3',borderRadius:'10px', padding:'0.6rem'}}>
            <h4 className='text-slate-800' style={{fontSize:'1.5rem', fontWeight:'bold'}}>Description</h4>
            <p>{product.description}</p>
       </div>
        </div>
      )}
    </main>
  );
}
