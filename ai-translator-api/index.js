

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
  const modelId = `Helsinki-NLP/opus-mt-${fromLang}-${toLang}`;

  try {
    const modelCheck = await axios.get(
      `https://huggingface.co/api/models/${modelId}`,
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );

    if (modelCheck.status === 200) {
      const translationResponse = await axios.post(
        `https://api-inference.huggingface.co/models/${modelId}`,
        { inputs: text },
        { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
      );

      const translatedText =
        translationResponse.data[0]?.translation_text || 'Translation not available';
      return res.json({ translatedText });
    } else {
      return res.status(404).json({ translatedText: 'Model not supported yet' });
    }
  } catch (error) {
    console.error('Translation Error:', error);

    const status = error.response?.status;
    if (status === 401) {
      return res.status(401).json({ message: 'Invalid or missing API key' });
    } else if (status === 404) {
      return res.status(404).json({ translatedText: 'Model not supported yet' });
    } else {
      return res.status(500).json({ message: 'Error translating text', error });
    }
  }
});



// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}` );
  console.log(`Cors origin ${ORIGIN}` );
});
