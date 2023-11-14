const Picture = require('../models/Picture');

const findAllPictures = async () => Picture.find();

const findPictureById = async (id) => Picture.findById(id);

const deletePicture = async (id) => Picture.findByIdAndDelete(id);

module.exports = { findAllPictures, findPictureById, deletePicture };
