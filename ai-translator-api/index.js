

const axios = require('axios');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// App Settings
dotenv.config();
const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.ORIGIN || "http://localhost:3000";
app.use(express.json());


app.use(cors({
  origin: ORIGIN,
  methods:"GET,PUT,POST,OPTIONS",
  credentials: true,
}));


// Routes
app.get('/api', (req, res) =>  res.send('Welcome to Mzwwwa API.'));


// Translation Route
app.get('/api/translate', (req, res) => { 
  res.send('Send text to translate.')
});

app.post('/api/translate', async (req, res) => {
    const { text, fromLang, toLang } = req.body;
    const modelId = `Helsinki-NLP/opus-mt-${fromLang}-${toLang}`; // explore opus-100 also

    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${modelId}`,
            { inputs: text },
            { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
        );

        const translatedText = response.data[0]?.translation_text || 'Translation not available';
        res.json({ translatedText });
    } catch (error) {
        console.error('Translation Error:', error);
        res.status(500).json({ message: 'Error translating text', error });
    }
});


// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}` );
  console.log(`Cors origin ${ORIGIN}` );
});
