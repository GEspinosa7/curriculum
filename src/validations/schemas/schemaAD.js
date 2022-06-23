const yup = require('yup');

const schemaCreateAD = yup.object().shape({
    title: yup.string(),
    institution_name: yup.string(),
    institution_web_site: yup.string(),
    ad_start_date: yup.string().required(),
    ad_end_date: yup.string(),
    ad_description: yup.string(),
    personaId: yup.number().required()
});

const schemaUpdateAD = yup.object().shape({
    title: yup.string(),
    institution_name: yup.string(),
    institution_web_site: yup.string(),
    ad_start_date: yup.string(),
    ad_end_date: yup.string(),
    ad_description: yup.string(),
});


module.exports = { schemaCreateAD, schemaUpdateAD }