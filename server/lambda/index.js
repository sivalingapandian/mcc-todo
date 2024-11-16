// handler.js
const axios = require('axios');
require('axios-debug-log');

exports.handler = async (event) => {
    try {
        // Parse the incoming request
        const { tasks } = JSON.parse(event.body);
        
        // OpenAI API request setup
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: tasks }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.API_KEY}` // Securely access API key
                }
            }
        );

        // Return response to the client
        return {
            statusCode: 200,
            body: JSON.stringify(response.data.choices[0].message.content),
        };
    } catch (error) {
        console.error("Error fetching plan from ChatGPT:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch plan' }),
        };
    }
};
