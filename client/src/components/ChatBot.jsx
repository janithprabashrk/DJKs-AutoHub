import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quickQuestions = [
  { question: "What vehicles do you offer?", answer: "We offer a variety of luxury and modified vehicles tailored to your needs." },
  { question: "What are your financing options?", answer: "We offer competitive financing options. Contact us for personalized plans." },
  { question: "Do you provide after-sales service?", answer: "Yes, our after-sales service is comprehensive and customer-oriented." },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: "Hello! How can I assist you today?" }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleQuickQuestion = (q) => {
    setMessages(prev => [...prev, { sender: 'user', text: q.question }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: q.answer }]);
    }, 500);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    const userQuery = input;
    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setInput('');
    setIsLoading(true);
  
    try {
      const res = await fetch('/api/ai-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userQuery }),
      });
      const data = await res.json();
      // Check for error in response instead of throwing on non-ok status.
      const botResponse = data.answer || data.error || "Sorry, I couldn't retrieve a response.";
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (err) {
      console.error("Error fetching AI model response:", err);
      setMessages(prev => [...prev, { sender: 'bot', text: "Error: Unable to connect to AI model. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  
  };

  return (
    <>
      <motion.div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-2xl flex items-center justify-center focus:outline-none transform hover:scale-105 transition duration-300"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H6l-4 4V5z" />
          </svg>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-gray-800 bg-opacity-90 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-gray-700"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 flex justify-between items-center border-b border-gray-700">
              <h3 className="text-white font-bold tracking-wide">AutoHub Chat</h3>
              <button onClick={toggleChat} className="text-white text-2xl focus:outline-none">&times;</button>
            </div>
            <div className="p-4 h-60 overflow-y-auto space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg max-w-xs ${
                    msg.sender === 'bot'
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white self-start"
                      : "bg-gray-600 text-white self-end"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="p-2 rounded-lg max-w-xs bg-gradient-to-r from-green-500 to-blue-500 text-white self-start">
                  Typing...
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-700">
              <form onSubmit={handleSubmit} className="flex mb-2">
                <input 
                  type="text"
                  className="flex-1 p-2 rounded-l-full border border-gray-600 focus:outline-none bg-gray-700 text-white"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your question..."
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 rounded-r-full focus:outline-none"
                  disabled={isLoading}
                >
                  Send
                </button>
              </form>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleQuickQuestion(q)}
                    className="bg-transparent border border-purple-500 text-purple-500 px-3 py-1 rounded-full text-sm focus:outline-none hover:bg-purple-500 hover:text-white transition duration-300"
                  >
                    {q.question}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}