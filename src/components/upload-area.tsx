'use client'
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";

const UploadArea = () => {
    return (
        <div className="container">
            <UploadDropzone<OurFileRouter>
                endpoint="imageUploader"
                className="py-10"
                appearance={{}}
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
                onUploadBegin={(name) => {
                    // Do something once upload begins
                    console.log("Uploading: ", name);
                }}
            />
        </div>
    )
}

export default UploadArea;
