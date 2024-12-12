import multer from "multer";
import path from "path";
import fs from "fs";

// Membuat direktori 'uploads' jika belum ada
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Menentukan folder tempat penyimpanan file
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Membuat nama file unik untuk menghindari konflik
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Inisialisasi multer dengan penyimpanan yang sudah didefinisikan
const upload = multer({ storage });

export default upload;
