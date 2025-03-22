import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables
dotenv.config();

// Get the API key and remove any quotes
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY?.replace(/^['"](.*)['"]$/, '$1');

// Log API key info (safely)
console.log('===== DEEPSEEK API TEST =====');
console.log(`API Key exists: ${!!DEEPSEEK_API_KEY}`);
console.log(`API Key starts with: ${DEEPSEEK_API_KEY?.substring(0, 5)}...`);
console.log(`API Key length: ${DEEPSEEK_API_KEY?.length}`);

// Test function
async function testDeepSeekAPI() {
  // Define the API endpoint
  const apiUrl = 'https://api.deepseek.com/v1/chat/completions';
  
  // Create the payload
  const payload = {
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Say hello world' },
    ],
    temperature: 0.7,
    max_tokens: 50,
  };

  try {
    console.log('Making test API call...');
    console.log('Headers:', {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    });
    
    // Make the API call
    const response = await axios.post(
      apiUrl,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );
    
    console.log('API CALL SUCCESSFUL!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.error('API CALL FAILED:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
    return false;
  }
}

// Run the test
testDeepSeekAPI()
  .then(success => {
    console.log(`Test completed. Success: ${success}`);
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });
