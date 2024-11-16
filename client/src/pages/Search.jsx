import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        minPrice: '',
        maxPrice: '',
        minMileage: '',
        maxMileage: '',
        fuelType: 'all',
        transmissionType: 'all',
        sort: 'created_desc'
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const minPriceFromUrl = urlParams.get('minPrice');
        const maxPriceFromUrl = urlParams.get('maxPrice');
        const minMileageFromUrl = urlParams.get('minMileage');
        const maxMileageFromUrl = urlParams.get('maxMileage');
        const fuelTypeFromUrl = urlParams.get('fuelType');
        const transmissionTypeFromUrl = urlParams.get('transmissionType');
        const sortFromUrl = urlParams.get('sort');

        if (
            searchTermFromUrl ||
            typeFromUrl ||
            minPriceFromUrl ||
            maxPriceFromUrl ||
            minMileageFromUrl ||
            maxMileageFromUrl ||
            fuelTypeFromUrl ||
            transmissionTypeFromUrl ||
            sortFromUrl
        ) {
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                minPrice: minPriceFromUrl || '',
                maxPrice: maxPriceFromUrl || '',
                minMileage: minMileageFromUrl || '',
                maxMileage: maxMileageFromUrl || '',
                fuelType: fuelTypeFromUrl || 'all',
                transmissionType: transmissionTypeFromUrl || 'all',
                sort: sortFromUrl || 'created_desc',
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            try {
                console.log('Fetching with query:', searchQuery);
                const res = await fetch(`/api/listing/get?${searchQuery}`);
                const data = await res.json();
                console.log('Search results:', data);
                if (data.length > 8) {
                    setShowMore(true);
                }
                setListings(data);
                setLoading(false);
            } catch (error) {
                console.log('Search error:', error);
                setLoading(false);
            }
        };

        fetchListings();
    }, [location.search]);

    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'sale') {
            setSidebarData({ ...sidebarData, type: e.target.id });
        }
        if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }
        if (e.target.id === 'minPrice' || e.target.id === 'maxPrice' || 
            e.target.id === 'minMileage' || e.target.id === 'maxMileage') {
            setSidebarData({ ...sidebarData, [e.target.id]: e.target.value });
        }
        if (e.target.id === 'sort') {
            setSidebarData({ ...sidebarData, sort: e.target.value });
        }
        if (e.target.id === 'fuelType') {
            setSidebarData({ ...sidebarData, fuelType: e.target.value });
        }
        if (e.target.id === 'transmissionType') {
            setSidebarData({ ...sidebarData, transmissionType: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('minPrice', sidebarData.minPrice);
        urlParams.set('maxPrice', sidebarData.maxPrice);
        urlParams.set('minMileage', sidebarData.minMileage);
        urlParams.set('maxMileage', sidebarData.maxMileage);
        urlParams.set('fuelType', sidebarData.fuelType);
        urlParams.set('transmissionType', sidebarData.transmissionType);
        urlParams.set('sort', sidebarData.sort);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        
        try {
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length < 9) {
                setShowMore(false);
            }
            setListings([...listings, ...data]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="min-h-screen bg-fixed bg-cover bg-center py-20" style={{backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9)), url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1883&auto=format&fit=crop'), url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop')`, backgroundAttachment: "fixed", backgroundBlendMode: "normal, overlay"}}>
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                    <form onSubmit={handleSubmit} className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-300 font-semibold">Search Term:</label>
                                <input
                                    type='text'
                                    id='searchTerm'
                                    placeholder='Search...'
                                    className='w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                    value={sidebarData.searchTerm}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-gray-300 font-semibold">Type:</label>
                                <div className="flex gap-4">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type='checkbox'
                                            id='all'
                                            className="sr-only peer"
                                            onChange={handleChange}
                                            checked={sidebarData.type === 'all'}
                                        />
                                        <div className="w-11 h-6 bg-gray-700/50 border-2 border-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-blue-500 peer-checked:border-cyan-400 peer-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] after:shadow-md peer-checked:after:shadow-cyan-200/50"></div>
                                        <span className="ml-3 text-gray-200 select-none">All</span>
                                    </label>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type='checkbox'
                                            id='sale'
                                            className="sr-only peer"
                                            onChange={handleChange}
                                            checked={sidebarData.type === 'sale'}
                                        />
                                        <div className="w-11 h-6 bg-gray-700/50 border-2 border-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-blue-500 peer-checked:border-cyan-400 peer-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] after:shadow-md peer-checked:after:shadow-cyan-200/50"></div>
                                        <span className="ml-3 text-gray-200 select-none">For Sale</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-gray-300 font-semibold">Price Range:</label>
                                <div className="flex gap-4">
                                    <div className="relative w-full">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">LKR :</span>
                                        <input
                                            type='number'
                                            id='minPrice'
                                            className='w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 pl-14 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                            placeholder='Min Price'
                                            value={sidebarData.minPrice}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="relative w-full">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">LKR :</span>
                                        <input
                                            type='number'
                                            id='maxPrice'
                                            className='w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 pl-14 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                            placeholder='Max Price'
                                            value={sidebarData.maxPrice}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-gray-300 font-semibold">Mileage Range:</label>
                                <div className="flex gap-4">
                                    <div className="relative w-full">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">km :</span>
                                        <input
                                            type='number'
                                            id='minMileage'
                                            className='w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 pl-14 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                            placeholder='Min Mileage'
                                            value={sidebarData.minMileage}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="relative w-full">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">km :</span>
                                        <input
                                            type='number'
                                            id='maxMileage'
                                            className='w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 pl-14 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                            placeholder='Max Mileage'
                                            value={sidebarData.maxMileage}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-gray-300 font-semibold">Fuel Type:</label>
                                <div className="relative">
                                    <select
                                        id='fuelType'
                                        className='w-full appearance-none bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                        onChange={handleChange}
                                        value={sidebarData.fuelType}
                                    >
                                        <option value='all' className="bg-gray-800">All</option>
                                        <option value='petrol' className="bg-gray-800">Petrol</option>
                                        <option value='diesel' className="bg-gray-800">Diesel</option>
                                        <option value='hybrid' className="bg-gray-800">Hybrid</option>
                                        <option value='electric' className="bg-gray-800">Electric</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-gray-300 font-semibold">Transmission:</label>
                                <div className="relative">
                                    <select
                                        id='transmissionType'
                                        className='w-full appearance-none bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                        onChange={handleChange}
                                        value={sidebarData.transmissionType}
                                    >
                                        <option value='all' className="bg-gray-800">All</option>
                                        <option value='manual' className="bg-gray-800">Manual</option>
                                        <option value='automatic' className="bg-gray-800">Automatic</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-gray-300 font-semibold">Sort By:</label>
                                <div className="relative">
                                    <select
                                        onChange={handleChange}
                                        defaultValue={'created_desc'}
                                        id='sort'
                                        className='w-full appearance-none bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                    >
                                        <option value='price_desc' className="bg-gray-800">Price high to low</option>
                                        <option value='price_asc' className="bg-gray-800">Price low to high</option>
                                        <option value='created_desc' className="bg-gray-800">Latest</option>
                                        <option value='created_asc' className="bg-gray-800">Oldest</option>
                                        <option value='year_desc' className="bg-gray-800">Year new to old</option>
                                        <option value='year_asc' className="bg-gray-800">Year old to new</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <button className="py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-white font-semibold text-lg rounded-xl hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700">
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                <div className="md:w-2/3">
                    <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
                            Listing Results
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {!loading && listings.length === 0 && (
                                <p className="text-xl text-gray-300">No listing found!</p>
                            )}
                            {loading && (
                                <div className="col-span-2 flex justify-center">
                                    <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            {!loading &&
                                listings &&
                                listings.map((listing) => (
                                    <ListingItem key={listing._id} listing={listing} />
                                ))}
                        </div>

                        {showMore && (
                            <button
                                onClick={onShowMoreClick}
                                className="mt-8 w-full py-3 text-cyan-400 hover:text-cyan-300 border border-cyan-400 hover:border-cyan-300 rounded-xl transition duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                            >
                                Show more
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
