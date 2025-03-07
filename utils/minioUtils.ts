import minioClient from "@/lib/minioClient";

const DEFAULT_EXPIRY = 3600;
export const getPresignedUrlForUpload = async (
  bucketName: string,
  objectName: string,
  expiry: number = DEFAULT_EXPIRY,
): Promise<string> => {
  return minioClient.presignedPutObject(bucketName, objectName.trim(), expiry);
};

export const getPresignedUrlForDownload = async (
  bucketName: string,
  objectName: string,
  expiry: number = DEFAULT_EXPIRY,
): Promise<string> => {
  return minioClient.presignedGetObject(bucketName, objectName.trim(), expiry);
};

export const ensureBucketExists = async (bucketName: string): Promise<void> => {
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) {
    await minioClient.makeBucket(bucketName, "us-east-1");
  }
};

export const uploadFile = async (
  bucketName: string,
  objectName: string,
  file: File,
): Promise<void> => {
  await ensureBucketExists(bucketName);
  const url = await getPresignedUrlForUpload(bucketName, objectName);
  await fetch(url, {
    method: "PUT",
    body: file,
  });
};

export const downloadFile = async (
  bucketName: string,
  objectName: string,
): Promise<Blob> => {
  try {
    const url = await getPresignedUrlForDownload(bucketName, objectName);
    if (!url) {
      throw new Error("Failed to generate a valid presigned URL.");
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to download file. HTTP Status: ${response.status}`,
      );
    }
    return await response.blob();
  } catch (error: any) {
    console.error("Download failed:", error);
    throw new Error(`Download failed: ${error.message || "Unknown error"}`);
  }
};

export const listObjects = async (
  bucketName: string,
  prefix: string = "",
): Promise<any[]> => {
  const stream = minioClient.listObjects(bucketName, prefix, true);
  const objects: any[] = [];
  for await (const obj of stream) {
    objects.push(obj);
  }
  return objects;
};

export const deleteObject = async (
  bucketName: string,
  objectName: string,
): Promise<void> => {
  await minioClient.removeObject(bucketName, objectName.trim());
};

export const deleteObjects = async (
  bucketName: string,
  objects: string[],
): Promise<void> => {
  await minioClient.removeObjects(
    bucketName,
    objects.map((obj) => obj.trim()),
  );
};

export const copyObject = async (
  bucketName: string,
  objectName: string,
  targetBucket: string,
  targetObject: string,
): Promise<void> => {
  await ensureBucketExists(targetBucket);
  await minioClient.copyObject(
    targetBucket,
    targetObject.trim(),
    `${bucketName}/${objectName.trim()}`,
  );
};

export const getObjectMetadata = async (
  bucketName: string,
  objectName: string,
): Promise<any> => {
  return minioClient.statObject(bucketName, objectName.trim());
};

export const objectExists = async (
  bucketName: string,
  objectName: string,
): Promise<boolean> => {
  try {
    await minioClient.statObject(bucketName, objectName.trim());
    return true;
  } catch (err) {
    return false;
  }
};

export const uploadFilePublic = async (
  bucketName: string,
  objectName: string,
  file: File,
): Promise<string> => {
  await ensureBucketExists(bucketName);

  if (!file) {
    throw new Error("File is required for upload.");
  }

  const fileBuffer = await file.arrayBuffer();
  const fileSize = fileBuffer.byteLength;
  await minioClient.putObject(
    bucketName,
    objectName,
    Buffer.from(fileBuffer),
    fileSize,
    { "Content-Type": file.type },
  );

  const protocol =
    process.env.NEXT_PUBLIC_MINIO_USE_SSL === "true" ? "https" : "http";
  return `${protocol}://${process.env.NEXT_PUBLIC_MINIO_ENDPOINT}:${process.env.NEXT_PUBLIC_MINIO_PORT}/${bucketName}/${encodeURIComponent(objectName)}`;
};
