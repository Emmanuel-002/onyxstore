import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
// import SwiperCore from 'swiper';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ProductItem from '../components/ProductItem';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  const [products, setProducts] = useState([]);
  SwiperCore.use([Autoplay]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/product/get');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div >
      {/* top */}
      <div className='flex flex-col gap-6 p-20 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
        Connect with Store
        </h1>
        <div className='text-gray-800 text-xs sm:text-sm'>
<         span>Buy</span> at affordable price and enjoy prompt delivery. <br />
          OnyxStore is the best place to find your next perfect product.
          <br />
          We have a wide range of products for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Show Products...
        </Link>
      </div>


      {/* Recent Products */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {products && products.length > 0 && (
          <div className='bg-slate-200 shadow-md p-3'>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Products</h2>
            </div>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={20}
                pagination={{
                clickable: true,
                }}
                modules={[Pagination]}
                loop={true}
                autoplay={{
                delay: 5000,
                disableOnInteraction: true,
               }}
              >
            <div className='flex flex-wrap gap-4'>
              {products.map((product, index) => {
                if(index < 5){
                  return (
                    <SwiperSlide className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
                      <ProductItem product={product} key={product._id} />
                    </SwiperSlide>
                  )
                }
              })}
            </div>
            </Swiper>
          </div>
        )}
      </div>
      
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {products && products.length > 0 && products.find(product=>product.category==='diary & egg') && (
          <div className='bg-slate-200 shadow-md p-3'>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Diary & Eggs</h2>
            </div>
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
            <div className='flex flex-wrap gap-4'>
              {products.map((product) => {
                if(product.category === 'diary & egg'){
                  return (
                    <SwiperSlide className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
                      <ProductItem product={product} key={product._id} />
                    </SwiperSlide>
                  )
                }
              }) || 'No item found'}
            </div>
            </Swiper>
          </div>
        )}
      </div>
      
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {products && products.length > 0 && products.find(product=>product.category==='flour & flakes') && (
          <div className='bg-slate-200 shadow-md p-3'>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Flour and Flakes</h2>
            </div>
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
                disableOnInteraction: true,
               }}
              >
            <div className='flex flex-wrap gap-4'>
              {products.map((product) => {
                if(product.category === 'flour & flake'){
                  return (
                    <SwiperSlide className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
                      <ProductItem product={product} key={product._id} />
                    </SwiperSlide>
                  )
                }
              }) || 'No item found'}
            </div>
            </Swiper>
          </div>
        )}
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {products && products.length > 0 && products.find(product=>product.category==='grain & pulse') && (
          <div className='bg-slate-200 shadow-md p-3'>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Grains & Pulses</h2>
            </div>
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
                disableOnInteraction: true,
               }}
              >
            <div className='flex flex-wrap gap-4'>
              {products.map((product) => {
                if(product.category === 'grain & pulse'){
                  return (
                    <SwiperSlide className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
                      <ProductItem product={product} key={product._id} />
                    </SwiperSlide>
                  )
                }
              }) || 'No item found'}
            </div>
            </Swiper>
          </div>
        )}
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {products && products.length > 0 && products.find(product=>product.category==='oil') && (
          <div className='bg-slate-200 shadow-md p-3'>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Oil</h2>
            </div>
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
                disableOnInteraction: true,
               }}
              >
            <div className='flex flex-wrap gap-4'>
              {products.map((product) => {
                if(product.category === 'oil'){
                  return (
                    <SwiperSlide className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
                      <ProductItem product={product} key={product._id} />
                    </SwiperSlide>
                  )
                }
              }) || 'No item found'}
            </div>
            </Swiper>
          </div>
        )}
      </div>

    </div>
  );
}
