const yup = require('yup');

const schemaAdmin = yup.object().shape({
    email: yup.string().email().required(),
    pass: yup.string().required()
});

module.exports = schemaAdmin;