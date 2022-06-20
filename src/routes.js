const express = require('express');
const { login, signUp } = require('./controllers/admin');
const { getPersona } = require('./controllers/persona');
const loginAuth = require('./filters/login');

const router = express();

router.post('/login', login);
router.post('/signUp', signUp);

router.get('/test', (req, res) => {
    return res.status(200).json({ test: "server is running" })
})

router.use(loginAuth);

router.get('/persona/:id', getPersona);

module.exports = router;