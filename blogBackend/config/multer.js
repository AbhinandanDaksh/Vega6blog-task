const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = (folderName) => {
  const uploadPath = path.join(__dirname, '..', 'uploads', folderName);
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    }
  });
};


const uploadFile = (folderName, allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']) => {
  return multer({
    storage: storage(folderName),
    fileFilter: (req, file, cb) => {
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only images are allowed.'));
      }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, 
  });
};

module.exports = uploadFile;