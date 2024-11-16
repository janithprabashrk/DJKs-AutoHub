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
    <header className="bg-gray-800 shadow-lg">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
            <Link to='/' className="hover:scale-105 transition duration-300">
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-blue-400">DJK&apos;s </span>
                    <span className="text-orange-400">AutoHUB</span>
                </h1>
            </Link>
            <form className="bg-gray-700 p-3 rounded-lg flex items-center border border-gray-600 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/20 mx-4 hover:bg-gray-600/50 transition duration-300">
                <input 
                    type="text" 
                    placeholder="Search..."   
                    className="bg-transparent focus:outline-none w-24 sm:w-64 text-gray-200 placeholder-gray-400"
                    value={searchTerm}
                    onChange = {(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearchSubmit}>
                    <FaSearch className='text-gray-400 hover:text-blue-400 transition duration-300 cursor-pointer'/>
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
    </header>
  )
}
