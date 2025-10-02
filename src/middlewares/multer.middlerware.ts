import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, + Date.now() + '-' +file.originalname.split('.')[0] + path.extname(file.originalname));
  }
});

// Initialize upload middleware and add file size limit
export const upload = multer({
  storage: storage,
})