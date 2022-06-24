const yup = require('yup');

const schemaCreateMedia = yup.object().shape({
    imageName: yup.string().required()
});

const schemaUpdateMedia = yup.object().shape({
    imageName: yup.string()
});


module.exports = { schemaCreateMedia, schemaUpdateMedia }