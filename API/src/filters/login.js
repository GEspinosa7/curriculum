const knex = require('../database/connection');
const jwt = require('jsonwebtoken');

const loginAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).json({ erro: 'Token not informed' });

    try {
        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, process.env.HASH_PASS);

        const admin = await knex('admin_user').where({ id }).first();
        if (!admin) return res.status(404).json({ erro: 'Admin not found' });

        const { pass: adminPass, ...adminData } = admin;

        req.admin = adminData;

        next();
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

module.exports = loginAuth;