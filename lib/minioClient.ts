import * as Minio from "minio";

const minioClient = new Minio.Client({
  endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT || "localhost",
  port: parseInt(process.env.NEXT_PUBLIC_MINIO_PORT || "9000"),
  useSSL: process.env.NEXT_PUBLIC_MINIO_USE_SSL === "true",
  accessKey: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY || "minioadmin",
  secretKey: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY || "minioadmin",
});
export default minioClient;
