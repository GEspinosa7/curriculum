const knex = require('../database/connection');
const { findPersona, findPersonaSkill } = require('../utilities/entitiesFinder');
const { error500, error404 } = require('../utilities/errors');
const { schemaUpdateSkill, schemaCreateSkill } = require('../validations/schemas/schemaSkill');


const createPersonaSkill = async (req, res) => {
    const { title, personaId } = req.body;

    try {
        await schemaCreateSkill.validate(req.body);

        const persona = await findPersona(personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const newSkill = await knex('skills').insert({ title }).returning('*');
        if (!newSkill[0]) return res.status(500).json({ error: error500 });

        const personaSkills = await knex('persona_skills').insert({ skill_id: newSkill[0].id, persona_id: personaId }).returning('*');
        if (!personaSkills[0]) return res.status(500).json({ error: error500 });

        return res.status(201).json(personaSkills[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updatePersonaSkill = async (req, res) => {
    const { personaId, id } = req.params;

    try {
        await schemaUpdateSkill.validate(req.body);

        const persona = await findPersona(personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const personaSkill = await findPersonaSkill(personaId, id);
        if (personaSkill.error) return res.status(404).json({ error: personaSkill.error });

        const updatedSkill = await knex('skills').update(req.body).where({ id }).returning('*');
        if (!updatedSkill[0]) return res.status(500).json({ error: error500 });

        return res.status(200).json(updatedSkill[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

const getPersonaSkill = async (req, res) => {
    const { personaId, id } = req.params;

    try {
        const persona = await findPersona(personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const personaSkill = await findPersonaSkill(personaId, id);
        if (personaSkill.error) return res.status(404).json({ error: personaSkill.error });

        return res.status(200).json(personaSkill)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getPersonaSkillList = async (req, res) => {
    const { personaId } = req.params;

    try {
        const persona = await findPersona(personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const personaSkills = await knex('persona_skills').where({ persona_id: personaId });
        if (!personaSkills) return res.status(404).json({ error: error404('Skill list') });

        return res.status(200).json(personaSkills)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const removePersonaSkill = async (req, res) => {
    const { personaId, id } = req.params;

    try {
        const persona = await findPersona(personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const personaSkill = await findPersonaSkill(personaId, id);
        if (personaSkill.error) return res.status(404).json({ error: personaSkill.error });

        const { rowCount } = await knex("persona_skills").del().where({ id });
        if (rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { createPersonaSkill, updatePersonaSkill, getPersonaSkill, getPersonaSkillList, removePersonaSkill }