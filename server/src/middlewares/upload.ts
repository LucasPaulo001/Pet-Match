import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../settings/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "pets", // pasta dentro do Cloudinary
        allowed_formats: ["jpg", "png", "jpeg"],
        transformation: [{ width: 500, height: 500, crop: "limit" }],
    } as any
});

const upload = multer({ storage });

export default upload;