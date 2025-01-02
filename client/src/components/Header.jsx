import {FaSearch} from 'react-icons/fa';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
export default function Header() {
    const {currentUser} = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearchSubmit = async (e) => {
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
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
        <div className="backdrop-blur-lg bg-black/30 border-b border-transparent">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
                <Link to='/' className="hover:scale-105 transition duration-300">
                    <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                        <span className="text-blue-400">DJK&apos;s </span>
                        <span className="text-orange-400">AutoHUB</span>
                    </h1>
                </Link>
                <form className="relative p-3 rounded-2xl flex items-center mx-4 group">
                    <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-cyan-400/50 group-hover:bg-white/10 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"></div>
                    <input 
                        type="text" 
                        placeholder="Search..."   
                        className="relative bg-transparent focus:outline-none w-24 sm:w-64 text-gray-200 placeholder-gray-400 z-10"
                        value={searchTerm}
                        onChange = {(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearchSubmit} className="relative z-10 p-2 rounded-full hover:bg-white/10 transition-colors duration-300">
                        <FaSearch className='text-gray-400 group-hover:text-cyan-400 transition duration-300 cursor-pointer'/>
                    </button>
                </form>
                <ul className='flex gap-6'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-gray-300 hover:text-blue-400 hover:scale-110 transition duration-300 relative group'>
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-gray-300 hover:text-blue-400 hover:scale-110 transition duration-300 relative group'>
                            About
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                        </li>
                    </Link>
                    <Link to='/profile' className="ml-auto">
                    {currentUser ? (
                        <img className='rounded-full h-7 w-7 object-cover ring-2 ring-blue-400 hover:ring-4 hover:scale-110 transition duration-300' src={currentUser.avatar} alt="profile" />
                    ): (
                        <li className='text-gray-300 hover:text-blue-400 hover:scale-110 transition duration-300'>Sign in</li>
                    )}
                    </Link>
                </ul>
            </div>   
        </div>
    </header>
  )
}
