
const axios = require('axios');
const fs = require('fs').promises;

async function sendInputToApi(inputText, filePath) {
    try {
        const payload = {
            text: inputText,
            file: filePath
        };

        const response = await axios.post('http://localhost:4000/api/webview/input', payload);
        console.log(response.data.output);
    } catch (error) {
        console.error('Error sending input to API:', error);
    }
}
sendInputToApi('efndkjwensfkjwenfkjwdenfkewkjf', 'dummy.js');