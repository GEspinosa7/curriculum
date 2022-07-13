const express = require('express');
const { createPersonaAD, getPersonaADList, getPersonaAD, updatePersonaAD, removePersonaAD } = require('./controllers/academicDegrees');
const { login, createAdmin } = require('./controllers/admin');
const { createPersonaCertificate, getPersonaCertificateList, getPersonaCertificate, updatePersonaCertificate, removePersonaCertificate } = require('./controllers/certificates');
const { createPersonaContact, getPersonaContactList, updatePersonaContact, removePersonaContact, getPersonaContact } = require('./controllers/contacts');
const { createPersonaExperience, getPersonaExperience, getPersonaExperienceList, updatePersonaExeperience, removePersonaExperience } = require('./controllers/experciences');
const { createPersonaLanguage, updatePersonaLanguage, getPersonaLanguage, getPersonaLanguageList, removePersonaLanguage } = require('./controllers/languages');
const { createMedia, updateMedia, getMediaList, getMedia, removeMedia } = require('./controllers/medias');
const { getPersona, createPersona, updatePersona } = require('./controllers/persona');
const { createPersonaProject, getPersonaProjectList, getPersonaProject, updatePersonaProject, removePersonaProject } = require('./controllers/projects');
const { createPersonaSkill, getPersonaSkill, getPersonaSkillList, removePersonaSkill, updatePersonaSkill } = require('./controllers/skills');
const loginAuth = require('./filters/login');

const router = express();

router.post('/login', login);
router.post('/create_admin', createAdmin);

router.get('/test', (req, res) => {
    return res.status(200).json({ test: "server is running" })
})

router.get('/persona/:id', getPersona);

router.get('/skills/:personaId', getPersonaSkillList);
router.get('/skills/:personaId/:skillId', getPersonaSkill);

router.get('/languages/:personaId', getPersonaLanguageList);
router.get('/languages/:personaId/:languageId', getPersonaLanguage);

router.get('/contacts/:personaId', getPersonaContactList);
router.get('/contacts/:personaId/:contactId', getPersonaContact);

router.get('/certificates/:personaId', getPersonaCertificateList);
router.get('/certificates/:personaId/:certificateId', getPersonaCertificate);

router.get('/projects/:personaId', getPersonaProjectList);
router.get('/projects/:personaId/:projectId', getPersonaProject);

router.get('/experiences/:personaId', getPersonaExperienceList);
router.get('/experiences/:personaId/:experienceId', getPersonaExperience);

router.get('/ad/:personaId', getPersonaADList);
router.get('/ad/:personaId/:adId', getPersonaAD);

router.get('/medias/', getMediaList);
router.get('/medias/:id', getMedia);

router.use(loginAuth);

router.post('/persona', createPersona);
router.put('/persona/:id', updatePersona);

router.post('/skills', createPersonaSkill);
router.put('/skills/:personaId/:skillId', updatePersonaSkill);
router.delete('/skills/:personaId/:skillId', removePersonaSkill);

router.post('/languages', createPersonaLanguage);
router.put('/languages/:personaId/:languageId', updatePersonaLanguage);
router.delete('/languages/:personaId/:languageId', removePersonaLanguage);

router.post('/contacts', createPersonaContact);
router.put('/contacts/:personaId/:contactId', updatePersonaContact);
router.delete('/contacts/:personaId/:contactId', removePersonaContact);

router.post('/certificates', createPersonaCertificate);
router.put('/certificates/:personaId/:certificateId', updatePersonaCertificate);
router.delete('/certificates/:personaId/:certificateId', removePersonaCertificate);

router.post('/projects', createPersonaProject);
router.put('/projects/:personaId/:projectId', updatePersonaProject);
router.delete('/projects/:personaId/:projectId', removePersonaProject);

router.post('/experiences', createPersonaExperience);
router.put('/experiences/:personaId/:experienceId', updatePersonaExeperience);
router.delete('/experiences/:personaId/:experienceId', removePersonaExperience);

router.post('/ad', createPersonaAD);
router.put('/ad/:personaId/:adId', updatePersonaAD);
router.delete('/ad/:personaId/:adId', removePersonaAD);

router.post('/medias', createMedia);
router.put('/medias/:id', updateMedia);
router.delete('/medias/:id', removeMedia);

module.exports = router;