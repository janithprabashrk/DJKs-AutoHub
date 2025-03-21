import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const AboutUs = () => {
  // References for scroll animations
  const statsRef = useRef(null);
  const teamRef = useRef(null);
  const missionRef = useRef(null);

  // Use InView hooks to trigger animations when sections are visible
  const statsInView = useInView(statsRef, { once: false, threshold: 0.3 });
  const teamInView = useInView(teamRef, { once: false, threshold: 0.3 });
  const missionInView = useInView(missionRef, { once: false, threshold: 0.3 });

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Futuristic car images
  const carImages = [
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  ];

  // Floating shapes animation
  const floatingShapes = [
    {
      id: 1,
      shape: "circle",
      size: "w-16 h-16",
      color: "bg-blue-500/20",
      position: "top-1/4 left-1/4",
      animation: { y: [0, -20, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
    },
    {
      id: 2,
      shape: "triangle",
      size: "w-20 h-20",
      color: "bg-purple-500/20",
      position: "top-1/3 right-1/4",
      animation: { y: [0, -30, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } },
    },
    {
      id: 3,
      shape: "square",
      size: "w-24 h-24",
      color: "bg-orange-500/20",
      position: "bottom-1/4 left-1/3",
      animation: { y: [0, -25, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } },
    },
    {
      id: 4,
      shape: "circle",
      size: "w-12 h-12",
      color: "bg-green-500/20",
      position: "bottom-1/3 right-1/4",
      animation: { y: [0, -15, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Clients" },
    { number: "150+", label: "Luxury Cars" },
    { number: "15+", label: "Years Experience" },
    { number: "24/7", label: "Support" },
  ];

  const teamMembers = [
    {
      name: "R.K. Janith Prabash",
      role: "Founder & CEO",
      description: "Automotive industry veteran with 20+ years of experience",
      image: "my1.jpg",
    },
    {
      name: "R.K. Janith Prabash",
      role: "Head of Operations",
      description: "Former luxury car brand executive",
      image: "my2.jpg",
    },
    {
      name: "R.K. Janith Prabash",
      role: "Developer of DJK's AutoHUB",
      description: "Full-stack developer with a passion for cars",
      image: "my3.jpg",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Social media links
  const socialMediaLinks = [
    { name: "Facebook", url: "https://facebook.com", icon: "fab fa-facebook" },
    { name: "Twitter", url: "https://twitter.com", icon: "fab fa-twitter" },
    { name: "Instagram", url: "https://instagram.com", icon: "fab fa-instagram" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "fab fa-linkedin" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Floating shapes animation */}
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ y: 0 }}
          animate={shape.animation}
          whileHover={{ scale: 1.2, rotate: 45, transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.8 }}
          className={`absolute ${shape.size} ${shape.color} ${shape.position} rounded-full cursor-pointer`}
        />
      ))}

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Hero Section with Text and Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[60vh] bg-gradient-to-r from-blue-900/70 via-black/70 to-orange-900/70"
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
          <div className="relative container mx-auto px-6 h-full flex items-center">
            {/* Text area */}
            <div className="w-full md:w-2/3">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.5 }}
                className="max-w-3xl"
              >
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent">
                  Redefining Luxury Automotive Excellence
                </h1>
                <p className="text-xl text-gray-300">
                  Welcome to DJK&apos;s AutoHUB, where passion meets precision in the world of premium automobiles.
                </p>
              </motion.div>
            </div>
            {/* Slider on right (hidden on mobile) */}
                  <div className="hidden md:block md:w-1/3 mt-12 ml-6">
                    <Slider {...sliderSettings}>
                    {carImages.map((image, index) => (
                      <div key={index} className="outline-none">
                      <img
                        src={image}
                        alt={`Futuristic Car ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      </div>
                    ))}
                    </Slider>
                  </div>
                  </div>
                </motion.div>

                {/* Stats Section */}
        <div ref={statsRef} className="py-20 bg-gradient-to-b from-black/80 to-gray-900/80">
          <div className="container mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700/30"
                >
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.number}
                  </h3>
                  <p className="text-gray-400 mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mission Section */}
        <div ref={missionRef} className="py-20 bg-gradient-to-b from-gray-900/80 to-black/80">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                At DJK&apos;s AutoHUB, we&apos;re driven by a singular vision: to revolutionize the luxury automotive marketplace.
                We combine cutting-edge technology with unparalleled expertise to deliver an exceptional car-buying
                experience. Our platform connects enthusiasts with their dream vehicles, ensuring every transaction
                is seamless, secure, and satisfying.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Team Section */}
        <div ref={teamRef} className="py-20 bg-gradient-to-b from-black/80 to-gray-900/80">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={teamInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-32 w-32 mx-auto mb-4 rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                  <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
                  <p className="text-blue-400 text-center mb-4">{member.role}</p>
                  <p className="text-gray-400 text-center">{member.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="py-20 bg-gradient-to-b from-gray-900/80 to-black/80"
          >
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              
              <div className="relative inline-block group">
                {/* Animated glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 rounded-lg blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                
                <motion.button
            onClick={() => window.location.href = '/contact-us'}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 8px rgb(255,255,255)",
              boxShadow: "0 0 15px rgba(138, 75, 255, 0.5)"
            }}
            whileTap={{ 
              scale: 0.95,
              rotate: [-1, 1, -1, 0],
              transition: { duration: 0.2 }
            }}
            className="relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-700 to-orange-600 rounded-lg font-semibold text-white border border-gray-800 shadow-[0_0_15px_rgba(138,75,255,0.5)] backdrop-blur-sm hover:border-gray-600 transition-all duration-300"
                >
            <span className="relative inline-flex items-center">
              <span className="mr-2">Contact Us</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
        <footer className="bg-black/90 py-12 border-t border-gray-800 relative overflow-hidden">
          {/* Futuristic background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -bottom-8 left-0 w-full h-20 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 blur-xl"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            <div className="absolute bottom-0 left-1/3 w-1/3 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Contact Information */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-sm bg-gray-900/30 p-6 rounded-xl border border-gray-800/50"
              >
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Contact Information
                </h3>
                <div className="space-y-4 text-gray-300">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mr-4 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <span className="group-hover:text-blue-400 transition-colors">contact@djksautohub.com</span>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mr-4 flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <span className="group-hover:text-purple-400 transition-colors">+94 71 123 5174</span>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mr-4 flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover:text-orange-400 transition-colors">Colombo, Sri Lanka</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Social Media Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="backdrop-blur-sm bg-gray-900/30 p-6 rounded-xl border border-gray-800/50"
              >
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Connect With Us
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    href="https://www.facebook.com/profile.php?id=61553903355509"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-lg bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-600/30 hover:border-blue-500 group transition-all duration-300"
                    whileHover={{ y: -5, x: 0, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-3 shadow-lg shadow-blue-600/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </div>
                    <span className="text-gray-300 group-hover:text-blue-400 transition-colors">Facebook</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-lg bg-gradient-to-br from-sky-600/20 to-sky-800/20 border border-sky-600/30 hover:border-sky-500 group transition-all duration-300"
                    whileHover={{ y: -5, x: 0, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center mr-3 shadow-lg shadow-sky-600/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                    </div>
                    <span className="text-gray-300 group-hover:text-sky-400 transition-colors">Twitter</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-lg bg-gradient-to-br from-pink-600/20 to-orange-600/20 border border-pink-600/30 hover:border-pink-500 group transition-all duration-300"
                    whileHover={{ y: -5, x: 0, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center mr-3 shadow-lg shadow-pink-600/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <span className="text-gray-300 group-hover:text-pink-400 transition-colors">Instagram</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://www.linkedin.com/in/janithrk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-lg bg-gradient-to-br from-blue-700/20 to-blue-900/20 border border-blue-700/30 hover:border-blue-600 group transition-all duration-300"
                    whileHover={{ y: -5, x: 0, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mr-3 shadow-lg shadow-blue-700/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                    </div>
                    <span className="text-gray-300 group-hover:text-blue-400 transition-colors">LinkedIn</span>
                  </motion.a>
                </div>
              </motion.div>

              {/* Map Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-64 rounded-xl overflow-hidden backdrop-blur-sm bg-gray-900/30 p-1 border border-gray-800/50"
              >
                <MapContainer center={[6.9271, 79.8612]} zoom={13} className="h-full w-full rounded-lg">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[6.9271, 79.8612]}>
                    <Popup>DJK's AutoHUB Headquarters</Popup>
                  </Marker>
                </MapContainer>
              </motion.div>
            </div>

            {/* Copyright Notice */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 pt-6 border-t border-gray-800/50 text-center text-gray-400"
            >
              <div className="inline-block px-6 py-2 backdrop-blur-sm bg-gray-900/20 rounded-full">
                <p>© {new Date().getFullYear()} <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">DJK's AutoHUB</span>. All rights reserved.</p>
              </div>
              <p className="mt-4 text-sm">
                Designed & Developed by <span className="text-blue-400">R.K. Janith Prabash</span>
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;