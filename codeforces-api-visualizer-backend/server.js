// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Use cors middleware

app.post('/codeforces', async (req, res) => {
  try {
    const { handle } = req.body;
    const codeforcesData = await getCodeforcesData(handle);
    res.json(codeforcesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getCodeforcesData(handle) {
  try {
    const response = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Codeforces data');
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
