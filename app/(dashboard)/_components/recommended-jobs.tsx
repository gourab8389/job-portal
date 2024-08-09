"use client"

import Box from "@/components/box"
import { Job } from "@prisma/client"
import PageContent from "../(routes)/search/_components/page-content"
import Link from "next/link"
import { Button } from "@/components/ui/button"


interface RecommendedJobListProps {
    jobs: Job[],
    userId : string | null
}

const RecommendedJobList = ({jobs, userId}: RecommendedJobListProps) => {
  return (
    <Box className="flex-col justify-center gap-y-4 my-6 mt-12">
        <h2 className="text-2xl font-semibold tracking-wider font-sans">Recommended Jobs</h2>

        <div className="mt-4">
            <PageContent jobs={jobs} userId={userId}/>
        </div>

        <Link href={"/search"} className="my-8">
        <Button className="w-44 h-12 rounded-xl border-blue-500 hover:bg-transparent hover:shadow-md text-blue-500 hover:text-blue-600 bg-transparent border">View more Jobs</Button>
        </Link>
    </Box>
  )
}

export default RecommendedJobList
