import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Terms() {
    const navigate = useNavigate();
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white pt-20">
            {/* Header Banner */}
            <div className="relative py-16 bg-black">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(22,78,99,0.3)_0%,rgba(0,0,0,0)_70%)]"></div>
                    <div className="absolute inset-0">
                        <div className="h-full w-full flex">
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform translate-y-24 opacity-20"></div>
                        </div>
                        <div className="h-full w-full flex flex-col justify-between">
                            <div className="w-px h-40 bg-gradient-to-b from-transparent via-blue-500 to-transparent ml-20 opacity-20"></div>
                            <div className="w-px h-40 bg-gradient-to-b from-transparent via-blue-500 to-transparent self-end mr-20 opacity-20"></div>
                        </div>
                    </div>
                </div>
                <div className="relative max-w-6xl mx-auto px-4">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="space-y-4 text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Terms of Service
                        </h1>
                        <p className="text-cyan-300 text-lg max-w-3xl mx-auto">
                            The rules, guidelines, and agreements to using DJK&apos;s AutoHub Automotive services
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto py-12 px-4">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="backdrop-blur-md bg-gray-800/30 rounded-2xl p-8 shadow-2xl border border-gray-700/50 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

                    <div className="space-y-8 relative z-10">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-cyan-400">
                                Agreement to Terms
                            </h2>
                            <p className="text-gray-300">
                                These Terms of Service constitute a legally binding agreement made between you and DJK's AutoHub Automotive, concerning your access to and use of our website and services. You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service.
                            </p>
                            <p className="text-gray-300">
                                IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                            </p>
                        </section>

                        {/* Other sections remain the same, just updating the heading style */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-cyan-400">
                                Intellectual Property Rights
                            </h2>
                            <p className="text-gray-300">
                                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
                            </p>
                            <p className="text-gray-300">
                                The Content and the Marks are provided on the Site "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                            </p>
                        </section>

                        {/* Continue updating other sections with the same heading style */}
                        {/* ... other sections ... */}

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-cyan-400">
                                Contact Us
                            </h2>
                            <p className="text-gray-300">
                                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                            </p>
                            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                                <p className="text-gray-300">DJK's AutoHub Automotive</p>
                                <p className="text-gray-300">DJK&apos;s AutoHub Automotive</p>
                                <p className="text-gray-300">123 Automotive Drive, Colombo</p>
                                <p className="text-gray-300">Email: legal@DJK&apos;sAutoHub.com</p>
                            </div>
                        </section>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-700/50">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <p className="text-gray-400 text-sm">
                                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                            <div className="flex items-center space-x-4">
                                <Link 
                                    to="/privacy" 
                                    className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                                >
                                    Privacy Policy
                                </Link>
                                <button 
                                    type="button"
                                    onClick={() => navigate('/')}
                                    className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <style>{`
                .bg-grid-pattern {
                    background-image: linear-gradient(to right, rgba(75, 85, 99, 0.1) 1px, transparent 1px),
                                                        linear-gradient(to bottom, rgba(75, 85, 99, 0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                }
            `}</style>
        </div>
    );
}
