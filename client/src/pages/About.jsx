import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
// If you're using react-tsparticles v2, use this import instead:
import { Particles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const AboutUs = () => {
  // References for scroll animations
  const statsRef = useRef(null);
  const teamRef = useRef(null);
  const missionRef = useRef(null);
  
  // Use InView hooks to trigger animations when sections are visible
  const statsInView = useInView(statsRef, { once: false, threshold: 0.3 });
  const teamInView = useInView(teamRef, { once: false, threshold: 0.3 });
  const missionInView = useInView(missionRef, { once: false, threshold: 0.3 });

  // Initialize particles
  const particlesInit = async (main) => {
    // You can initialize the tsParticles instance (main) here, adding custom shapes or presets
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log("Particles container loaded", container);
  };

  const particlesOptions = {
    fullScreen: false,
    background: {
      color: {
        value: "transparent",
      },
    },
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#3085d6", "#8844ee", "#ff5733"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false
        }
      },
      size: {
        value: 3,
        random: true
      },
      links: {  // Updated from line_linked in newer versions
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outMode: "out",  // Updated from out_mode in newer versions
        bounce: false,
      }
    },
    interactivity: {
      detectsOn: "canvas",  // Updated from detect_on in newer versions
      events: {
        onHover: {  // Updated from onhover in newer versions
          enable: true,
          mode: "grab"
        },
        onClick: {  // Updated from onclick in newer versions
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          links: {  // Updated from line_linked in newer versions
            opacity: 1
          }
        },
        push: {
          quantity: 4  // Updated from particles_nb in newer versions
        }
      }
    },
    retina_detect: true
  };

  const stats = [
    { number: "10K+", label: "Happy Clients" },
    { number: "150+", label: "Luxury Cars" },
    { number: "15+", label: "Years Experience" },
    { number: "24/7", label: "Support" }
  ];

  // Added fallback URL paths for images
  const teamMembers = [
    {
      name: "R.K. Janith Prabash",
      role: "Founder & CEO",
      description: "Automotive industry veteran with 20+ years of experience",
      image: "my1.jpg" // Added path prefix
    },
    {
      name: "R.K. Janith Prabash",
      role: "Head of Operations",
      description: "Former luxury car brand executive",
      image: "my2.jpg" // Added path prefix
    },
    {
      name: "R.K. Janith Prabash",
      role: "Developer of DJK's AutoHUB",
      description: "Full-stack developer with a passion for cars",
      image: "my3.jpg" // Added path prefix
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Particle background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
        className="absolute inset-0 w-full h-full"
        style={{ position: 'absolute', zIndex: 0 }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[60vh] bg-gradient-to-r from-blue-900/70 via-black/70 to-orange-900/70"
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
          <div className="relative container mx-auto px-6 h-full flex items-center">
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
                  {/* Added error handling for images */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-32 w-32 mx-auto mb-4 rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150"; // Fallback image
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;