const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
  destination: (request, file, callback) => {
    let folder = '';

    if (request.baseUrl.includes('users')) folder = 'users';

    callback(null, `public/images/${folder}`);
  },
  filename: (request, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(request, file, callback) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return callback(new Error('Por favor, envie apenas jpg ou png!'));
    }

    callback(undefined, true);
  },
});

module.exports = { imageUpload };
