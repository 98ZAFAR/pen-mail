const multer = require('multer');
const {storage} = require('../../configs/cloudinary');

const upload = multer({ storage });

module.exports = upload;
