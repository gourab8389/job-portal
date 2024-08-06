"use client"

import { Company, Job } from "@prisma/client"
import { Card, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import Box from "@/components/box"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookmarkCheck, BriefcaseBusiness, Currency, Layers, Loader2, Network } from "lucide-react"
import { cn, formattedString } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"


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
    const SavedUsersIcon = BookmarkCheck
    return (
        <motion.div layout>
            <Card>
                <div className="w-full h-full flex flex-col items-start justify-start gap-y-4 p-4">
                    <Box className="">
                        <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</p>
                        <Button variant={'ghost'} size={'icon'}>
                            {isBookmarkLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SavedUsersIcon className={cn("w-4 h-4")} />}
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
                            <Link href={`/company/${company?.id}`} className="text-xs text-purple-500 w-full truncate">
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
                            {job.short_description}
                        </CardDescription>
                    )}
                </div>
            </Card>

        </motion.div>
    )
}

export default JobCardItem
