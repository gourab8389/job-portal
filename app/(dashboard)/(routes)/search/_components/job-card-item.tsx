"use client"

import { Company, Job } from "@prisma/client"
import { Card, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import Box from "@/components/box"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark, BookmarkCheck, BriefcaseBusiness, Currency, Layers, Loader2, Network } from "lucide-react"
import { cn, formattedString } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import {truncate} from "lodash";
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"


interface JobCardItemProps {
    job: Job,
    userId: string | null
}

const JobCardItem = ({ job, userId }: JobCardItemProps) => {
    
    const typeJob = job as Job & {
        company : Company | null
    }

    const company = typeJob.company

    const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);

    const isSavedByUser = userId && job.savedUsers?.includes(userId)

    const SavedUsersIcon =isSavedByUser ? BookmarkCheck : Bookmark;

    const router = useRouter()

    const onClickSaveJob = async () => {
        try {
            setIsBookmarkLoading(true)
            if(isSavedByUser){
                await axios.patch(`/api/jobs/${job.id}/removeJobFromCollection`);
                toast.success("Job Removed!")
            }else{
                await axios.patch(`/api/jobs/${job.id}/saveJobToCollection`);
                toast.success("Job Saved!")
            }
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
            console.log(`Error: ${(error as Error)?.message}`)
        }finally{
            setIsBookmarkLoading(false)
        }
    }

    return (
        <motion.div layout>
            <Card>
                <div className="w-full h-full flex flex-col items-start justify-start gap-y-4 p-4">
                    <Box className="">
                        <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</p>
                        <Button 
                        variant={'ghost'} 
                        size={'icon'}
                        >
                            {isBookmarkLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <div onClick={onClickSaveJob}>
                                <SavedUsersIcon className={cn("w-4 h-4", isSavedByUser ? "text-emerald-500":"text-muted-foreground")} />
                                </div>}
                        </Button>
                    </Box>

                    <Box className="items-center justify-start gap-x-4">
                        <div className="w-12 h-12 min-w-12 min-h-12 border p-2 rounded-md relative flex items-center justify-center overflow-hidden">
                        {company?.logo && (
                            <Image
                            src={company?.logo}
                            alt={company?.name}
                            height={40}
                            width={40}
                            className="object-contain"
                            />
                        )}
                        </div>
                        <div className="w-full">
                            <p className="text-stone-700 font-semibold text-base w-full">{job.title}</p>
                            <Link href={`/company/${company?.id}`} className="text-xs text-blue-500 w-full truncate">
                            {company?.name}
                            </Link>
                        </div>
                    </Box>

                    <Box className="">
                        {job.shiftTiming && (
                            <div className="text-xs text-muted-foreground flex items-center">
                                <BriefcaseBusiness className="w-3 h-3 mr-1"/>
                                {formattedString(job.shiftTiming)}
                            </div>
                        )}
                        {job.workMode && (
                            <div className="text-xs text-muted-foreground flex items-center">
                                <Layers className="w-3 h-3 mr-1"/>
                                {formattedString(job.workMode)}
                            </div>
                        )}
                        {job.hourlyRate && (
                            <div className="text-xs text-muted-foreground flex items-center">
                                <Currency className="w-3 h-3 mr-1"/>
                                {`${formattedString(job.hourlyRate)}$/hours`}
                            </div>
                        )}
                        {job.yearsOfExperience && (
                            <div className="text-xs text-muted-foreground flex items-center">
                                <Network className="w-3 h-3 mr-1"/>
                                {formattedString(job.yearsOfExperience)}
                            </div>
                        )}
                    </Box>

                    {job.short_description && (
                        <CardDescription className="text-xs">
                            {truncate(job.short_description, {
                                length: 130,
                                omission: "..."
                            })}
                        </CardDescription>
                    )}

                    {job.tags.length > 0 && (
                        <Box className="flex-wrap justify-start gap-1">
                            {job.tags.slice(0,6).map((tag, i)=> (
                                <p className="bg-gray-100 text-xs rounded-md px-2 py-[2px] font-semibold text-neutral-500" key={i}>{tag}</p>
                            ))}
                        </Box>
                    )}

                    <Box className="gap-2 mt-auto">
                        <Link href={`/search/${job.id}`} className="w-full">
                        <Button className="w-full border border-blue-500 text-blue-500 hover:bg-transparent hover:text-blue-600 " variant={"outline"}>Details</Button>
                        </Link>

                        <Button 
                        className="w-full hover:bg-blue-800 bg-blue-800/80 text-white hover:text-white" 
                        variant={"outline"}
                        onClick={onClickSaveJob}
                        >
                            {isSavedByUser ? "Saved": "Save For Later"}
                        </Button>
                    </Box>
                </div>
            </Card>

        </motion.div>
    )
}

export default JobCardItem
