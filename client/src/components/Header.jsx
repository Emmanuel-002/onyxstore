import { FaCartPlus, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser, cartItems } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemCount, setItemCount] = useState(0)
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  useEffect(() => {
    let count = 0
    cartItems.map(cartItem=>{
      setItemCount(count+=cartItem.quantity)
    })
  },[cartItems])
  return (
    <header className='bg-slate-200 shadow-md' style={{position:'sticky',top:0,zIndex:2}}>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Store</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
          {/* <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link> */}
          {/* <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link> */}
          {
            currentUser && <Link to='/carts'>
              <li className='text-slate-700 hover:underline'>
                <div style={{display:'flex', flexDirection:'row'}}>
                <FaCartPlus className='text-slate-700 h-7 w-7' />
                <sup className='text-white font-bold bg-slate-700 mb-3 p-2 rounded-full'>{itemCount}</sup>
                </div>
            </li>
          </Link>
          }
          
            {currentUser ? (
              <Link to='/profile'>
                <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
               </Link>
            ) : (
              <Link to='/sign-in'>
              <li className=' text-slate-700 hover:underline'> Sign in</li>
              </Link>
            )}
         
        </ul>
      </div>
    </header>
  );
}
