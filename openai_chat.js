// Import the necessary module from the 'openai' package
const { OpenAI } = require('openai');

// Define a function to generate a response
function generateChatResponse(apiKey, prompt) {
  // Create an instance of the OpenAI class with your API key
  const openai = new OpenAI({
    apiKey: apiKey,
  });
  // Send a request to the OpenAI API with the provided prompt
  return openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // Using the GPT-3.5 Turbo model (Can upgrade to GPT-4)
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt }, // User's prompt/question
    ],
  });
}
//OpenAI API key
const apiKey = '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'; // Replace with your OpenAI API key

//The main function to run the code
async function main() {
  try {
    //prompt
    const prompt = 'Can you provide me with a summary of the book "To Kill a Mockingbird"?';
    // Calling the generateChatResponse function with the API key and prompt
    const response = await generateChatResponse(apiKey, prompt);

    //Print the generated response from the OpenAI model
    console.log(response.choices[0].message.content);
    
    // Handle any errors that may occur
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
