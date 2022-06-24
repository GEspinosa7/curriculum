const yup = require('yup');

const schemaCreateProject = yup.object().shape({
    title: yup.string().required(),
    p_description: yup.string().required(),
    activities: yup.string().required(),
    personaId: yup.number().required()
});

const schemaUpdateProject = yup.object().shape({
    title: yup.string(),
    p_description: yup.string(),
    activities: yup.string()
});


module.exports = { schemaCreateProject, schemaUpdateProject }