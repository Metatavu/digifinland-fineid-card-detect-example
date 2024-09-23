const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

let mode = 'nocard';

/**
 * Helper function to read a JSON file
 * 
 * @param {string} filename 
 * @returns Promise for parsed JSON content
 */
function readJSONFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(`data/${filename}`, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }

      try {
        const json = JSON.parse(data);
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
  });
}

app.use(cors());

app.get('/version', async (req, res) => {
  if (mode === "error") {
    res.status(500).send('Internal Server Error');
    return;
  }

  const file = mode == "card" ? 'card.json' : 'nocard.json';
  try {
    const content = await readJSONFile(file);
    res.json(content);
  } catch (error) {
    res.status(500).send(`Error reading file: ${error.message}`);
  }
});

app.get('/mode', (req, res) => {
  mode = req.query.mode;
  if (mode !== 'card' && mode !== 'nocard' && mode !== 'error') {
    res.status(400).send('Invalid mode. Mode must be either "card", "nocard" or "error"');
    return;
  }

  res.send(`Switched to ${mode}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
