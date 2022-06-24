const yup = require('yup');

const schemaCreateCertificate = yup.object().shape({
    title: yup.string().required(),
    institution: yup.string(),
    issue_date: yup.string(),
    expiration_date: yup.string(),
    credential_key: yup.string(),
    credential_url: yup.string(),
    personaId: yup.number().required()
});

const schemaUpdateCertificate = yup.object().shape({
    title: yup.string(),
    institution: yup.string(),
    issue_date: yup.string(),
    expiration_date: yup.string(),
    credential_key: yup.string(),
    credential_url: yup.string()
});


module.exports = { schemaCreateCertificate, schemaUpdateCertificate }