const knex = require('../database/connection');
const { findEntitie, findPersonaEntitie } = require('../utilities/entitiesFinder');
const { error500, error404 } = require('../utilities/errors');
const { schemaCreateProject, schemaUpdateProject } = require('../validations/schemas/schemaProject');

const createPersonaProject = async (req, res) => {
    const { title, p_description, activities, personaId } = req.body;

    try {
        await schemaCreateProject.validate(req.body);

        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const newProject = await knex('projects').insert({ title, p_description, activities }).returning('*');
        if (!newProject[0]) return res.status(500).json({ error: error500 });

        const personaProjects = await knex('persona_projects').insert({ projects_id: newProject[0].id, persona_id: personaId }).returning('*');
        if (!personaProjects[0]) return res.status(500).json({ error: error500 });

        return res.status(201).json(personaProjects[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updatePersonaProject = async (req, res) => {
    const { personaId, projectId } = req.params;

    try {
        await schemaUpdateProject.validate(req.body);

        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const personaProject = await findPersonaEntitie(personaId, 'projects', projectId);
        if (personaProject.error) return res.status(404).json({ error: personaProject.error });

        const updatedProject = await knex('projects').update(req.body).where({ id: personaProject.projects_id }).returning('*');
        if (!updatedProject[0]) return res.status(500).json({ error: error500 });

        return res.status(200).json(updatedProject[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

const getPersonaProject = async (req, res) => {
    const { personaId, projectId } = req.params;

    try {
        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const project = await findEntitie('projects', projectId);
        if (project.error) return res.status(404).json({ error: project.error });

        return res.status(200).json(project)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getPersonaProjectList = async (req, res) => {
    const { personaId } = req.params;

    try {
        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const projects = await knex('persona_projects')
            .join(
                'projects',
                'persona_projects.projects_id',
                '=',
                'projects.id')
            .select(
                'persona_projects.id',
                'projects.id',
                'projects.title',
                'projects.p_description',
                'projects.activities'
            ).groupBy(
                'persona_projects.id',
                'projects.id',
                'projects.title',
                'projects.p_description',
                'projects.activities'
            ).where('persona_id', personaId);

        if (!projects) return res.status(404).json({ error: error404('project list') });

        return res.status(200).json(projects)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const removePersonaProject = async (req, res) => {
    const { personaId, projectId } = req.params;

    try {
        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const personaProject = await findPersonaEntitie(personaId, 'projects', projectId);
        if (personaProject.error) return res.status(404).json({ error: personaProject.error });

        const { rowCount } = await knex("persona_projects").del().where({ projects_id: projectId });
        if (rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { createPersonaProject, updatePersonaProject, getPersonaProject, getPersonaProjectList, removePersonaProject }