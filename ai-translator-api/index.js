

const axios = require('axios');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// App Settings
dotenv.config();
const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.ORIGIN;
app.use(express.json());
app.use(cors({
  origin: ORIGIN,
  methods: 'GET, POST',
}));


// Routes
app.get('/', (req, res) =>  res.send('Welcome to Mzwwwa API.'));


// Translation Route
app.post('/translate', async (req, res) => {
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
        res.status(500).json({ message: 'Error translating text' });
    }
});


// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}` );
  console.log(`Cors origin ${ORIGIN}` );
});
