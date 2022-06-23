const knex = require('../database/connection');
const { findEntitie, findPersonaEntitie } = require('../utilities/entitiesFinder');
const { error500, error404 } = require('../utilities/errors');
const { schemaUpdateAD, schemaCreateAD } = require('../validations/schemas/schemaAD');

const createPersonaAD = async (req, res) => {
    const { title, institution_name, institution_web_site, ad_start_date, ad_end_date, ad_description,
        personaId
    } = req.body;

    try {
        await schemaCreateAD.validate(req.body);

        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const newAD = await knex('academic_degrees').insert({
            title, institution_name, institution_web_site, ad_start_date, ad_end_date, ad_description
        }).returning('*');

        if (!newAD[0]) return res.status(500).json({ error: error500 });

        const getPersonaADs = await knex('persona_academic_degrees').insert({ academic_degrees_id: newAD[0].id, persona_id: personaId }).returning('*');
        if (!getPersonaADs[0]) return res.status(500).json({ error: error500 });

        return res.status(201).json(getPersonaADs[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updatePersonaAD = async (req, res) => {
    const { personaId, adId } = req.params;

    try {
        await schemaUpdateAD.validate(req.body);

        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const personaAD = await findPersonaEntitie(personaId, 'academic_degrees', adId);
        if (personaAD.error) return res.status(404).json({ error: personaAD.error });

        const updatedAD = await knex('academic_degrees').update(req.body).where({ id: personaAD.academic_degrees_id }).returning('*');
        if (!updatedAD[0]) return res.status(500).json({ error: error500 });

        return res.status(200).json(updatedAD[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

const getPersonaAD = async (req, res) => {
    const { personaId, adId } = req.params;

    try {
        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const ad = await findEntitie('academic_degrees', adId);
        if (ad.error) return res.status(404).json({ error: ad.error });

        return res.status(200).json(ad)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getPersonaADList = async (req, res) => {
    const { personaId } = req.params;

    try {
        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const academic_degrees = await knex('persona_academic_degrees')
            .join(
                'academic_degrees',
                'persona_academic_degrees.academic_degrees_id',
                '=',
                'academic_degrees.id')
            .select(
                'persona_academic_degrees.id',
                'academic_degrees.id',
                'academic_degrees.title',
                'academic_degrees.institution_name',
                'academic_degrees.institution_web_site',
                'academic_degrees.ad_start_date',
                'academic_degrees.ad_end_date',
                'academic_degrees.ad_description'
            ).groupBy(
                'persona_academic_degrees.id',
                'academic_degrees.id',
                'academic_degrees.title',
                'academic_degrees.institution_name',
                'academic_degrees.institution_web_site',
                'academic_degrees.ad_start_date',
                'academic_degrees.ad_end_date',
                'academic_degrees.ad_description'
            ).where('persona_id', personaId);

        if (!academic_degrees) return res.status(404).json({ error: error404('ad list') });

        return res.status(200).json(academic_degrees)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const removePersonaAD = async (req, res) => {
    const { personaId, adId } = req.params;

    try {
        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const personaAD = await findPersonaEntitie(personaId, 'academic_degrees', adId);
        if (personaAD.error) return res.status(404).json({ error: personaAD.error });

        const { rowCount } = await knex("persona_academic_degrees").del().where({ academic_degrees_id: adId });
        if (rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { createPersonaAD, updatePersonaAD, getPersonaAD, getPersonaADList, removePersonaAD }