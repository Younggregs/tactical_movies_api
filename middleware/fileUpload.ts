import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-provider-env";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: fromEnv(),
});

const storage = multerS3({
  s3: s3Client,
  bucket: "tactical-movies", // replace with your S3 bucket name
  key: function (
    req: unknown,
    file: { originalname: string },
    cb: (arg0: null, arg1: string) => void
  ) {
    cb(null, new Date().toISOString() + file.originalname); // use the original file name as the key
  },
});

export const upload = multer({ storage: storage });
