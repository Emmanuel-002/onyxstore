import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/pagination';


export default function User() {
  const params = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
    useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${params.userId}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const deleteUser = async () => {
      try {
        // dispatch(deleteUserStart());
        const res = await fetch(`/api/user/admin/user/delete/${params.userId}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        navigate('/admin/users')
      } catch (error) {
       setErrorMessage(error.message)
      }
    };

  return (

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'
      // onClick={()=>{  
      //   errorMessage && setErrorMessage(false)   
      //   verifySuccess && setVerifySuccess(false)
      // }}
      >
      {/* {
          errorMessage && (
            <div className="bg-red-800 border border-red-400 text-white-700 px-4 py-3 rounded sticky top-0 right-0" role="alert">
                {errorMessage}
              <button onClick={()=>setErrorMessage(false)} class="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          )
        }
        {
          verifySuccess && (
            <div className="bg-green-800 border border-green-400 text-white-700 px-4 py-3 rounded sticky top-0 right-0" role="alert">
                {verifySuccess}
              <button onClick={()=>updateSuccess(false)} class="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          )
        } */}
        
      <h3>User Account</h3>
      {user &&
        <div class="relative overflow-x-auto">
        <table>
          <tbody className='p-3'>
            <tr>
              {user.username && <td className='p-3'>Name</td>}
              <td className='p-3'>{user.username}</td>
            </tr>
            <tr>
              {user.email && <td className='p-3'>Email</td>}
              <td className='p-3'>{user.email}</td>
            </tr>
            <tr>
              {user.phoneNumber && <td className='p-3'>Phone Number</td>}
              <td className='p-3'>{user.phoneNumber}</td>
            </tr>
            <tr>
              {user.address && <td className='p-3'>Address</td>}
              <td className='p-3'>{user.address}</td>
            </tr>
          </tbody>
        </table>
            <button className='bg-red-800 text-white uppercase m-2 p-2 rounded' onClick={deleteUser}>Delete</button>
      </div>
      }
      </div>
  );
}
