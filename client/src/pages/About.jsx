import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "10K+", label: "Happy Clients" },
    { number: "150+", label: "Luxury Cars" },
    { number: "15+", label: "Years Experience" },
    { number: "24/7", label: "Support" }
  ];

  const teamMembers = [
    {
      name: "David Johnson",
      role: "Founder & CEO",
      description: "Automotive industry veteran with 20+ years of experience"
    },
    {
      name: "Katherine Smith",
      role: "Head of Operations",
      description: "Former luxury car brand executive"
    },
    {
      name: "Michael Chen",
      role: "Technical Director",
      description: "Expert in automotive technology and innovation"
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] bg-gradient-to-r from-blue-900 via-black to-orange-900"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
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
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="py-20 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
          </div>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeInUp}
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
      </motion.div>

      {/* Team Section */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="py-20 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
                <p className="text-blue-400 text-center mb-4">{member.role}</p>
                <p className="text-gray-400 text-center">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20 bg-gradient-to-b from-gray-900 to-black"
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
  );
};

export default AboutUs;