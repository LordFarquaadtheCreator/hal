import {OpenAI} from 'openai';
import dotenv from 'dotenv/config'
import { resolve } from 'path';
import { rejects } from 'assert';
const apiKey = process.env.OPENAI_API_KEY;


function generateChatResponse(apiKey, error, file) {
  let prompt = '';
  if(file){prompt = "This is the file:" + file + "this is the error:" + error;}
  else{prompt = "This is the error:" + error;}

  return new Promise((resolve, reject) => {
    const openai = new OpenAI({
      apiKey: apiKey,
    });
    openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: "You will recieve error outputs, your goal is to help me fix this error and understand how it happened. Your name is Hal - like the AI from 2001 space odyssey. You will respond quick and concise and in plain text - no formatting. Attached below (optionally might include the whole code) is the error output. If you were not given the full code file and feel that it might be the missing key to debugging the code, mention that."},
        { role: 'user', content: prompt }
      ],
    })
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
}
export async function handleDebug(input, file) {
  try {
    const response = await generateChatResponse(apiKey, String(input), String(file));
    return(response.choices[0].message.content);
  } catch (error) {
    return('Error:'+ error);
  }
}