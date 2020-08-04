import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import { useDropzone } from "react-dropzone";
import csv from "csv";


export default function App() {
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading failed");
    reader.onload = () => {
      // Parse CSV file
      csv.parse(reader.result, (err, data) => {
        console.log("Parsed CSV data: ", data);
      });
    };

    // read file contents
    acceptedFiles.forEach(file => reader.readAsBinaryString(file));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="App" {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drop 'n' Drop some files here or click to upload</p>
    </div>
  );
}

