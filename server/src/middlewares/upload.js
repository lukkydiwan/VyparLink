import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, '../../uploads');

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const filter = (_req, file, cb) =>
  /jpeg|jpg|png/.test(file.mimetype) ? cb(null, true) : cb('Images only');

const upload = multer({ storage, fileFilter: filter });

/* create thumb asynchronously */
upload.after = (req) => {
  if (!req.files) return;
  req.files.forEach((f) =>
    sharp(f.path).resize(400).toFile(`${UPLOAD_DIR}/thumb_${f.filename}`)
  );
};

export default upload;
