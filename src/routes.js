const express = require('express');

const router = express();

router.get('/test', (req, res) => {
    return res.status(200).json({ test: true })
})

module.exports = router;