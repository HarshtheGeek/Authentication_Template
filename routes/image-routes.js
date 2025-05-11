const express = require('express');
const Authmiddleware = require('../middleware/auth-middleware');
const isAdminUser = require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/upload-middleware');
const {uploadController} = require('../controller/image-controller');

const router  = express.Router();

router.post("/upload", Authmiddleware,isAdminUser, uploadMiddleware.single('image'), uploadController);

module.exports = router;