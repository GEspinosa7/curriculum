const knex = require('../database/connection');
const { error404 } = require('./errors');

const findPersona = async (id) => {
    try {
        const persona = await knex('persona').where({ id }).first();
        if (!persona) return { error: error404('Persona') };

        return persona;
    } catch (error) {
        return { error: error.message };
    }
}

const findPersonaSkill = async (personaId, id) => {
    try {
        const personaSkill = await knex('persona_skills').where({ id, persona_id: personaId }).first();
        if (!personaSkill) return { error: error404('Skill') };

        return personaSkill;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = { findPersona, findPersonaSkill };