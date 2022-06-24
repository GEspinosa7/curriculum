const knex = require('../database/connection');
const { findEntitie, findPersonaEntitie } = require('../utilities/entitiesFinder');
const { error500, error404 } = require('../utilities/errors');
const { schemaCreateContact, schemaUpdateContact } = require('../validations/schemas/schemaContact');

const createPersonaContact = async (req, res) => {
    const { title, link, personaId } = req.body;

    try {
        await schemaCreateContact.validate(req.body);

        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const newContact = await knex('contacts').insert({ title, link }).returning('*');
        if (newContact.rowCount === 0) return res.status(500).json({ error: error500 });

        const getPersonaContacts = await knex('persona_contacts').insert({ contacts_id: newContact[0].id, persona_id: personaId }).returning('*');
        if (getPersonaContacts.rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(201).json(newContact[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updatePersonaContact = async (req, res) => {
    const { personaId, contactId } = req.params;

    try {
        await schemaUpdateContact.validate(req.body);

        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const personaContact = await findPersonaEntitie(personaId, 'contacts', contactId);
        if (personaContact.error) return res.status(404).json({ error: personaContact.error });

        const updatedContact = await knex('contacts').update(req.body).where({ id: personaContact.contacts_id }).returning('*');
        if (updatedContact.rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json(updatedContact[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

const getPersonaContact = async (req, res) => {
    const { personaId, contactId } = req.params;

    try {
        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const contact = await findEntitie('contacts', contactId);
        if (contact.error) return res.status(404).json({ error: contact.error });

        return res.status(200).json(contact)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getPersonaContactList = async (req, res) => {
    const { personaId } = req.params;

    try {
        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const contacts = await knex('persona_contacts')
            .join(
                'contacts',
                'persona_contacts.contacts_id',
                '=',
                'contacts.id')
            .select(
                'persona_contacts.id',
                'contacts.id',
                'contacts.title',
                'contacts.link'
            ).groupBy(
                'persona_contacts.id',
                'contacts.id',
                'contacts.title',
                'contacts.link'
            ).where('persona_id', personaId);

        return res.status(200).json(contacts)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const removePersonaContact = async (req, res) => {
    const { personaId, contactId } = req.params;

    try {
        const { error } = await findEntitie('persona', personaId);
        if (error) return res.status(404).json({ error });

        const personaContact = await findPersonaEntitie(personaId, 'contacts', contactId);
        if (personaContact.error) return res.status(404).json({ error: personaContact.error });

        const { rowCount } = await knex("persona_contacts").del().where({ contacts_id: contactId });
        if (rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { createPersonaContact, updatePersonaContact, getPersonaContact, getPersonaContactList, removePersonaContact }