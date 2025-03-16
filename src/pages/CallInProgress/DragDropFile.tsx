import { Dialog } from "@progress/kendo-react-dialogs";
import { Switch } from "@progress/kendo-react-inputs";
import { useState, FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  CloudArrowUp48Regular,
  DocumentPdf32Regular,
} from "@fluentui/react-icons";
import styles from "./DragDropFile.module.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export const DragDropFile: FC = () => {
  const [ownData, setOwnData] = useState(false);
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any) => {
    const newFiles = acceptedFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    console.log(fileRejections);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Append new files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 10 * 1024 * 1024,
    maxFiles: 3,
    autoFocus: true,
    preventDropOnDocument: true,
    noDragEventsBubbling: true,
    onDropAccepted: (files) => {
      console.log("Files successfully uploaded:", files);
      setErrorMessage("");
    },
    onDropRejected: (fileRejections) => {
      console.log("Files rejected:", fileRejections);
      setErrorMessage(fileRejections[0].errors[0].message);
    },
  });

  const [preview, setPreview] = useState(false);

  const handleOwnData = () => {};

  const handleDeleteFile = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  const handlePreviewFile = (file: any) => {
    setPreview(true);
  };

  const handleClose = () => {
    setOwnData(false);
    setFiles([]);
  };

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setOwnData((prev) => !prev)}
      >
        Try your own data <Switch onChange={handleOwnData} checked={ownData} />
      </div>
      {ownData && (
        <Dialog onClose={handleClose} title="Upload Your Data here">
          <div
            style={{
              width: "800px",
              minHeight: "350px",
              padding: "20px",
              margin: "0 10px",
            }}
          >
            <div
              style={{
                borderRadius: "20px",
                height: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: errorMessage ? "3px dashed red" : "3px dashed #6368CE",
                flexDirection: "column",
                color: errorMessage ? "red" : "#6368CE",
                gap: "5px",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <>
                  <h4 style={{ fontWeight: "bold" }}>Drop Files Here</h4>
                </>
              ) : (
                <>
                  {errorMessage ? (
                    <>
                      <h6 style={{ fontWeight: "bold", color: "red" }}>
                        {errorMessage}
                      </h6>
                    </>
                  ) : (
                    <>
                      <CloudArrowUp48Regular primaryFill="#6368CE" />
                      <h4 style={{ fontWeight: "bold" }}>
                        Drag & Drop to Upload File
                      </h4>
                      <h5 style={{ fontWeight: "bold" }}>Or</h5>
                    </>
                  )}
                  <span
                    style={{
                      padding: "7px 20px",
                      backgroundColor: errorMessage ? "white" : "#6368CE",
                      color: errorMessage ? "red" : "white",
                      border: errorMessage ? "1px solid red" : "",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Browse Files
                  </span>
                </>
              )}
            </div>
            <div style={{ padding: "20px", color: "#6368CE" }}>
              {files.map((file, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <DocumentPdf32Regular primaryFill="#6368CE" />
                  <h6 style={{ marginTop: "3px" }}>{file.name}</h6>
                  <span
                    style={{
                      marginLeft: "40%",
                      border: "1px solid #6368CE",
                      padding: "5px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handlePreviewFile(file)}
                  >
                    Preview
                  </span>
                  {preview && (
                    <Dialog
                      onClose={() => {
                        setPreview(false);
                        setOwnData((prev) => prev);
                      }}
                      title={file.name}
                    >
                      <div
                        key={index}
                        style={{
                          height: "80vh",
                          width: "80vw",
                        }}
                      >
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                          <Viewer fileUrl={file.url} />
                        </Worker>
                      </div>
                    </Dialog>
                  )}
                  <span
                    style={{
                      marginLeft: "5px",
                      border: "1px solid #6368CE",
                      padding: "5px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeleteFile(file.name)}
                  >
                    Delete
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};
