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

const findPersonaEntitie = async (personaId, entitieName, entitieId) => {
    try {
        const personaEntitie = await knex(`persona_${entitieName}`)
            .where('persona_id', personaId)
            .andWhere(`${entitieName}_id`, entitieId)
            .first();

        if (!personaEntitie) return { error: error404(`${entitieName}`) };

        return personaEntitie;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = { findPersonaEntitie, findEntitie };