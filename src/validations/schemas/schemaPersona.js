const yup = require('yup');

const schemaCreatePersona = yup.object().shape({
    p_name: yup.string().required(),
    birthday: yup.string().required(),
    city: yup.string(),
    country: yup.string(),
    job: yup.string(),
    about: yup.string(),
    cpf: yup.string().required(),
});

const schemaUpdatePersona = yup.object().shape({
    p_name: yup.string(),
    birthday: yup.string(),
    city: yup.string(),
    country: yup.string(),
    job: yup.string(),
    about: yup.string(),
    cpf: yup.string()
});

module.exports = { schemaCreatePersona, schemaUpdatePersona };