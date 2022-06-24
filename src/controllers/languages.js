const knex = require('../database/connection');
const { findEntitie, findPersonaEntitie } = require('../utilities/entitiesFinder');
const { error500, error404 } = require('../utilities/errors');
const { schemaCreateLanguage, schemaUpdateLanguage } = require('../validations/schemas/schemaLanguage');


const createPersonaLanguage = async (req, res) => {
    const { title, fluency, personaId } = req.body;

    try {
        await schemaCreateLanguage.validate(req.body);

        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const newLanguage = await knex('languages').insert({ title, fluency }).returning('*');
        if (newLanguage.rowCount === 0) return res.status(500).json({ error: error500 });

        const personaLanguages = await knex('persona_languages').insert({ languages_id: newLanguage[0].id, persona_id: personaId }).returning('*');
        if (personaLanguages.rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(201).json(newLanguage[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updatePersonaLanguage = async (req, res) => {
    const { personaId, languageId } = req.params;

    try {
        await schemaUpdateLanguage.validate(req.body);

        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const personaLanguage = await findPersonaEntitie(personaId, 'languages', languageId);
        if (personaLanguage.error) return res.status(404).json({ error: personaLanguage.error });

        const updatedLanguage = await knex('languages').update(req.body).where({ id: personaLanguage.languages_id }).returning('*');
        if (updatedLanguage.rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json(updatedLanguage[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

const getPersonaLanguage = async (req, res) => {
    const { personaId, languageId } = req.params;

    try {
        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const language = await findEntitie('languages', languageId);
        if (language.error) return res.status(404).json({ error: language.error });

        return res.status(200).json(language)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getPersonaLanguageList = async (req, res) => {
    const { personaId } = req.params;

    try {
        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const languages = await knex('persona_languages')
            .join(
                'languages',
                'persona_languages.languages_id',
                '=',
                'languages.id')
            .select(
                'persona_languages.id',
                'languages.id',
                'languages.title',
                'languages.fluency'
            ).groupBy(
                'persona_languages.id',
                'languages.id',
                'languages.title',
                'languages.fluency'
            ).where('persona_id', personaId);

        return res.status(200).json(languages)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const removePersonaLanguage = async (req, res) => {
    const { personaId, languageId } = req.params;

    try {
        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const personaLanguage = await findPersonaEntitie(personaId, 'languages', languageId);
        if (personaLanguage.error) return res.status(404).json({ error: personaLanguage.error });

        const { rowCount } = await knex("persona_languages").del().where({ languages_id: languageId });
        if (rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { createPersonaLanguage, updatePersonaLanguage, getPersonaLanguage, getPersonaLanguageList, removePersonaLanguage }