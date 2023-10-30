const cloudinary = require('cloudinary').v2; // Import Cloudinary
const fs = require('fs'); // Import the 'fs' module
const os = require('os'); // Import the 'os' module
const path = require('path');

// Configure Cloudinary (make sure you've set your Cloudinary configuration)
cloudinary.config({
    cloud_name: 'dskzyrn0g',
    api_key: '559324169655215',
    api_secret: 'y0MWxgmuqwlEKK-vcCpHvsMMNOs',
});

const uploadImage = async (imagePath, title) => {
    try {
        const options = {
            "folder": "FindMyEventsEventImages",  // Specify the folder name
            "public_id": `${title}_img`, // Specify the file name
        }
        return await cloudinary.uploader.upload(imagePath, options, (error, result) => {
            if (error) {
                console.error(error);
                return { error: 'Image upload failed' }
            } else {
                return result.secure_url
            }

        });
    } catch (error) {
        console.error('Image upload failed:', error);
        throw error;
    }
};

module.exports = {
    uploadImage
};
