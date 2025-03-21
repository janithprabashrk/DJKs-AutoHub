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
    
    {/* About Us Footer */}
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              About DJK's AutoHub
            </h3>
            <p className="text-gray-300">
              DJK's AutoHub is a premium automotive dealership committed to excellence, offering luxury and modified vehicles with exceptional customer service since 2010.
            </p>
            <div className="pt-2">
              <Link to="/about" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
                Learn more about us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Contact Us
            </h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                123 Automotive Drive, Colombo
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +94 71 123 5174
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@DJK's AutoHub.com
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mon-Sat: 9AM - 7PM
              </p>
            </div>
          </div>
          
          {/* Quick Links & Social Media */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-cyan-500 transition-colors">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-cyan-500 transition-colors">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-cyan-500 transition-colors">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@DJKGamingStudio" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-cyan-500 transition-colors">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            <h4 className="text-lg font-semibold text-gray-300 mt-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/search?searchTerm=" className="text-gray-400 hover:text-cyan-400 transition-colors">Inventory</Link>
              <Link to="/search?searchTerm=" className="text-gray-400 hover:text-cyan-400 transition-colors">Services</Link>
              <Link to="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">About Us</Link>
              <Link to="/contact-us" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DJK's AutoHub Automotive. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm text-gray-400">
              <li><Link to="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/sitemap" className="hover:text-cyan-400 transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
  );
}
