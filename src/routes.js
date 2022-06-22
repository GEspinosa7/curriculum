const express = require('express');
const { login, createAdmin } = require('./controllers/admin');
const { createPersonaContact, getPersonaContactList, updatePersonaContact, removePersonaContact, getPersonaContact } = require('./controllers/contact');
const { createPersonaLanguage, updatePersonaLanguage, getPersonaLanguage, getPersonaLanguageList, removePersonaLanguage } = require('./controllers/languages');
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

router.post('/persona', createPersona);
router.get('/persona/:id', getPersona);
router.put('/persona/:id', updatePersona);

router.post('/skills', createPersonaSkill);
router.get('/skills/:personaId', getPersonaSkillList);
router.get('/skills/:personaId/:skillId', getPersonaSkill);
router.put('/skills/:personaId/:skillId', updatePersonaSkill);
router.delete('/skills/:personaId/:skillId', removePersonaSkill);

router.post('/languages', createPersonaLanguage);
router.get('/languages/:personaId', getPersonaLanguageList);
router.get('/languages/:personaId/:languageId', getPersonaLanguage);
router.put('/languages/:personaId/:languageId', updatePersonaLanguage);
router.delete('/languages/:personaId/:languageId', removePersonaLanguage);

router.post('/contacts', createPersonaContact);
router.get('/contacts/:personaId', getPersonaContactList);
router.get('/contacts/:personaId/:contactId', getPersonaContact);
router.put('/contacts/:personaId/:contactId', updatePersonaContact);
router.delete('/contacts/:personaId/:contactId', removePersonaContact);

module.exports = router;