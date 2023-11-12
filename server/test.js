const axios = require('axios');
const fs = require('fs').promises;

async function sendInputToApi(inputText) {
    try {
        const payload = {
            text: inputText
        };

        const response = await axios.post('http://localhost:4000/api/webview/input', payload);
        console.log(response.data.output);
    } catch (error) {
        console.error('Error sending input to API:', error);
    }
}
sendInputToApi('efndkjwensfkjwenfkjwdenfkewkjf');