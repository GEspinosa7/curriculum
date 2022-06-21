const express = require('express');
const { login, createAdmin } = require('./controllers/admin');
const { getPersona, createPersona, updatePersona } = require('./controllers/persona');
const { createPersonaSkill, getPersonaSkill, getPersonaSkillList, removePersonaSkill, updatePersonaSkill } = require('./controllers/skills');
const loginAuth = require('./filters/login');

const router = express();

router.post('/login', login);
router.post('/create_admin', createAdmin);

router.get('/test', (req, res) => {
    return res.status(200).json({ test: "server is running" })
})

router.use(loginAuth);

router.get('/persona/:id', getPersona);
router.post('/persona', createPersona);
router.put('/persona/:id', updatePersona);

router.post('/skill', createPersonaSkill);
router.get('/skill/:personaId/:id', getPersonaSkill);
router.get('/skill/:personaId', getPersonaSkillList);
router.put('/skill/:personaId/:id', updatePersonaSkill);
router.delete('/skill/:personaId/:id', removePersonaSkill);

module.exports = router;