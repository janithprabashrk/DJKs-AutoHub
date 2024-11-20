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
        const res = await fetch('/api/listing/search?discountPrice=true&limit=5');
        const data = await res.json();
        setOfferListings(data);
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
              index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
            style={{
              backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9)), url('${slide.backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay'
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
                className={`text-gray-300 text-xs sm:text-sm transform transition-all duration-1000 ${
                  index === activeIndex ? 'translate-x-0 opacity-100 delay-500' : '-translate-x-20 opacity-0'
                }`}
              >
                {slide.subtitle}
                <br />
                Browse our extensive collection of quality cars.
              </div>
              <a
                href="/search"
                className={`text-xs sm:text-sm text-cyan-400 font-bold hover:underline transform transition-all duration-1000 ${
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
            navigation
            pagination={{ clickable: true }}
            className="mb-12 rounded-xl overflow-hidden shadow-2xl"
            slidesPerView={1}
            loop={true}
            effect="fade"
          >
            {offerListings &&
              offerListings.length > 0 &&
              offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div
                    style={{
                      background: `url(${listing.imageUrls[0]}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                    className="h-[500px] relative group rounded-lg border border-transparent hover:border-cyan-400 hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden shadow-lg"
                  >
                  <div className="absolute bottom-0 left-4 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                    <h3 className="text-2xl font-bold text-white mb-2">{listing.name}</h3>

                    <motion.p
                      className="text-cyan-400 text-lg font-semibold mb-4 hover:text-cyan-500"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05, textShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)" }}
                      transition={{ duration: 0.3 }}
                    >
                      ${listing.regularPrice.toLocaleString('en-US')}
                    </motion.p>
                    
                    <motion.p
                      className="text-cyan-400 text-lg font-semibold mb-4 hover:text-cyan-500"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05, textShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)" }}
                      transition={{ duration: 0.3 }}
                    >
                      {listing.modelName}
                    </motion.p>

                    <button className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-semibold shadow-lg hover:scale-110 hover:shadow-xl transform transition-all duration-300">
                      View Details
                    </button>
                  </div>
                  </div>
                </SwiperSlide>
              ))}
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
