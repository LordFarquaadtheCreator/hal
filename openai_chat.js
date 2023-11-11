const { OpenAI } = require('openai');
const apiKey = process.env.OPENAI_API_KEY;
require('dotenv').config();


function generateChatResponse(apiKey, prompt) {
  const openai = new OpenAI({
    apiKey: apiKey,
  });
  return openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt }, 
    ],
  });
}

async function main() {
  try {
    const prompt = 'Can you provide me with a summary of the book "To Kill a Mockingbird"?';

    const response = await generateChatResponse(apiKey, prompt);

    console.log(response.choices[0].message.content);
    
    // Handle any errors that may occur
  } catch (error) {
    console.error('Error:', error);
  }
}
main();