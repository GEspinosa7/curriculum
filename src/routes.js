const express = require('express');
const { login, createAdmin } = require('./controllers/admin');
const { getPersona, createPersona, updatePersona, removePersona } = require('./controllers/persona');
const loginAuth = require('./filters/login');

const router = express();

router.post('/login', login);

router.get('/test', (req, res) => {
    return res.status(200).json({ test: "server is running" })
})

router.post('/create_admin', createAdmin);
router.use(loginAuth);

router.get('/persona/:cpf', getPersona);
router.post('/persona', createPersona);
router.put('/persona/:cpf', updatePersona);
router.delete('/persona/:cpf', removePersona);

module.exports = router;