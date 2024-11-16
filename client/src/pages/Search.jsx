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
                const res = await fetch(`/api/listing/get?${searchQuery}`);
                const data = await res.json();
                if (data.length > 8) {
                    setShowMore(true);
                }
                setListings(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
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
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <input
                            type='text'
                            id='searchTerm'
                            placeholder='Search...'
                            className='border rounded-lg p-3 w-full'
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='all'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebarData.type === 'all'}
                            />
                            <span>All</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='sale'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebarData.type === 'sale'}
                            />
                            <span>For Sale</span>
                        </div>
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Price Range:</label>
                        <input
                            type='number'
                            id='minPrice'
                            className='border rounded-lg p-3'
                            placeholder='Min Price'
                            value={sidebarData.minPrice}
                            onChange={handleChange}
                        />
                        <input
                            type='number'
                            id='maxPrice'
                            className='border rounded-lg p-3'
                            placeholder='Max Price'
                            value={sidebarData.maxPrice}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Mileage Range:</label>
                        <input
                            type='number'
                            id='minMileage'
                            className='border rounded-lg p-3'
                            placeholder='Min Mileage'
                            value={sidebarData.minMileage}
                            onChange={handleChange}
                        />
                        <input
                            type='number'
                            id='maxMileage'
                            className='border rounded-lg p-3'
                            placeholder='Max Mileage'
                            value={sidebarData.maxMileage}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Fuel Type:</label>
                        <select
                            id='fuelType'
                            className='border rounded-lg p-3'
                            onChange={handleChange}
                            value={sidebarData.fuelType}
                        >
                            <option value='all'>All</option>
                            <option value='petrol'>Petrol</option>
                            <option value='diesel'>Diesel</option>
                            <option value='hybrid'>Hybrid</option>
                            <option value='electric'>Electric</option>
                        </select>
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Transmission:</label>
                        <select
                            id='transmissionType'
                            className='border rounded-lg p-3'
                            onChange={handleChange}
                            value={sidebarData.transmissionType}
                        >
                            <option value='all'>All</option>
                            <option value='manual'>Manual</option>
                            <option value='automatic'>Automatic</option>
                        </select>
                    </div>

                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select
                            onChange={handleChange}
                            defaultValue={'created_desc'}
                            id='sort'
                            className='border rounded-lg p-3'
                        >
                            <option value='price_desc'>Price high to low</option>
                            <option value='price_asc'>Price low to high</option>
                            <option value='created_desc'>Latest</option>
                            <option value='created_asc'>Oldest</option>
                            <option value='year_desc'>Year new to old</option>
                            <option value='year_asc'>Year old to new</option>
                        </select>
                    </div>
                    <button className='bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                        Search
                    </button>
                </form>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
                    Listing results:
                </h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && listings.length === 0 && (
                        <p className='text-xl text-slate-700'>No listing found!</p>
                    )}
                    {loading && (
                        <p className='text-xl text-slate-700 text-center w-full'>
                            Loading...
                        </p>
                    )}

                    {!loading &&
                        listings &&
                        listings.map((listing) => (
                            <ListingItem key={listing._id} listing={listing} />
                        ))}

                    {showMore && (
                        <button
                            onClick={onShowMoreClick}
                            className='text-green-700 hover:underline p-7 text-center w-full'
                        >
                            Show more
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
