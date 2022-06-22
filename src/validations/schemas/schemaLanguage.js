const yup = require('yup');

const schemaCreateLanguage = yup.object().shape({
    title: yup.string().required(),
    fluency: yup.string().required(),
    personaId: yup.number().required()
});

const schemaUpdateLanguage = yup.object().shape({
    title: yup.string(),
    fluency: yup.string()
});


module.exports = { schemaCreateLanguage, schemaUpdateLanguage }