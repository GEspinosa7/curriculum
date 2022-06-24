const yup = require('yup');

const schemaCreateContact = yup.object().shape({
    title: yup.string().required(),
    link: yup.string().required(),
    personaId: yup.number().required()
});

const schemaUpdateContact = yup.object().shape({
    title: yup.string(),
    link: yup.string()
});


module.exports = { schemaCreateContact, schemaUpdateContact }