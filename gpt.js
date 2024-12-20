const OpenAI = require('openai');

const prompt = async () => {
    const openai = new OpenAI ({
        apiKey: process.env.OPENAI_API_KEY
    });

    const messages = [
        { role: 'assistant', content:'You are a helpful assistant. Provide clear and accurate responses to user queries.'},
        {role: 'user', content: ''} // Your prompt in here
    ];

    const completion = await openai.chat.completions.create({
        messages,
        model: 'gpt-3.5-turbo' // gpt model (Check costs of each one in the OpenAI API webpage)
    });
    
    if (completion && completion.choices && completion.choices[0] && completion.choices[0].message) {
        return completion.choices[0].message.content;
    } else {
        console.error('The reply has an unexpected format:', completion);
        return 'Error: Invalid response.';
    }
};

module.exports = {prompt}; 
