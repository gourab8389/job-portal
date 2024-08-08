"use client"

import Box from "@/components/box"
import CustomBreadCrumb from "@/components/custom-bread-crumd"
import { Preview } from "@/components/preview"
import { Button } from "@/components/ui/button"
import { Company, Job, UserProfile } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface JobDetailsPageContentProps {
    job: Job & {company : Company | null}
    jobId : string
    userProfile : UserProfile | null
}

const JobDetailsPageContent = ({
    job, jobId, userProfile
} : JobDetailsPageContentProps
) => {
  return (
   <>
   <Box className="mt-4">
    <CustomBreadCrumb
    breadCrumbItem={[{label:"Search", link: "/search" }]}
    breadCrumbPage={job?.title !== undefined ? job.title : ""}
    />
   </Box>

   <Box className="mt-4">
    <div className="w-full flex items-center h-72 relative rounded-md overflow-hidden">
        {job?.imageUrl ? <Image
        alt={job.title}
        src={job?.imageUrl}
        fill
        className="object-cover w-full h-full"
        /> : <div className="w-full h-full bg-blue-100 flex items-center justify-center">
            <h2 className="text-3xl font-semibold tracking-wider">{job?.title}</h2>
        </div> 
        }
    </div>
   </Box>
   <Box className="mt-4">
        <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-neutral-600">{job?.title}</h2>

        <Link href={`/companies/${job.companyId}`}>
        <div className="flex items-center gap-2 rounded-full mt-1">
            {job?.company?.logo && (
                <Image
                alt={job?.company?.name}
                src={job?.company?.logo}
                width={30}
                height={30}
                />
            )}
            <p className="text-muted-foreground text-sm font-semibold">
                {job?.company?.name}
            </p>
        </div>
        </Link>
        </div>

        <div className="">
            {userProfile ? (<>
            {!userProfile.appliedJobs.some(appliedJob => appliedJob.jobId === jobId) ? 
            <Link href={job?.jobLink ?? ""}>
            <Button className="text-sm bg-blue-700  hover:bg-blue-900 hover:shadow-sm text-white">
                Apply
            </Button>
            </Link> : <Button className="text-sm text-blue-700  hover:bg-blue-900 hover:shadow-sm border-blue-500 hover:text-white" variant={"outline"}>
                Already Applied
                </Button>}
            </>) : (<Link href={"/user"}>
            <Button className="text-sm px-8 bg-blue-700 hover:bg-blue-900 hover:shadow-sm">
                Update Profile
            </Button>
            </Link>)}
        </div>
   </Box>
   <Box className="flex-col my-4 items-start justify-start px-4 gap-2">
        <h2 className="text-lg font-semibold">Description : </h2>
        <p className="font-sans">{job?.short_description}</p>
   </Box>

   {
    job?.description && (
        <Box>
            <Preview value={job?.description}/>
        </Box>
    )
   }
   </>
  )
}

export default JobDetailsPageContent
