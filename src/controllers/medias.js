const knex = require('../database/connection');
const uploadImage = require('../utilities/uploadImage');
const { error500, error404 } = require('../utilities/errors');
const { findEntitie } = require('../utilities/entitiesFinder');
const { schemaCreateMedia, schemaUpdateMedia } = require('../validations/schemas/schemaMedia');


const createMedia = async (req, res) => {
    const { imageName, image, entitieName, entitieId } = req.body;

    try {
        await schemaCreateMedia.validate({ imageName });

        const resp = await uploadImage(imageName, image);
        if (resp.noImage) return res.status(400).json({ error: 'Image is a required field' });
        if (resp.errorUpload && resp.errorUpload !== '') return res.status(400).json({ error: errorUpload });

        const newMedia = await knex('medias').insert({ image_name: imageName, link: resp.imageUrl }).returning('*');
        if (newMedia.rowCount === 0) return res.status(500).json({ error: error500 });

        if (entitieName === 'projects') {
            const { rowCount } = await knex(`${entitieName}_medias`).insert({ medias_id: newMedia[0].id, projects_id: entitieId });
            if (rowCount === 0) return res.status(500).json({ error: error500 });
        }

        if (entitieName === 'academic_degress') {
            const { rowCount } = await knex(`${entitieName}_medias`).insert({ medias_id: newMedia[0].id, academic_degrees_id: entitieId });
            if (rowCount === 0) return res.status(500).json({ error: error500 });
        }

        return res.status(201).json(newMedia[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updateMedia = async (req, res) => {
    const { id } = req.params;
    const { imageName, image } = req.body;

    try {
        await schemaUpdateMedia.validate({ imageName })

        const media = await findEntitie('medias', id);
        if (media.error) return res.status(404).json({ error: error404('Media') });

        let columns = { image_name: imageName };

        let resp = await uploadImage(imageName, image);
        if (!resp.noImage) {
            if (resp.errorUpload && resp.errorUpload !== '') return res.status(400).json({ error: errorUpload });

            columns.link = resp.imageUrl;
        }

        const updatedMedia = await knex('medias').update(columns).where({ id }).returning('*');
        if (updatedMedia.rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json(updatedMedia[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

const getMedia = async (req, res) => {
    const { id } = req.params;

    try {
        const media = await findEntitie('medias', id);
        if (media.error) return res.status(404).json({ error: error404('Media') });

        return res.status(200).json(media)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getMediaList = async (req, res) => {
    try {
        const medias = await knex('medias');

        return res.status(200).json(medias)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const removeMedia = async (req, res) => {
    const { id } = req.params;

    try {
        const media = await findEntitie('medias', id);
        if (media.error) return res.status(404).json({ error: media.error });

        const projectMedia = await knex('projects_medias').where({ medias_id: id }).first();
        if (projectMedia) {
            const { rowCount } = await knex('projects_medias').del().where({ medias_id: id });
            if (rowCount === 0) return res.status(500).json({ error: error500 });
        }

        const adMedia = await knex('academic_degrees_medias').where({ medias_id: id }).first();
        if (adMedia) {
            const { rowCount } = await knex('projects_medias').del().where({ medias_id: id });
            if (rowCount === 0) return res.status(500).json({ error: error500 });
        }

        const { rowCount } = await knex('medias').del().where({ id });
        if (rowCount === 0) return res.status(500).json({ error: error500 });

        return res.status(200).json();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { createMedia, updateMedia, getMedia, getMediaList, removeMedia }