const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');

const pictureController = require('../controller/picture.controller');

router.post('/create', upload.single("file") ,pictureController.createPicture);

router.get('/findAllPictures', pictureController.findAllPictures);

router.get('/find/:id', pictureController.findPictureById);

router.delete('/delete/:id', pictureController.deletePicture);

module.exports = router;