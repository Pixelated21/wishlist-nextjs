'use client'
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@/utils/uploadthing";
import { UploadDropzone } from "@uploadthing/react";

interface UploadButtonProps extends React.HTMLAttributes<HTMLDivElement> { }
const UploadButtonContainer = (props: UploadButtonProps) => {
    return (
        <div className="container">
            <UploadButton appearance={{
                button: {
                    backgroundColor: "#fffff",
                }
            }} endpoint="imageUploader" />
        </div>
    )
}

export default UploadButtonContainer;
