import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/pagination';


export default function Products() {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
    
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/product/get');
        const data = await res.json();
        setProducts(data);
        setVerifySuccess(true)
      } catch (error) {
        setErrorMessage(error.message)     
      }
    };
    fetchProducts();
  }, []);

  return (
            <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'onClick={()=>{  
              errorMessage && setErrorMessage(false)   
              verifySuccess && setVerifySuccess(false)
            }}>
            {
                errorMessage && (
                  <div className="bg-red-800 border border-red-400 text-white-700 px-4 py-3 rounded sticky top-0 right-0" role="alert">
                      {errorMessage}
                    <button onClick={()=>setErrorMessage(false)} class="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                )
              }
              {/* {
                verifySuccess && (
                  <div className="bg-green-800 border border-green-400 text-white-700 px-4 py-3 rounded sticky top-0 right-0" role="alert">
                      {verifySuccess}
                    <button onClick={()=>updateSuccess(false)} class="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                )
              } */}
             {products && products.length ? 
              <>
            <h3>Products</h3>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price (&#8358;)
                      </th>
                      <th scope="col" class="px-6 py-3">
                          In Stock
                      </th>
                      <th scope="col" colSpan={2} class="px-6 py-3 text-center">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                {
                    products.map(product=>(
                      <tr key={product._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {product.name}
                      </th>
                      <td class="px-6 py-4">
                          {product.category}
                      </td>
                      <td class="px-6 py-4">
                          {product.price}
                      </td>
                      <td class="px-6 py-4">
                          {product.quantity}
                      </td>
                      <td class="px-6 py-4">
                      <Link to={`/product/${product._id}`}>
                        <button className='bg-green-800 text-white uppercase m-2 p-2 rounded'>View</button>
                      </Link>
                      </td>
                      <td class="px-6 py-4">
                        <Link to={`/update-product/${product._id}`}>
                          <button className='text-green-700 uppercase'>Edit</button>
                        </Link>
                      </td>
                  </tr>
                    ))
                }
              </tbody>
          </table>
      </div>
      </>
     :
    errorMessage && <p className='text-center my-8'><span className='py-3 px-1 bg-red-700 rounded text-white'>No Product was found!</span></p>}
  </div>
        );
}