const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, pass } = req.body;

    if (!email || !pass) return res.status(400).json({ error: "empty values" })

    try {
        const admin = await knex('admin_user').where({ email }).first();
        if (!admin) return res.status(404).json({ error: "User not found!" });

        const correctPass = await bcrypt.compare(pass, admin.pass);
        if (!correctPass) return res.status(400).json({ error: "Email or password are incorrect" });

        const token = jwt.sign({ id: admin.id }, process.env.HASH_PASS);
        const { pass: _, ...adminData } = admin;

        return res.status(200).json({ admin: adminData, token })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const createAdmin = async (req, res) => {
    const { email, pass } = req.body;

    try {
        const adminFound = await knex("admin_user").where({ email }).first();
        if (adminFound) return res.status(409).json({ erro: "This email is already taken" });

        const encryptedPass = await bcrypt.hash(pass, 10);

        const admin = await knex("admin_user").insert({ email, pass: encryptedPass }).returning('*');
        if (!admin) return res.status(500).json({ erro: 'Something went wrong, please try again' });

        const { pass: _, ...adminData } = admin[0];

        return res.status(200).json(adminData);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { login, createAdmin };