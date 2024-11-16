import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ListingItem({ listing }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (listing.imageUrls.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === listing.imageUrls.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (listing.imageUrls.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? listing.imageUrls.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className='bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300'>
      <Link to={`/listing/${listing._id}`}>
        <div className="relative h-48">
          <img
            src={
              listing.imageUrls[currentImageIndex] ||
              'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
            }
            alt='listing cover'
            className='h-48 w-full object-cover hover:scale-105 transition-transform duration-300'
          />
          {listing.imageUrls.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/75 transition-colors"
              >
                <FaChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/75 transition-colors"
              >
                <FaChevronRight className="w-4 h-4 text-white" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {listing.imageUrls.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className='p-4'>
          <h2 className='text-xl font-semibold text-gray-200 hover:text-cyan-400 transition-colors mb-2'>
            {listing.modelName}
          </h2>
          <div className='flex items-center gap-1 mb-2'>
            <MdLocationOn className='h-4 w-4 text-cyan-400' />
            <p className='text-gray-400 text-sm truncate'>
              {listing.address}
            </p>
          </div>
          <p className='text-gray-400 text-sm mb-4 line-clamp-2'>
            {listing.description}
          </p>
          <div className='flex justify-between items-center'>
            <span className='text-cyan-400 font-semibold'>
              LKR {listing.regularPrice.toLocaleString()}
            </span>
            <div className='flex gap-2 text-gray-400'>
              <span className='text-sm'>
                {listing.bedrooms} bed{listing.bedrooms > 1 ? 's' : ''} 
              </span>
              <span className='text-sm'>
                {listing.bathrooms} bath{listing.bathrooms > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
