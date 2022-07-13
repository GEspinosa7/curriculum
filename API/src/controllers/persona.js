const knex = require('../database/connection');
const { findEntitie } = require('../utilities/entitiesFinder');
const { error500, error403 } = require('../utilities/errors');
const { schemaCreatePersona, schemaUpdatePersona } = require('../validations/schemas/schemaPersona');

const getPersona = async (req, res) => {
    const { id } = req.params;

    try {
        const persona = await findEntitie('persona', id);
        if (persona.error) return res.status(404).json({ error: persona.error });

        return res.status(200).json(persona)
    } catch (error) {
        return res.status(400).json({ test: error.message })
    }
}

const createPersona = async (req, res) => {
    try {
        await schemaCreatePersona.validate(req.body);

        const persona = await knex("persona").first();
        if (persona) return res.status(403).json({ error: error403 });

        const newPersona = await knex("persona").insert(req.body).returning('*');
        if (newPersona.rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(201).json(newPersona[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

const updatePersona = async (req, res) => {
    const { id } = req.params;

    try {
        await schemaUpdatePersona.validate(req.body);

        const { error } = await findEntitie('persona', id);
        if (error) return res.status(404).json({ error });

        const { rowCount } = await knex('persona').update(req.body).where({ id }).returning('*');
        if (rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json();
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

module.exports = { getPersona, createPersona, updatePersona }