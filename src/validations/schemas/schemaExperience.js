const yup = require('yup');

const schemaCreateExperience = yup.object().shape({
    title: yup.string().required(),
    company: yup.string().required(),
    company_city: yup.string(),
    company_country: yup.string(),
    is_current_job: yup.string().required(),
    ex_start_date: yup.string().required(),
    ex_end_date: yup.string(),
    ex_description: yup.string(),
    job_type: yup.string().required(),
    personaId: yup.number().required()
});

const schemaUpdateExperience = yup.object().shape({
    title: yup.string(),
    company: yup.string(),
    company_city: yup.string(),
    company_country: yup.string(),
    is_current_job: yup.string(),
    ex_start_date: yup.string(),
    ex_end_date: yup.string(),
    ex_description: yup.string(),
    job_type: yup.string()
});

module.exports = { schemaCreateExperience, schemaUpdateExperience };