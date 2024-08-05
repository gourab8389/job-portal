"use client"

import { Job } from "@prisma/client"
import Image from "next/image"


interface PageContentProps {
    jobs : Job[],
    userId : string | null
}

const PageContent = ({jobs, userId}:PageContentProps) => {
  if(jobs.length === 0){
    return (
        <div className="flex items-center justify-center flex-col">
            <div className="w-full h-[60vh] relative flex items-center justify-center">
                <Image
                 src={"/img/404.jpg"}
                 alt="Not Found"
                 className="w-full h-full object-contain"
                 fill
                />
            </div>
            <h2 className="text-4xl font-semibold text-muted-foreground">No Job Found</h2>
        </div>
    )
  }
  return (
    <div className="pt-6">
        
    </div>
  )
}

export default PageContent
