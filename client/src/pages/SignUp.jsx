import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [address, setAddress] = useState('');
  // const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    if(e.target.id === 'address'){
      setAddress(e.target.value)
    }
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        setLoading(false);
        setErrorMessage(data.message);
        return;
      }
        setLoading(false);
        setErrorMessage(false);
        navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto bg-slate-200 shadow-md my-3' onClick={()=>{
      errorMessage && setErrorMessage(false)   
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
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Phone Number'
          className='border p-3 rounded-lg'
          id='phoneNumber'
          onChange={handleChange}
        />
         <textarea
          placeholder='Contact Address'
          className='border p-3 rounded-lg'
          id='address'
          onChange={handleChange}
        >{address}</textarea>
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        {/* <OAuth/> */}
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already registered?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  );
}
