const knex = require('../database/connection');
const { findEntitie, findPersonaEntitie } = require('../utilities/entitiesFinder');
const { error500, error404 } = require('../utilities/errors');
const { schemaCreateCertificate, schemaUpdateCertificate } = require('../validations/schemas/schemaCertificate');

const createPersonaCertificate = async (req, res) => {
    const {
        title, institution, issue_date, expiration_date, credential_key, credential_url,
        personaId
    } = req.body;

    try {
        await schemaCreateCertificate.validate(req.body);

        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const newCertificate = await knex('certificates').insert({ title, institution, issue_date, expiration_date, credential_key, credential_url }).returning('*');
        if (newCertificate.rowCount === 0) return res.status(500).json({ error: error500 });

        const getPersonaCertificate = await knex('persona_certificates').insert({ certificates_id: newCertificate[0].id, persona_id: personaId }).returning('*');
        if (getPersonaCertificate.rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(201).json(newCertificate[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updatePersonaCertificate = async (req, res) => {
    const { personaId, certificateId } = req.params;

    try {
        await schemaUpdateCertificate.validate(req.body);

        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const personaCertificate = await findPersonaEntitie(personaId, 'certificates', certificateId);
        if (personaCertificate.error) return res.status(404).json({ error: personaCertificate.error });

        const updatedCertificate = await knex('certificates').update(req.body).where({ id: personaCertificate.certificates_id }).returning('*');
        if (updatedCertificate.rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json(updatedCertificate[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

const getPersonaCertificate = async (req, res) => {
    const { personaId, certificateId } = req.params;

    try {
        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const contact = await findEntitie('certificates', certificateId);
        if (contact.error) return res.status(404).json({ error: contact.error });

        return res.status(200).json(contact)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getPersonaCertificateList = async (req, res) => {
    const { personaId } = req.params;

    try {
        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const certificates = await knex('persona_certificates')
            .join(
                'certificates',
                'persona_certificates.certificates_id',
                '=',
                'certificates.id')
            .select(
                'persona_certificates.id',
                'certificates.id',
                'certificates.title',
                'certificates.institution',
                'certificates.issue_date',
                'certificates.expiration_date',
                'certificates.credential_key',
                'certificates.credential_url'
            ).groupBy(
                'persona_certificates.id',
                'certificates.id',
                'certificates.title',
                'certificates.institution',
                'certificates.issue_date',
                'certificates.expiration_date',
                'certificates.credential_key',
                'certificates.credential_url'
            ).where('persona_id', personaId);

        return res.status(200).json(certificates)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const removePersonaCertificate = async (req, res) => {
    const { personaId, certificateId } = req.params;

    try {
        const persona = await findEntitie('persona', personaId);
        if (persona.error) return res.status(404).json({ error: persona.error });

        const personaCertificate = await findPersonaEntitie(personaId, 'certificates', certificateId);
        if (personaCertificate.error) return res.status(404).json({ error: personaCertificate.error });

        const { rowCount } = await knex("persona_certificates").del().where({ certificates_id: certificateId });
        if (rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { createPersonaCertificate, updatePersonaCertificate, getPersonaCertificate, getPersonaCertificateList, removePersonaCertificate }