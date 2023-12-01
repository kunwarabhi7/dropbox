/* eslint-disable react/no-unescaped-entities */
"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useUser } from "@clerk/nextjs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const DropZoneComponents = () => {
  const [loading, setLoading] = useState(false);
  const maxSize = 20971520;
  const { user, isLoaded, isSignedIn } = useUser();
  const docRef = collection(db, `users/${user?.id}/files`);
  const imageRef = ref(storage, `users/${user?.id}/files/${docRef?.id}`);

  const onDrop = async (acceptedFIles: File[]) => {
    acceptedFIles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File error");
      reader.onload = async () => {
        await upLoadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };
  const upLoadPost = async (selectedFile: File) => {
    try {
      if (loading) return;

      setLoading(true);

      // Add doc
      const docData = {
        userId: user?.id,
        fileName: selectedFile.name,
        fullName: user?.fullName,
        profileImg: user?.imageUrl,
        timeStamp: serverTimestamp(),
        type: selectedFile.type,
        size: selectedFile.size,
      };

      const docRefResult = await addDoc(docRef, docData);

      // Image storage
      await uploadBytes(imageRef, selectedFile);

      // Update doc
      const downloadURL = await getDownloadURL(imageRef);
      const fileDocRef = doc(db, `users/${user?.id}/files`, docRefResult.id);
      await updateDoc(fileDocRef, { downloadURL });

      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error during file upload:", error);
      // Handle error (display error message to the user, etc.)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dropzone
      minSize={0}
      maxSize={maxSize}
      onDrop={onDrop}
      // onDrop={(acceptedFiles) => console.log(acceptedFiles)}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFiletooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section>
            <div
              className={
                (cn(
                  "w-52 h-52 bg-blue-500 flex items-center p-20  border border-dashed rounded-lg text-center justify-center"
                ),
                isDragActive
                  ? "bg-blue-800 text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400")
              }
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!isDragActive && (
                <div className="p-20 text-center">
                  {" "}
                  Click here or drop a file to upload!{" "}
                </div>
              )}
              {isDragActive && !isDragReject && (
                <div className="p-20 text-center">
                  Drop to upload this file{" "}
                </div>
              )}
              {isDragReject && "File type not accepted"}
              {isFiletooLarge && (
                <div className="text-danger mt-2">FIle is too large</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
};

export default DropZoneComponents;
