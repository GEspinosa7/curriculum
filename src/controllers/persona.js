const knex = require('../database/connection');
const { schemaCreatePersona, schemaUpdatePersona } = require('../validations/schemas/schemaPersona');

const getPersona = async (req, res) => {
    const { cpf } = req.params;

    try {
        const persona = await knex('persona').where({ cpf }).first();
        if (!persona) return res.status(404).json({ error: "not found" });

        return res.status(200).json(persona)
    } catch (error) {
        return res.status(400).json({ test: error.message })
    }
}

const createPersona = async (req, res) => {
    const { cpf } = req.body;

    try {
        await schemaCreatePersona.validate(req.body);

        const persona = await knex("persona").where({ cpf }).first();
        if (persona) return res.status(404).json({ error: `You can't create another persona with same CPF` });

        const newPersona = await knex("persona").insert(req.body).returning('*');
        if (!newPersona) return res.status(500).json({ erro: 'Something went wrong, please try again' });

        return res.status(201).json(newPersona[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

const updatePersona = async (req, res) => {
    const { cpf } = req.params;

    try {
        await schemaUpdatePersona.validate(req.body);

        const persona = await knex("persona").where({ cpf }).first();
        if (!persona) return res.status(404).json({ error: 'Persona not found' });

        const updatedPersona = await knex('persona').update(req.body).where({ cpf }).returning('*');
        if (!updatedPersona[0]) return res.status(500).json({ erro: 'Something went wrong, please try again' });

        return res.status(200).json(updatedPersona[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

const removePersona = async (req, res) => {
    const { cpf } = req.params;

    try {
        const persona = await knex("persona").where({ cpf }).first();
        if (!persona) return res.status(404).json({ error: 'Persona not found' });

        const { rowCount } = await knex("persona").del().where({ cpf });
        if (rowCount === 0) return res.status(500).json({ erro: 'Something went wrong, please try again' });

        return res.status(200).json();
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

module.exports = { getPersona, createPersona, updatePersona, removePersona }