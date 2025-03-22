import express from 'express';
import axios from 'axios';
// Remove the import that's causing the error
// import Listing from '../models/listing.model.js';

const router = express.Router();

// API configuration for Hugging Face
const HF_API_KEY = process.env.HF_API_KEY;
console.log('Hugging Face API Key available:', HF_API_KEY ? 
  `Yes (starts with ${HF_API_KEY.substring(0, 5)}...)` : 'No');

// Define API endpoint - using a conversational model from Hugging Face
const HF_API_URL = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';

// Enhanced canned responses including vehicle listings
const CANNED_RESPONSES = {
  "hi": "Hello! How can I help you with our automotive services today?",
  "hello": "Hi there! Welcome to DJK's AutoHub. How can I assist you?",
  "vehicles": "We offer a range of vehicles including luxury sedans, SUVs, sports cars, and modified vehicles. Is there a specific type you're interested in?",
  "list": "Here are some of our featured vehicles:\n\n1. Honda CBR MC19 - 700,000 LKR\n2. Honda CIVIC - 10,000,000 LKR\n3. Yamaha R6 - 1,700,000 LKR\n4. BMW 520i - 17,500,000 LKR\n5. YAMAHA YZF R1 - 1,950,000 LKR\n\nWould you like more details about any of these vehicles?",
  "cars": "Our current car selection includes:\n\n1. Honda CIVIC - 10,000,000 LKR - Manual, Petrol\n2. BMW 520i - 17,500,000 LKR - Automatic, Petrol\n3. Lamborghini Aventador SVJ - 9,999,996 LKR - Automatic, Petrol\n\nWould you like to know more about any of these models?",
  "motorcycles": "We have several motorcycles available:\n\n1. Honda CBR MC19 - 700,000 LKR - Manual, Petrol\n2. Yamaha R6 - 1,700,000 LKR - Manual, Petrol\n3. YAMAHA YZF R1 - 1,950,000 LKR - Manual, Petrol\n4. CBR 250 - 900,000 LKR - Manual, Petrol\n\nAre you interested in any particular model?",
  "listing": "We have several premium vehicles listed on our site, including Honda CBR, BMW 520i, Yamaha R6, and luxury vehicles like the Lamborghini Aventador. You can view all listings by visiting our inventory page.",
  "price": "Our vehicles range from 700,000 LKR for motorcycles to 10,000,000+ LKR for luxury cars. For specific pricing, please inquire about a particular model.",
  "contact": "You can reach us at +94 71 123 5174 or email us at info@DJK'sAutoHub.com. Our showroom is located at 123 Automotive Drive, Colombo.",
  "financing": "We offer competitive financing options with flexible payment plans. Would you like to speak with one of our finance specialists?",
  "after-sales": "Yes, we provide comprehensive after-sales service including warranty, maintenance, and customization options."
};

// Remove the getListingInfo function that depends on the model

router.post('/', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required.' });
  }

  const lowerQuery = query.toLowerCase();
  
  // Check if query is about listings or cars
  const listingKeywords = ['list', 'car', 'cars', 'vehicle', 'busses','vehicles', 'sale', 'inventory', 'available', 'stock', 'offer'];
  const isListingQuery = listingKeywords.some(keyword => lowerQuery.includes(keyword));
  
  // Use canned responses for listing queries
  if (isListingQuery) {
    let response = CANNED_RESPONSES["list"]; // Default to general listing
    
    if (lowerQuery.includes("car")) {
      response = CANNED_RESPONSES["cars"];
    } else if (lowerQuery.includes("motorcycle") || lowerQuery.includes("bike")) {
      response = CANNED_RESPONSES["motorcycles"];
    }
    
    return res.json({ answer: response });
  }

  // Check for other canned responses if not a listing query
  for (const [keyword, response] of Object.entries(CANNED_RESPONSES)) {
    if (lowerQuery.includes(keyword)) {
      return res.json({ answer: response });
    }
  }

  // If API key is missing, fallback to a dummy response
  if (!HF_API_KEY) {
    console.warn('Hugging Face API key is not configured. Returning dummy response.');
    return res.json({ answer: `I don't have a specific answer for that query, but our customer service team can help. Please contact us at +94 71 123 5174.` });
  }

  try {
    // ...existing code...
    console.log('Attempting Hugging Face API call...');
    
    const response = await axios.post(
      HF_API_URL,
      { inputs: query },
      {
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Hugging Face API call successful');
    let botResponse = response.data;
    
    if (Array.isArray(botResponse)) {
      botResponse = botResponse[0].generated_text;
    } else if (typeof botResponse === 'object' && botResponse.generated_text) {
      botResponse = botResponse.generated_text;
    } else if (typeof botResponse === 'string') {
      // Use as is
    } else {
      botResponse = "I'm here to help with your automotive inquiries. How can I assist you?";
    }
    
    res.json({ answer: botResponse });
  } catch (error) {
    // ...existing code...
    console.error('Error calling Hugging Face API:', error.message);
    
    if (error.response) {
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
      console.error('Response status:', error.response.status);
    }
    
    // Return a friendly message in case of API failure
    res.json({ 
      answer: "I apologize, but I'm having trouble processing your request at the moment. Please try one of our quick questions below or contact our team directly."
    });
  }
});

export default router;