const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageName: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Store the image path or URL
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;