export const convertBlobToViewableData = (blob: Blob, objectName: string) => {
  const url = window.URL.createObjectURL(blob);

  const fileExtension = objectName.split(".").pop()?.toLowerCase();
  if (
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "png" ||
    fileExtension === "gif"
  ) {
    return (
      <img
        alt={objectName}
        src={url}
        style={{ maxWidth: "100%", maxHeight: "400px" }}
      />
    );
  } else if (fileExtension === "pdf") {
    return (
      <iframe
        src={url}
        style={{ width: "100%", height: "400px" }}
        title="PDF Viewer"
      />
    );
  } else {
    return (
      <a
        download={objectName}
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        Download {objectName}
      </a>
    );
  }
};
