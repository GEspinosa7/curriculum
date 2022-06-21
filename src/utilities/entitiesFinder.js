const knex = require('../database/connection');
const { error404 } = require('./errors');

const findEntitie = async (entitie, id) => {
    try {
        const result = await knex(`${entitie}`).where({ id }).first();
        if (!result) return { error: error404(`${entitie}`) };

        return result;
    } catch (error) {
        return { error: error.message };
    }
}

const findPersonaSkill = async (personaId, skill_id) => {
    try {
        const personaSkill = await knex('persona_skills').where({ skill_id, persona_id: personaId }).first();
        if (!personaSkill) return { error: error404('Skill') };

        return personaSkill;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = { findPersonaSkill, findEntitie };