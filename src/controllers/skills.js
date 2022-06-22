const knex = require('../database/connection');
const { findEntitie, findPersonaEntitie } = require('../utilities/entitiesFinder');
const { error500, error404 } = require('../utilities/errors');
const { schemaUpdateSkill, schemaCreateSkill } = require('../validations/schemas/schemaSkill');


const createPersonaSkill = async (req, res) => {
    const { title, personaId } = req.body;

    try {
        await schemaCreateSkill.validate(req.body);

        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const newSkill = await knex('skills').insert({ title }).returning('*');
        if (!newSkill[0]) return res.status(500).json({ error: error500 });

        const personaSkills = await knex('persona_skills').insert({ skills_id: newSkill[0].id, persona_id: personaId }).returning('*');
        if (!personaSkills[0]) return res.status(500).json({ error: error500 });

        return res.status(201).json(personaSkills[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updatePersonaSkill = async (req, res) => {
    const { personaId, skillId } = req.params;

    try {
        await schemaUpdateSkill.validate(req.body);

        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const personaSkill = await findPersonaEntitie(personaId, 'skills', skillId);
        if (personaSkill.error) return res.status(404).json({ error: personaSkill.error });

        const updatedSkill = await knex('skills').update(req.body).where({ id: personaSkill.skills_id }).returning('*');
        if (!updatedSkill[0]) return res.status(500).json({ error: error500 });

        return res.status(200).json(updatedSkill[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

const getPersonaSkill = async (req, res) => {
    const { personaId, skillId } = req.params;

    try {
        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const skill = await findEntitie('skills', skillId);
        if (skill.error) return res.status(404).json({ error: skill.error });

        return res.status(200).json(skill)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getPersonaSkillList = async (req, res) => {
    const { personaId } = req.params;

    try {
        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const skills = await knex('persona_skills')
            .join(
                'skills',
                'persona_skills.skills_id',
                '=',
                'skills.id')
            .select(
                'persona_skills.id',
                'skills.id',
                'skills.title'
            ).groupBy(
                'persona_skills.id',
                'skills.id',
                'skills.title'
            ).where('persona_id', personaId);

        if (!skills) return res.status(404).json({ error: error404('Skill list') });

        return res.status(200).json(skills)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const removePersonaSkill = async (req, res) => {
    const { personaId, skillId } = req.params;

    try {
        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });


        const personaSkill = await findPersonaEntitie(personaId, 'skills', skillId);
        if (personaSkill.error) return res.status(404).json({ error: personaSkill.error });

        const { rowCount } = await knex("persona_skills").del().where({ skills_id: skillId });
        if (rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { createPersonaSkill, updatePersonaSkill, getPersonaSkill, getPersonaSkillList, removePersonaSkill }