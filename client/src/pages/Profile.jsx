import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserSuccess, deleteUserStart, signOutUserStart, signOutUserFailure, signOutUserSuccess } from "../redux/user/userSlice"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import wall1 from '../assets/wall2.png'

// firebase storage
// allow read;
// allow write : if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const [file,setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const[formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const dispatch = useDispatch();
  const [userListings, setUserListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(file){
      handleFileUpload (file);
    }
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
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false){
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  const handleShowListings = () => {
    navigate('/show-listings');
  };

  return (
    <div 
      className="min-h-screen py-10 bg-fixed bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9)), url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80')`
      }}
    >
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-4 lg:my-0">
        <div id="profile" className="w-full rounded-2xl shadow-2xl backdrop-blur-lg bg-white/10 mx-6 lg:mx-0">
          <div className="p-4 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-2/3 order-2 lg:order-1">
                <h1 className="text-4xl font-bold text-center lg:text-left mb-7 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Profile</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input type="text" placeholder="username" defaultValue={currentUser.username} id="username" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" onChange={handleChange} />
                  <input type="email" placeholder="email" defaultValue={currentUser.email} id="email" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" onChange={handleChange}/>
                  <input type="password" placeholder="password" id="password" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                  <button disabled={loading} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        Update
                      </>
                    )}
                  </button>
                  <Link className="bg-gradient-to-r from-green-400 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2" to="/create-listing">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Create Listing
                  </Link>
                </form>
                <div className="flex justify-between mt-5">
                  <span onClick={handleDeleteUser} className="text-red-400 cursor-pointer hover:text-red-300 transition-colors duration-300 flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete Account
                  </span>
                  <span onClick={handleSignOut} className="text-red-400 cursor-pointer hover:text-red-300 transition-colors duration-300 flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Sign out
                  </span>
                </div>
                {error && <p className="text-red-500 mt-5 bg-red-100/10 p-3 rounded-lg text-sm">{error}</p>}
                {updateSuccess && <p className="text-green-500 mt-5 bg-green-100/10 p-3 rounded-lg text-sm">Profile updated successfully!</p>}
                <button 
                  onClick={handleShowListings} 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl mt-5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                  </svg>
                  Show Listings
                </button>
                {showListingsError && <p className="text-red-500 mt-5 bg-red-100/10 p-3 rounded-lg text-sm">Error showing listings</p>}
                {userListings && userListings.length > 0 && (
                  <div className="flex flex-col gap-4 mt-5">
                    <h2 className="text-2xl font-semibold text-cyan-400">Your Listings</h2>
                    {userListings.map((listing) => (
                      <div key={listing._id} className="border border-gray-700 p-3 rounded-lg flex justify-between items-center gap-4 bg-gray-800/30">
                        <Link to={`/listing/${listing._id}`}>
                          <img src={listing.imageUrls[0]} alt="listing cover" className="h-16 w-16 object-cover rounded-lg" />
                        </Link>
                        <Link to={`/listing/${listing._id}`} className="flex-1 text-gray-200 hover:text-cyan-400 transition-colors truncate">
                          <p>{listing.modelName}</p>
                        </Link>
                        <div className="flex flex-col gap-2">
                          <button className="text-red-400 hover:text-red-500 transition-colors">
                            Delete
                          </button>
                          <Link to={`/update-listing/${listing._id}`} className="text-cyan-400 hover:text-cyan-500 transition-colors">
                            Edit
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:w-1/3 order-1 lg:order-2 lg:sticky lg:top-4 flex flex-col items-center justify-center">
                <div className="h-72 w-64 relative cursor-pointer group flex items-center overflow-hidden rounded-2xl" onClick={() => fileRef.current.click()}>
                  {filePerc > 0 && filePerc < 100 ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
                      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      <img 
                        src={formData.avatar || currentUser.avatar} 
                        className="shadow-[0_0_15px_rgba(6,182,212,0.5)] w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        alt="profile"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-blue-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-white text-sm font-medium px-4 py-2 bg-black/30 rounded-full backdrop-blur-sm flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          Change Photo
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
                <p className="text-sm text-center mt-4">
                  {fileUploadError ? (
                    <span className="text-red-500 bg-red-100/10 p-3 rounded-lg">Image upload failed (image must be less than 2mb)</span>
                  ) : filePerc > 0 && filePerc < 100 ? (
                    <span className="text-cyan-400">Uploading {filePerc}%</span>
                  ) : filePerc === 100 ? (
                    <span className="text-green-500 bg-green-100/10 p-3 rounded-lg">Image successfully uploaded!</span>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}