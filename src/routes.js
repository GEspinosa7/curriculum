const express = require('express');
const { getPersona } = require('./controllers/persona');

const router = express();

router.get('/test', (req, res) => {
    return res.status(200).json({ test: "server is running" })
})

router.get('/persona/:id', getPersona);

module.exports = router;