import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function ShowListings() {
  const { currentUser } = useSelector(state => state.user);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSlides, setCurrentSlides] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          return;
        }
        setListings(data);
        // Initialize current slide for each listing
        const slides = {};
        data.forEach(listing => {
          slides[listing._id] = 0;
        });
        setCurrentSlides(slides);
      } catch (error) {
        setError('Failed to fetch listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [currentUser._id]);

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const nextSlide = (listingId, totalImages) => {
    setCurrentSlides(prev => ({
      ...prev,
      [listingId]: (prev[listingId] + 1) % totalImages
    }));
  };

  const prevSlide = (listingId, totalImages) => {
    setCurrentSlides(prev => ({
      ...prev,
      [listingId]: (prev[listingId] - 1 + totalImages) % totalImages
    }));
  };

  return (
    <div className="min-h-screen py-20 bg-fixed bg-cover bg-center" style={{backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9)),url('https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=2037&auto=format&fit=crop')`, backgroundAttachment: "fixed", backgroundBlendMode: "normal, overlay"}}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between mb-16">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          <h1 className="text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Your Listings
          </h1>
          <div className="w-[72px]"></div>
        </div>

        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 bg-red-100/10 p-4 rounded-lg text-center mb-6">
            {error}
          </div>
        )}

        {!loading && !error && listings.length === 0 && (
          <div className="text-center text-gray-400">
            <p className="mb-4">You haven&apos;t created any listings yet.</p>
            <Link 
              to="/create-listing"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300"
            >
              Create Your First Listing
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div 
              key={listing._id} 
              className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
            >
              <div className="relative h-48 group">
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[currentSlides[listing._id]]}
                    alt="listing cover"
                    className="h-48 w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                {listing.imageUrls.length > 1 && (
                  <>
                    <button 
                      onClick={() => prevSlide(listing._id, listing.imageUrls.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => nextSlide(listing._id, listing.imageUrls.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 items-center">
                      {listing.imageUrls.map((_, index) => (
                        <div 
                          key={index}
                          className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                            index === currentSlides[listing._id] ? 'bg-white w-3' : 'bg-white/50'
                          }`}
                        />
                      ))}
                      <span className="text-white text-xs ml-2 bg-black/50 px-2 py-0.5 rounded-full">
                        {currentSlides[listing._id] + 1}/{listing.imageUrls.length}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className="p-4">
                <Link to={`/listing/${listing._id}`}>
                  <h2 className="text-xl font-semibold text-gray-200 hover:text-cyan-400 transition-colors mb-2">
                    {listing.modelName}
                  </h2>
                </Link>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {listing.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-400 font-semibold">
                    LKR {listing.regularPrice.toLocaleString()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteListing(listing._id)}
                      className="text-red-400 hover:text-red-300 transition-colors p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <Link
                      to={`/update-listing/${listing._id}`}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 