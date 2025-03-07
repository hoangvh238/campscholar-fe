import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storageApi = createApi({
  reducerPath: "storageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/minio" }),
  endpoints: (builder) => ({
    // Upload File Mutation
    uploadFile: builder.mutation<{ message: string; url: string }, FormData>({
      query: (formData) => ({
        url: "/uploadFile",
        method: "POST",
        body: formData,
      }),
    }),

    // List Objects Query
    listObjects: builder.query<
      { objects: any[] },
      { bucketName: string; prefix?: string }
    >({
      query: ({ bucketName, prefix = "" }) => ({
        url: `/listFile`,
        method: "GET",
        params: { bucketName, prefix }, // Use params for query parameters
      }),
    }),

    downloadFile: builder.query<
      Blob,
      { bucketName: string; objectName: string }
    >({
      query: ({ bucketName, objectName }) => ({
        url: `/downFile`,
        method: "GET",
        params: { bucketName, objectName },
        responseHandler: (response) => {
          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.startsWith("application/json")) {
            return response.json();
          }
          return response.blob();
        },
      }),
    }),

    // Delete File Mutation
    deleteFile: builder.mutation<
      { message: string },
      { bucketName: string; objectName: string }
    >({
      query: ({ bucketName, objectName }) => ({
        url: `/deleteFile`,
        method: "DELETE",
        params: { bucketName, objectName }, // Use params for query parameters
      }),
    }),

    // Copy File Mutation
    copyFile: builder.mutation<
      { message: string },
      {
        bucketName: string;
        objectName: string;
        targetBucket: string;
        targetObject: string;
      }
    >({
      query: ({ bucketName, objectName, targetBucket, targetObject }) => ({
        url: `/copyFile`,
        method: "PATCH",
        body: { bucketName, objectName, targetBucket, targetObject },
      }),
    }),

    // Get Metadata Query
    getMetadata: builder.query<
      { metadata: any },
      { bucketName: string; objectName: string }
    >({
      query: ({ bucketName, objectName }) => ({
        url: `/metadataFile`,
        method: "OPTIONS",
        params: { bucketName, objectName }, // Use params for query parameters
      }),
    }),

    uploadFilePublic: builder.mutation<{ url: string }, FormData>({
      query: (formData) => ({
        url: "/uploadPublic",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useUploadFileMutation,
  useListObjectsQuery,
  useDownloadFileQuery,
  useDeleteFileMutation,
  useCopyFileMutation,
  useGetMetadataQuery,
  useUploadFilePublicMutation,
} = storageApi;
