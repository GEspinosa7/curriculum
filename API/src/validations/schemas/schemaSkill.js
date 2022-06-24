const yup = require('yup');

const schemaCreateSkill = yup.object().shape({
    title: yup.string().required(),
    personaId: yup.number().required()
});

const schemaUpdateSkill = yup.object().shape({
    title: yup.string()
});


module.exports = { schemaCreateSkill, schemaUpdateSkill }