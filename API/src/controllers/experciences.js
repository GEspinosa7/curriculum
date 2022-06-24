const knex = require('../database/connection');
const { findEntitie, findPersonaEntitie } = require('../utilities/entitiesFinder');
const { error500, error404 } = require('../utilities/errors');
const { schemaCreateExperience, schemaUpdateExperience } = require('../validations/schemas/schemaExperience');

const createPersonaExperience = async (req, res) => {
    const { title, company, company_city, company_country, is_current_job, ex_start_date, ex_end_date, ex_description, job_type,
        personaId
    } = req.body;

    try {
        await schemaCreateExperience.validate(req.body);

        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const newExperience = await knex('experiences').insert({
            title, company, company_city, company_country, is_current_job, ex_start_date, ex_end_date, ex_description, job_type
        }).returning('*');

        if (newExperience.rowCount === 0) return res.status(500).json({ error: error500 });

        const getPersonaExperience = await knex('persona_experiences').insert({ experiences_id: newExperience[0].id, persona_id: personaId }).returning('*');
        if (getPersonaExperience.rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(201).json(newExperience[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updatePersonaExeperience = async (req, res) => {
    const { personaId, experienceId } = req.params;

    try {
        await schemaUpdateExperience.validate(req.body);

        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const personaExperience = await findPersonaEntitie(personaId, 'experiences', experienceId);
        if (personaExperience.error) return res.status(404).json({ error: personaExperience.error });

        const updatedExperience = await knex('experiences').update(req.body).where({ id: personaExperience.experiences_id }).returning('*');
        if (updatedExperience.rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json(updatedExperience[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

const getPersonaExperience = async (req, res) => {
    const { personaId, experienceId } = req.params;

    try {
        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const experience = await findEntitie('experiences', experienceId);
        if (experience.error) return res.status(404).json({ error: experience.error });

        return res.status(200).json(experience)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getPersonaExperienceList = async (req, res) => {
    const { personaId } = req.params;

    try {
        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const experiences = await knex('persona_experiences')
            .join(
                'experiences',
                'persona_experiences.experiences_id',
                '=',
                'experiences.id')
            .select(
                'persona_experiences.id',
                'experiences.id',
                'experiences.title',
                'experiences.company',
                'experiences.company_city',
                'experiences.company_country',
                'experiences.is_current_job',
                'experiences.ex_start_date',
                'experiences.ex_end_date',
                'experiences.ex_description',
                'experiences.job_type'
            ).groupBy(
                'persona_experiences.id',
                'experiences.id',
                'experiences.title',
                'experiences.company',
                'experiences.company_city',
                'experiences.company_country',
                'experiences.is_current_job',
                'experiences.ex_start_date',
                'experiences.ex_end_date',
                'experiences.ex_description',
                'experiences.job_type'
            ).where('persona_id', personaId);

        return res.status(200).json(experiences)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const removePersonaExperience = async (req, res) => {
    const { personaId, experienceId } = req.params;

    try {
        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const personaExperience = await findPersonaEntitie(personaId, 'experiences', experienceId);
        if (personaExperience.error) return res.status(404).json({ error: personaExperience.error });

        const { rowCount } = await knex("persona_experiences").del().where({ experiences_id: experienceId });
        if (rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { createPersonaExperience, updatePersonaExeperience, getPersonaExperience, getPersonaExperienceList, removePersonaExperience }