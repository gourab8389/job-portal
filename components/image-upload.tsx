"use client"

import { storage } from "@/config/firebase.config";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string
}

const ImageUpload = ({
    disabled,
    onChange,
    onRemove,
    value,
}: ImageUploadProps) => {

    const [isMounted, setIsMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }

    const onUpload = async (e : React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return
        const file : File = e.target.files[0];
        setIsLoading(true)

        const uploadTask = uploadBytesResumable(ref(storage, `JobCoverImage/${Date.now()}-${file?.name}`),
        file,
        {contentType : file?.type}
    )
    
    uploadTask.on("state_changed", (snapshot)=>{
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    },
    (error)=>{
        toast.error(error.message)
    }, 
    ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
            onChange(downloadUrl)
            setIsLoading(false)
            toast.success("Image Uploaded")
        })
    }
    )
    };

    const onDelete = () => {
        onRemove(value)
        deleteObject(ref(storage, value)).then(() => {
            toast.success("Image Removed")
        })
    }

    return (
        <div>
            {value ? (
                <>
                    <div className="w-full h-60 aspect-video relative rounded-md flex items-center overflow-hidden">
                        <Image
                            fill
                            className="w-full h-full object-cover"
                            src={value}
                            alt="Image Cover"
                        />
                        <div className="absolute z-10 top-2 right-2 cursor-pointer" onClick={onDelete}>
                            <Button size={"icon"} variant="destructive">
                                <Trash className="w-4 h-4"/>
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full h-60 aspect-video relative rounded-md flex justify-center items-center overflow-hidden border border-dashed bg-neutral-50">
                        {isLoading ? (
                            <>
                                <p>{`${progress.toFixed(2)}%`}</p>
                            </>
                        ) : (
                            <><label >
                                <div className="w-full h-full flex flex-col gap-2 items-center justify-center cursor-pointer text-neutral-500">
                                    <ImagePlus className="w-10 h-10" />
                                    <p>Upload an Image</p>
                                    <input type="file" accept="image/*" className="w-0 h-0" onChange={onUpload} />
                                </div>
                            </label></>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default ImageUpload