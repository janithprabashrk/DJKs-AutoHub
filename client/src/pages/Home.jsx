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
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
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
      backgroundImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1883&auto=format&fit=crop',
      title: 'Find your next dream car',
      subtitle: 'AutoMarket is your premier destination',
      textColor: 'from-cyan-400 to-blue-500'
    },
    {
      backgroundImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
      title: 'Luxury Meets Performance',
      subtitle: 'Explore our curated collection',
      textColor: 'from-purple-400 to-pink-500'
    },
    {
      backgroundImage: 'https://images.unsplash.com/photo-1605559424843-9e4868ac1aac?q=80&w=1974&auto=format&fit=crop',
      title: 'Your Journey Starts Here',
      subtitle: 'Discover the perfect ride',
      textColor: 'from-green-400 to-blue-500'
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
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
  
  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === activeIndex ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-110 pointer-events-none'
            }`}
            style={{
              backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9)), url('${slide.backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay',
            }}
          >
            <div className="flex flex-col gap-8 p-36 px-3 max-w-6xl mx-auto justify-center h-full">
              <h1
                className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.textColor} font-bold text-3xl lg:text-6xl transform transition-all duration-1000 ${
                  index === activeIndex ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                }`}
              >
                {slide.title.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    <span className={`inline-block ${i === 1 ? 'text-cyan-400' : ''}`}>
                      {word}
                    </span>
                  </React.Fragment>
                ))}
              </h1>
              <div
                className={`text-gray-300 text-xs sm:text-sm transform transition-all duration-1000  ${
                  index === activeIndex ? 'translate-x-0 opacity-100 delay-500' : '-translate-x-20 opacity-0'
                }`}
              >
                {slide.subtitle}
                <br/>
                Browse our extensive collection of quality cars.
              </div>
              <a
                href="/search"
                className={`animate-bounce text-xs sm:text-sm text-cyan-400 font-bold hover:underline transform transition-all duration-1000 ${
                  index === activeIndex ? 'translate-x-0 opacity-100 delay-700' : '-translate-x-20 opacity-0'
                }`}
              >
                Let's get started...
              </a>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute z-10 top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
          <button
            onClick={prevSlide}
            className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Swiper Section */}
      <div
        className="min-h-[100vh] bg-fixed bg-cover bg-center py-12"
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9)), url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop')`,
          backgroundAttachment: "fixed",
          backgroundBlendMode: "normal, overlay"
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 text-center">
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
            className="mb-12 rounded-xl overflow-hidden shadow-2xl relative group"
            slidesPerView={1}
            loop={true}
            effect="fade"
          >
            {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className="h-[500px] relative group rounded-2xl border-2 border-transparent hover:border-cyan-400 hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden shadow-2xl"
                >
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 space-y-4">
                    <h3 className="text-3xl font-bold text-white tracking-wider">{listing.name}</h3>
                    
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <p className="text-cyan-300 text-xl font-semibold">
                            ${listing.regularPrice.toLocaleString('en-US')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <p className="text-cyan-300 text-xl font-semibold">
                            {listing.modelName}
                          </p>
                        </div>
                      </div>
                      
                      <div
                        className="flex items-center space-x-2 bg-cyan-400/20 px-4 py-2 rounded-full cursor-pointer hover:bg-cyan-400/40 transition-all"
                      >
                        <span className="text-white font-semibold">View Details</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            
            {/* Custom Navigation */}
            <div className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 custom-prev cursor-pointer">
              <div className="bg-white/20 hover:bg-cyan-400/40 rounded-full p-3 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:text-white">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </div>
            </div>
            
            <div className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 custom-next cursor-pointer">
              <div className="bg-white/20 hover:bg-cyan-400/40 rounded-full p-3 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:text-white">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </div>
            
            {/* Custom Pagination */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 custom-pagination"></div>
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
                Cars for Rent
              </h2>
              <Link
                className="text-sm text-cyan-400 hover:underline flex items-center gap-1"
                to={'/search?type=rent'}
              >
                View all rentals
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

        {saleListings && saleListings.length > 0 && (
          <motion.div
            className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Cars for Sale
              </h2>
              <Link
                className="text-sm text-cyan-400 hover:underline flex items-center gap-1"
                to={'/search?type=sale'}
              >
                View all sales
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
              {saleListings.map((listing) => (
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
