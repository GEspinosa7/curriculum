const supabase = require('../supabase');
const { errorUploadImage } = require('./errors');

const uploadImage = async (imageName, image) => {
    const data = { noImage: false, errorUpload: '', imageUrl: '' };

    if (!image) {
        data.noImage = true
        return data;
    };

    const buffer = Buffer.from(image, 'base64');
    const formatedImageName = `${imageName.trim().replace(/\s/g, '_')}_${Math.random().toString(36).substring(7)}`;

    try {
        const { error } = await supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .upload(`${formatedImageName}`, buffer, {});

        if (error) {
            if (error.message !== errorUploadImage) {
                data.errorUpload = error.message
                return data;
            }

            const { publicURL } = supabase
                .storage
                .from(process.env.SUPABASE_BUCKET)
                .getPublicUrl(formatedImageName);

            data.imageUrl = publicURL;

            return data;
        }

        const { publicURL, error: errorPublicUrl } = supabase
            .storage
            .from(process.env.SUPABASE_BUCKET)
            .getPublicUrl(formatedImageName);

        if (errorPublicUrl) {
            data.errorUpload = errorPublicUrl.message;
            return data;
        }

        data.imageUrl = publicURL;

        return data;
    } catch (error) {
        return data.errorUpload = error.message;
    }

}

module.exports = uploadImage;