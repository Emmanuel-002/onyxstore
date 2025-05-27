import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: currentUser.avatar,
    username: currentUser.username,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
    address: currentUser.address,
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [address, setAddress] = useState(currentUser.address);
  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
    // const fetchUser = async () => {
    //   const res = await fetch(`/api/user/${currentUser._id}`);
    //   const data = await res.json();
    //   if (data.success === false) {
    //     console.log(data.message);
    //     return;
    //   }
    //   setFormData(data);
    // };

    // fetchUser();
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        // setFileUploadError(true);
        setErrorMessage(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    if(e.target.id === 'address'){
      setAddress(e.target.value)
      console.log(formData)
    }
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // dispatch(updateUserFailure(data.message));
        setErrorMessage(data.message)
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      // dispatch(updateUserFailure(error.message));
      setErrorMessage(error.message)
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        // dispatch(deleteUserFailure(data.message));
        setErrorMessage(data.message)
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      // dispatch(deleteUserFailure(error.message));
      setErrorMessage(error.message)
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        // dispatch(deleteUserFailure(data.message));
        setErrorMessage(data.message)
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      // dispatch(deleteUserFailure(data.message));
      setErrorMessage(error.message)
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto' onClick={()=>{
      updateSuccess && setUpdateSuccess(false)   
      errorMessage && setErrorMessage(false)   
    }}>
      {
        updateSuccess && (
          <div role="alert" className="bg-green-800 border border-red-400 text-white-700 px-4 py-3 rounded sticky top-0">
            User updated successfully
            <button onClick={()=>setUpdateSuccess(false)} class="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        )
      }
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
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-slate-200 shadow-md p-3'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
        />
         <input
          type='text'
          defaultValue={currentUser.phoneNumber}
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
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        {
          currentUser.isAdmin===true && <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to={'/create-product'}
        >
          Create Product
        </Link>
        }
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-white cursor-pointer bg-red-800 p-3 rounded'
        >
          Delete account
        </span>
        <span 
          onClick={handleSignOut} 
          className='text-white cursor-pointer bg-slate-700 p-3 rounded'
          >
          Sign out
        </span>
      </div>
      {
        currentUser.isAdmin===true && <Link to={`/admin/products`}>
        <button className='text-white w-full bg-violet-700 my-3 p-3 rounded'>Show Products</button>
      </Link>
      }
    </div>
  );
}