import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { motion } from 'framer-motion';

export default function SignIn() {
  const[formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backgroundImages = [
    'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1974&auto=format&fit=crop', // Lamborghini
    'https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=2000&auto=format&fit=crop', // Porsche
    'https://images.unsplash.com/photo-1617654112368-307921291f42?q=80&w=1974&auto=format&fit=crop', // Ferrari
    'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2070&auto=format&fit=crop', // McLaren
  ];

  const imageCaptions = [
    'Experience automotive perfection at its finest',
    'Where luxury meets uncompromising performance',
    'Engineered for those who demand excellence',
    'The future of supercars is here',
   ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[60vh] bg-fixed bg-cover bg-center flex items-center justify-center transition-all duration-1000 ease-in-out py-28" 
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('${backgroundImages[currentImageIndex]}')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover"
      }}>
      <div className="min-h-[40vh] max-w-screen-xl mx-auto bg-black/30 backdrop-blur-md shadow-2xl shadow-blue-500/20 sm:rounded-2xl flex justify-center flex-1 overflow-hidden">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="font-bold text-3xl flex flex-wrap justify-center gap-2">
              <span className="text-blue-400 hover:text-blue-300 transition-colors duration-300">DJK&apos;s</span>
              <span className="text-orange-400 hover:text-orange-300 transition-colors duration-300">AutoHUB</span>
            </h1>
          </motion.div>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-8 flex flex-col items-center"
          >
            <h1 className="text-3xl xl:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent hover:from-blue-500 hover:via-purple-600 hover:to-orange-500 transition-all duration-300">
              Welcome Back
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <OAuth />
              </div>
              <div className="my-8 border-b border-gray-600" />
              <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-6">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  placeholder="Enter your email address"
                  id="email"
                  onChange={handleChange}
                  className="w-full px-7 py-4 rounded-lg font-medium bg-gray-800/50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:border-blue-400 focus:bg-gray-900/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  onChange={handleChange}
                  className="w-full px-7 py-4 rounded-lg font-medium bg-gray-800/50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:border-blue-400 focus:bg-gray-900/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="tracking-wide font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-gray-100 w-full py-4 rounded-lg hover:opacity-90 transition-all duration-300 ease-in-out flex items-center justify-center focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-80"
                >
                  <span className="ml-3">
                    {loading ? 'Authenticating...' : 'Sign In'}
                  </span>
                </motion.button>
              </form>
              <div className="mt-8 text-sm text-gray-400 text-center">
                <p>New to DJK&apos;s AutoHUB?
                  <Link to="/sign-up">
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="border-b border-gray-500 border-dotted ml-2 text-blue-400 hover:text-blue-300"
                    >
                      Create an Account
                    </motion.span>
                  </Link>
                </p>
                {error && <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 mt-4"
                >
                  {error}
                </motion.p>}
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex flex-1 bg-black/20 backdrop-blur-sm items-center justify-center p-12"
          style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${backgroundImages[currentImageIndex]}')`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>
          <div className="max-w-md">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 120, damping: 10 }}
              className="text-white font-bold text-3xl mb-6"
            >
              {imageCaptions[currentImageIndex]}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 120, damping: 10 }}
              className="text-gray-300"
            >
              Step into a world of automotive excellence. Access exclusive listings, connect with verified sellers, and explore our curated collection of premium vehicles. Your perfect car awaits in our prestigious marketplace.
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}