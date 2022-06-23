const error403 = `You can't create another persona`;
const error404 = (entitie) => `${entitie} not found!`;
const error500 = 'Something went wrong, please try again';

const errorUploadImage = `duplicate key value violates unique constraint \"bucketid_objname\"`;

module.exports = { error500, error403, error404, errorUploadImage }