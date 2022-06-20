const knex = require('../database/connection');

const getPersona = async (req, res) => {
    const { id } = req.params;
    try {
        const persona = await knex('persona').where({ id }).first();
        if (!persona) return res.status(404).json({ error: "not found" });

        return res.status(200).json(persona)

    } catch (error) {
        return res.status(400).json({ test: error.message })
    }
}

module.exports = { getPersona }