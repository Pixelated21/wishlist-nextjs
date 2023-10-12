'use client'
import { UploadButton } from "@/utils/uploadthing";

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
