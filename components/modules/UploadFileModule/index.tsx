"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import { BUCKET_TYPE } from "@/settings/bucketType";
import {
  useUploadFileMutation,
  useListObjectsQuery,
  useDownloadFileQuery,
  useDeleteFileMutation,
  useCopyFileMutation,
  useGetMetadataQuery,
} from "@/store/queries/minioStorage";
import { Button } from "@/components/core/common/button";
import { Input } from "@/components/core/common/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/core/common/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/core/common/alert-dialog";
import { convertBlobToViewableData } from "@/settings/convertBlodToLink";

const FileManagerModule: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [bucketName, setBucketName] = useState<string>("");
  const [objectName, setObjectName] = useState<string>("");
  const [targetBucket, setTargetBucket] = useState<string>("");
  const [targetObject, setTargetObject] = useState<string>("");
  const [prefix, setPrefix] = useState<string>(""); // New state for prefix
  const [alertMessage, setAlertMessage] = useState<string>("");

  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation();
  const [copyFile, { isLoading: isCopying }] = useCopyFileMutation();

  const {
    data: listData,
    isLoading: isListing,
    isError: isListError,
    refetch: listObjects,
  } = useListObjectsQuery({ bucketName, prefix }, { skip: !bucketName });
  const {
    data: downloadData,
    isLoading: isDownloading,
    isError: isDownloadError,
    refetch: downloadFile,
  } = useDownloadFileQuery(
    { bucketName, objectName },
    { skip: !(bucketName && objectName) },
  );
  const {
    data: metadataData,
    isLoading: isMetadataLoading,
    refetch: getMetadata,
  } = useGetMetadataQuery(
    { bucketName, objectName },
    { skip: !(bucketName && objectName) },
  );

  const showAlert = (message: string) => setAlertMessage(message);

  const handleFileUpload = async () => {
    if (!file) return showAlert("Please select a file");
    if (!bucketName) return showAlert("Please provide a bucket name");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("bucketType", BUCKET_TYPE.CONTESTS);

    try {
      await uploadFile(formData).unwrap();
      showAlert("File uploaded successfully!");
    } catch (error: any) {
      showAlert(`Upload failed: ${error?.data?.error || "Unknown error"}`);
    }
  };

  const handleFileDelete = async () => {
    if (!bucketName || !objectName)
      return showAlert("Please provide bucket name and object name");
    try {
      await deleteFile({ bucketName, objectName }).unwrap();
      showAlert("File deleted successfully!");
    } catch (error: any) {
      showAlert(`Delete failed: ${error?.data?.error || "Unknown error"}`);
    }
  };

  const handleFileCopy = async () => {
    if (!bucketName || !objectName || !targetBucket || !targetObject)
      return showAlert("Please provide all required fields");
    try {
      await copyFile({
        bucketName,
        objectName,
        targetBucket,
        targetObject,
      }).unwrap();
      showAlert("File copied successfully!");
    } catch (error: any) {
      showAlert(`Copy failed: ${error?.data?.error || "Unknown error"}`);
    }
  };

  const handleListObjects = () => {
    if (!bucketName) return showAlert("Please provide a bucket name");
    listObjects(); // Trigger refetch here
  };

  const handleDownloadFile = async () => {
    if (!bucketName || !objectName)
      return showAlert("Please provide bucket name and object name");

    try {
      const response = await downloadFile();
      if (response.data) {
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", objectName); // Set file name
        document.body.appendChild(link);
        link.click();
        // Dọn dẹp URL sau khi tải xong
        link.remove();
        window.URL.revokeObjectURL(url);
        showAlert("File downloaded successfully!");
      } else {
        showAlert("Error downloading file");
      }
    } catch (error: any) {
      showAlert(`Download failed: ${error?.data?.error || "Unknown error"}`);
    }
  };

  const handleGetMetadata = () => {
    if (!bucketName || !objectName)
      return showAlert("Please provide bucket name and object name");
    getMetadata(); // Trigger refetch here
  };
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
      <h1 className="col-span-full mb-6 text-3xl font-bold">File Manager</h1>

      {/* File Upload Card */}
      <Card>
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Input
              placeholder="Enter bucket name"
              type="text"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
            />
            <Button disabled={isUploading} onClick={handleFileUpload}>
              {isUploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isUploading ? "Uploading..." : "Upload File"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* List Objects Card */}
      <Card>
        <CardHeader>
          <CardTitle>List Objects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter bucket name"
              type="text"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
            />
            <Input
              placeholder="Enter prefix"
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            />
            <Button disabled={isListing} onClick={handleListObjects}>
              List Objects
            </Button>
            {isListing && <div>Loading...</div>}
            {isListError && (
              <div className="text-red-500">Error fetching objects</div>
            )}
            <ul className="list-disc pl-5">
              {listData?.objects?.map((object) => (
                <li key={object.name}>{object.name}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Download File Card */}
      <Card>
        <CardHeader>
          <CardTitle>Download File</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter bucket name"
              type="text"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
            />
            <Input
              placeholder="Enter object name"
              type="text"
              value={objectName}
              onChange={(e) => setObjectName(e.target.value)}
            />
            <Button disabled={isDownloading} onClick={handleDownloadFile}>
              Download File
            </Button>
            {isDownloading && <div>Downloading...</div>}
            {isDownloadError && (
              <div className="text-red-500">Error downloading file</div>
            )}
            {downloadData && (
              <div>
                File downloaded:{" "}
                {convertBlobToViewableData(downloadData, objectName)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete File Card */}
      <Card>
        <CardHeader>
          <CardTitle>Delete File</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter bucket name"
              type="text"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
            />
            <Input
              placeholder="Enter object name"
              type="text"
              value={objectName}
              onChange={(e) => setObjectName(e.target.value)}
            />
            <Button disabled={isDeleting} onClick={handleFileDelete}>
              {isDeleting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isDeleting ? "Deleting..." : "Delete File"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Copy File Card */}
      <Card>
        <CardHeader>
          <CardTitle>Copy File</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter bucket name"
              type="text"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
            />
            <Input
              placeholder="Enter object name"
              type="text"
              value={objectName}
              onChange={(e) => setObjectName(e.target.value)}
            />
            <Input
              placeholder="Enter target bucket"
              type="text"
              value={targetBucket}
              onChange={(e) => setTargetBucket(e.target.value)}
            />
            <Input
              placeholder="Enter target object"
              type="text"
              value={targetObject}
              onChange={(e) => setTargetObject(e.target.value)}
            />
            <Button disabled={isCopying} onClick={handleFileCopy}>
              {isCopying ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isCopying ? "Copying..." : "Copy File"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Get Metadata Card */}
      <Card>
        <CardHeader>
          <CardTitle>Get Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter bucket name"
              type="text"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
            />
            <Input
              placeholder="Enter object name"
              type="text"
              value={objectName}
              onChange={(e) => setObjectName(e.target.value)}
            />
            <Button disabled={isMetadataLoading} onClick={handleGetMetadata}>
              Fetch Metadata
            </Button>
            {isMetadataLoading && <div>Loading metadata...</div>}
            {metadataData && (
              <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
                {JSON.stringify(metadataData.metadata, null, 2)}
              </pre>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Alert Dialog */}
      <AlertDialog
        open={!!alertMessage}
        onOpenChange={() => setAlertMessage("")}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default FileManagerModule;
