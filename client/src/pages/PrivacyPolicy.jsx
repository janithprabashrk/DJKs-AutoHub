import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
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
                            Privacy Policy
                        </h1>
                        <p className="text-cyan-300 text-lg max-w-3xl mx-auto">
                            How DJK&apos;s AutoHub Automotive collects, uses, and protects your personal information
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
                                Introduction
                            </h2>
                            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                                <p className="text-gray-300">
                                    Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                            <p className="text-gray-300">
                                At DJK's AutoHub Automotive, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                            </p>
                            <p className="text-gray-300">
                                Please read this privacy policy carefully before using our services. By accessing our website, you agree to the collection and use of information in accordance with this policy.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-cyan-400">
                                Information We Collect
                            </h2>
                            <p className="text-gray-300">
                                We collect several types of information for various purposes to provide and improve our service to you:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                                    <h3 className="text-lg font-medium text-cyan-300 mb-2">Personal Data</h3>
                                    <ul className="list-disc pl-5 text-gray-300 space-y-1">
                                        <li>Name and contact information</li>
                                        <li>Email address</li>
                                        <li>Phone number</li>
                                        <li>Address information</li>
                                        <li>Vehicle information</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                                    <h3 className="text-lg font-medium text-cyan-300 mb-2">Usage Data</h3>
                                    <ul className="list-disc pl-5 text-gray-300 space-y-1">
                                        <li>IP address</li>
                                        <li>Browser type and version</li>
                                        <li>Pages visited and time spent</li>
                                        <li>Device information</li>
                                        <li>Cookies and tracking technologies</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-cyan-400">
                                How We Use Your Information
                            </h2>
                            <p className="text-gray-300">
                                We use the collected data for various purposes:
                            </p>
                            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 backdrop-blur-sm space-y-3">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-2 w-2 bg-cyan-400 rounded-full mt-2 mr-2"></div>
                                    <p className="text-gray-300">To provide and maintain our service</p>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-2 w-2 bg-cyan-400 rounded-full mt-2 mr-2"></div>
                                    <p className="text-gray-300">To notify you about changes to our service</p>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-2 w-2 bg-cyan-400 rounded-full mt-2 mr-2"></div>
                                    <p className="text-gray-300">To provide customer support and respond to inquiries</p>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-2 w-2 bg-cyan-400 rounded-full mt-2 mr-2"></div>
                                    <p className="text-gray-300">To provide analysis or valuable information for improving our service</p>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-2 w-2 bg-cyan-400 rounded-full mt-2 mr-2"></div>
                                    <p className="text-gray-300">To monitor the usage of our service</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-cyan-400">
                                Data Security
                            </h2>
                            <p className="text-gray-300">
                                The security of your data is important to us. We strive to use commercially acceptable means to protect your personal information. However, remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
                            </p>
                            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                                <h3 className="text-lg font-medium text-cyan-300 mb-2">Our Security Measures Include:</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Encryption of sensitive data
                                    </li>
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Secure SSL connections
                                    </li>
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Regular security audits
                                    </li>
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Limited access to personal data
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-cyan-400">
                                Your Data Rights
                            </h2>
                            <p className="text-gray-300">
                                Depending on your location, you may have certain rights regarding your personal information:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-2">•</span>
                                            <span>Right to access personal information</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-2">•</span>
                                            <span>Right to rectification of inaccurate data</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-2">•</span>
                                            <span>Right to erasure ("right to be forgotten")</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-2">•</span>
                                            <span>Right to restriction of processing</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-2">•</span>
                                            <span>Right to data portability</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-cyan-400 mr-2">•</span>
                                            <span>Right to object to processing</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-cyan-400">
                                Contact Us
                            </h2>
                            <p className="text-gray-300">
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                                <p className="text-gray-300">DJK's AutoHub Automotive</p>
                                <p className="text-gray-300">123 Automotive Drive, Colombo</p>
                                <p className="text-gray-300">Email: privacy@DJK&apos;sAutoHub.com</p>
                                <p className="text-gray-300">Phone: +94 11 123 4567</p>
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
                                    to="/terms" 
                                    className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                                >
                                    Terms of Service
                                </Link>
                                <Link 
                                    to="/" 
                                    className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Home
                                </Link>
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
