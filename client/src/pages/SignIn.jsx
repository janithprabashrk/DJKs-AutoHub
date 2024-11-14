import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const[formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      if(data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }

  };

  return (
    <div className="min-h-[95vh] bg-fixed bg-cover bg-center py-6 flex items-center justify-center" style={{backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9)), url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1883&auto=format&fit=crop')`, backgroundAttachment: "fixed", backgroundBlendMode: "normal, overlay"}}>
    <div className="max-w-screen-lg mx-auto bg-gray-800/50 backdrop-blur-sm shadow-2xl shadow-blue-500/20 sm:rounded-lg flex justify-center flex-1">
    <div className="lg:w-1/2 xl:w-5/12 p-3 sm:p-6">
    <div>
    <h1 className="font-bold text-2xl flex flex-wrap justify-center">
    <span className="text-blue-400">DJK&apos;s </span>
    <span className="text-orange-400">AutoHUB</span>
    </h1>
    </div>
    <div className="mt-6 flex flex-col items-center">
    <h1 className="text-2xl xl:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
    Sign In
    </h1>
    <div className="w-full flex-1 mt-5">
    <div className="flex flex-col items-center">
    <OAuth />
    </div>
    <div className="my-6 border-b border-gray-700 text-center">
    <div className="leading-none px-3 inline-block text-sm text-gray-400 tracking-wide font-medium bg-gray-800 transform translate-y-1/2">
    Or sign in with e-mail
    </div>
    </div>
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm">
    <input
    type="email"
    placeholder="Email"
    id="email"
    onChange={handleChange}
    className="w-full px-7 py-4 rounded-lg font-medium bg-gray-700 border border-gray-600 placeholder-gray-400 text-base focus:outline-none focus:border-blue-400 focus:bg-gray-800 focus:ring-2 focus:ring-blue-400/20"
    />
    <input
    type="password"
    placeholder="Password"
    id="password"
    onChange={handleChange}
    className="w-full px-7 py-4 rounded-lg font-medium bg-gray-700 border border-gray-600 placeholder-gray-400 text-base focus:outline-none focus:border-blue-400 focus:bg-gray-800 mt-5 focus:ring-2 focus:ring-blue-400/20"
    />
    <button
    disabled={loading}
    className="mt-5 tracking-wide font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-gray-100 w-full py-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-80"
    >
    {loading ? 'Loading...' : 'Sign In'}
    </button>
    </form>
    <div className="mt-5 text-base text-gray-400 text-center mb-4">
    <p>Don&apos;t have an account?
    <Link to="/sign-up">
    <span className="border-b border-gray-500 border-dotted ml-2 text-blue-400 hover:text-blue-300">Sign up</span>
    </Link>
    </p>
    {error && <p className="text-red-400 mt-4">{error}</p>}
    </div>
    </div>
    </div>
    </div>
    <div className="flex-1 bg-gray-800/50 backdrop-blur-sm text-center hidden lg:flex">
    <div className="m-6 xl:m-10 w-full bg-contain bg-center bg-no-repeat opacity-75" 
    style={{backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')"}}
    >
    </div>
    </div>
    </div>
    </div>
  )
}