const express = require('express');

const app = express();

app.use(express.json({ limit: '5mb' }));

app.get('/test', (req, res) => {
    return res.status(200).json({ test: true })
})

app.listen(process.env.PORT || 5500);