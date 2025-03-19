import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import ListingItem from '../components/ListingItem';
import { motion } from 'framer-motion';
import Stats from '../components/Stats';


export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [ModifyListings, setModifyListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
    
  const [activeIndex, setActiveIndex] = useState(0);

  SwiperCore.use([Navigation]);

  const slides = [
    {
      backgroundImage: 'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?q=80&w=1974',
      title: 'Drive Your Dreams',
      subtitle: 'Premium Luxury Cars',
      textColor: 'from-yellow-400 to-orange-500',
      description: 'Experience unmatched performance and elegance'
    },
    {
      backgroundImage: 'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?q=80&w=2000',
      title: 'Family First',
      subtitle: 'Luxury SUVs',
      textColor: 'from-blue-400 to-indigo-500',
      description: 'Perfect blend of comfort and versatility'
    },
    {
      backgroundImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1974',
      title: 'Built to Last',
      subtitle: 'Commercial Vehicles',
      textColor: 'from-red-400 to-rose-500',
      description: 'Reliable performance for your business needs'
    },
    {
      backgroundImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1974',
      title: 'Adventure Awaits',
      subtitle: 'Off-Road Specialists',
      textColor: 'from-green-400 to-emerald-500',
      description: 'Conquer any path with confidence'
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/search?discountPrice=0&limit=8&sort=-createdAt');
        const data = await res.json();
        // Sort listings by creation date in descending order
        const sortedListings = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOfferListings(sortedListings);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOfferListings();
  }, []);

  useEffect(() => {
    const fetchModifyListings = async () => {
      try {
        const res = await fetch('/api/listing/search?modified=true&limit=5&sort=-createdAt');
        const data = await res.json();
        // Filter for modified items and sort by creation date in descending order
        const modifiedListings = data.filter(item => item.modified === true);
        const sortedListings = modifiedListings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setModifyListings(sortedListings);
      } catch (error) {
        console.error(error);
      }
    };
    fetchModifyListings();
  }, []);
  
  
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[115vh] overflow-hidden -mt-24 bg-gradient-to-r from-blue-900 via-black to-orange-900 ">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
                index === activeIndex ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-110 pointer-events-none'
              }`}
              style={{
                backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('${slide.backgroundImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/40 via-black/10 to-transparent backdrop-blur-sm"
                style={{
                  WebkitMaskImage: 'linear-gradient(to right, black 30%, transparent)',
                  maskImage: 'linear-gradient(to right, black 30%, transparent)',
                }}
              ></div>
              <div className="flex flex-col gap-8 p-36 px-3 max-w-6xl mx-auto justify-center h-full">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="max-w-3xl"
                >
                <h1
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.textColor} font-bold text-5xl lg:text-8xl transform transition-all duration-1000 ${
                    index === activeIndex ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                  }`}
                >
                  {slide.title.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <br />}
                      <span className="inline-block hover:scale-105 transition-transform">
                        {word}
                      </span>
                    </React.Fragment>
                  ))}
                </h1>
                <div
                  className={`text-gray-200 text-lg sm:text-xl transform transition-all duration-1000 ${
                    index === activeIndex ? 'translate-x-0 opacity-100 delay-300' : '-translate-x-20 opacity-0'
                  }`}
                >
                  <span className="font-bold text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {slide.subtitle}
                  </span>
                  <br/>
                  <span className="italic text-gray-300">{slide.description}</span>
                </div>
                <a
                  href="/search"
                  className={`group flex items-center gap-2 w-fit text-sm sm:text-base text-cyan-400 font-bold hover:text-cyan-300 transform transition-all duration-1000 ${
                    index === activeIndex ? 'translate-x-0 opacity-100 delay-700' : '-translate-x-20 opacity-0'
                  }`}
                >
                  Explore Our Collection
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </a>
                </motion.div>
              </div>
            </div>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute z-10 top-1/2 transform -translate-y-1/2 w-full flex justify-between px-8">
          <button
            onClick={prevSlide}
            className="group bg-black/20 hover:bg-cyan-500 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-md hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="group bg-black/20 hover:bg-cyan-500 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-md hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {[0,1,2,3].map((index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-cyan-400 scale-125 ring-4 ring-cyan-400/30' 
                  : 'bg-white/50 hover:bg-white hover:scale-110'
              }`}
            />
          ))}
        </div>
      </div>
      
      {<Stats/>}


      {/* Swiper Section */}
      <div
        className="min-h-[100vh] bg-fixed bg-cover bg-center py-12 group"
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9)), url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop')`,
          backgroundAttachment: "fixed",
          backgroundBlendMode: "normal, overlay"
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 text-center">
            Featured Vehicles          
          </h2>
          <Swiper
            navigation={{
              prevEl: '.custom-prev',
              nextEl: '.custom-next',
              disabledClass: 'opacity-30'
            }}
            pagination={{ 
              clickable: true,
              el: '.custom-pagination',
              bulletClass: 'w-3 h-3 rounded-full bg-white/50 mx-1 transition-all duration-300 hover:bg-cyan-400 cursor-pointer',
              bulletActiveClass: 'bg-cyan-400 scale-125'
            }}
            className="mb-12 rounded-xl overflow-visible shadow-2xl relative group"
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            }}
          >
            {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
              <SwiperSlide key={listing._id} className="transition-all duration-500">
                {({ isActive }) => (
                  <div
                    style={{
                      background: `url(${listing.imageUrls[0]}) center no-repeat`,
                      backgroundSize: 'cover',
                      transform: isActive ? 'scale(1.1)' : 'scale(0.8)',
                      transition: 'transform 500ms'
                    }}
                    className="h-[400px] relative group rounded-2xl border-2 border-transparent hover:border-cyan-400 transition-all duration-300 ease-in-out overflow-hidden shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{listing.name}</h3>
                        <p className="text-cyan-300 text-lg mb-2">
                          {listing.regularPrice.toLocaleString('en-US')} LKR
                        </p>
                        <p className="text-gray-300 mb-4">{listing.modelName}</p>
                        <Link 
                          to={`/listing/${listing._id}`}
                          className="inline-block bg-cyan-400/20 hover:bg-cyan-400/40 px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
            
            {/* Custom Navigation */}
            <div className="fixed top-1/2 left-0 z-20 transform -translate-y-1/2 custom-prev cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-cyan-400/20 hover:bg-cyan-400/40 rounded-r-full p-6 transition-all hover:pl-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </div>
            </div>
            
            <div className="fixed top-1/2 right-0 z-20 transform -translate-y-1/2 custom-next cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-cyan-400/20 hover:bg-cyan-400/40 rounded-l-full p-6 transition-all hover:pr-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </div>
            
            {/* Custom Pagination */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 custom-pagination"></div>
          </Swiper>
        </div>
      </div>

      {/* Listing Results Section */}
      <div
      className="bg-fixed bg-cover bg-center py-10"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9)), url('https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=2070&auto=format&fit=crop')`,
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'normal, overlay',
      }}
    >
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8">
        {offerListings && offerListings.length > 0 && (
          <motion.div
            className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Special Offers
              </h2>
              <Link
                className="text-sm text-cyan-400 hover:underline flex items-center gap-1"
                to={'/search?offer=true'}
              >
                View all offers
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-4 w-4 transition-transform duration-300"
                  whileHover={{ x: 4 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </motion.svg>
              </Link>
            </div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={staggerContainer}
            >
              {offerListings.map((listing) => (
                <motion.div key={listing._id} variants={fadeInUp}>
                  <ListingItem listing={listing} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
        
        {rentListings && rentListings.length > 0 && (
          <motion.div
            className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Modified Vehicles
              </h2>
              <Link
                className="text-sm text-cyan-400 hover:underline flex items-center gap-1"
                to={'/search?type=rent'}
              >
                View all modified vehicles
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-4 w-4 transition-transform duration-300"
                  whileHover={{ x: 4 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </motion.svg>
              </Link>
            </div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={staggerContainer}
            >
              {rentListings.map((listing) => (
                <motion.div key={listing._id} variants={fadeInUp}>
                  <ListingItem listing={listing} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {ModifyListings && ModifyListings.length > 0 && (
          <motion.div
            className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Modified Vehicles
              </h2>
              <Link
                className="text-sm text-cyan-400 hover:underline flex items-center gap-1"
                to={'/search?modified=true'}
              >
                View all modified vehicles
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-4 w-4 transition-transform duration-300"
                  whileHover={{ x: 4 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </motion.svg>
              </Link>
            </div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={staggerContainer}
            >
              {ModifyListings.map((listing) => (
                <motion.div key={listing._id} variants={fadeInUp}>
                  <ListingItem listing={listing} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
    </div>
  );
}
