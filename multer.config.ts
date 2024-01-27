import { S3Client } from "@aws-sdk/client-s3";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import * as dotenv from "dotenv";
import * as multerS3 from "multer-s3";
import { basename, extname, join } from "path";

dotenv.config();

export const MulterConfig: MulterOptions = {
  storage: multerS3({
    s3: new S3Client({
      region: process.env.S3_REGION
    }),
    bucket: process.env.S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, callback) => {
      const ext = extname(file.originalname);
      const base = basename(file.originalname, ext);
      const filename = base + Date.now() + ext;
      callback(null, filename);
    }
  })
}