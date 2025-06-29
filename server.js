const express = require('express');
const Sentiment = require('sentiment');
const path = require('path');

const app = express();
const sentiment = new Sentiment();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/analyze', (req, res) => {
    const text = req.body.text;
    const result = sentiment.analyze(text);
    let sentimentText = 'Neutral 😐';

    if (result.score > 0) sentimentText = 'Positive 😊';
    else if (result.score < 0) sentimentText = 'Negative 😞';

    res.send(`
        <h2>Sentiment Result:</h2>
        <p><strong>${sentimentText}</strong></p>
        <a href="/">🔙 Go Back</a>
    `);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, () => {
    console.log('✅ Server running at http://localhost:3000');
});
