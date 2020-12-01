import { ContactsOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import FileStorageApi from "../../api/FileStorageApi";
import FileStorageForm from "../filestorage/FileStorageForm";
import FileStorage from "./FileStorage";


export default function FileStoragePage() {
    const [files, setFiles]=useState([]);

    const getAll = () => {
        FileStorageApi.getAllFiles()
        .then((res) => {
            setFiles(res.data);  
        })
    }

    useEffect(() => {
      getAll();
    }, []);

    const uploadFile = (fileData) => {
        console.log(fileData);
        return FileStorageApi.uploadFile(fileData)
        .then((res) => {
            alert("File Uploaded");
            setFiles([res.data, ...files]);
            console.log(res.data);
        });
    }
 
    const deleteFile = (file) => {
        return FileStorageApi.deleteFile(file.id)
        .then(() => {
            alert("File Deleted");
            getAll();
        });
    }

    return(
        <div>
            <FileStorageForm onUploadFile={uploadFile}/>
            
              { files.length === 0 ? "No Files Uploaded." : 
                    files
                        .map((file) => 
                        <FileStorage key={file.id}  file={file} onFileDelete={deleteFile} />
                )}
        </div>
    );
}

