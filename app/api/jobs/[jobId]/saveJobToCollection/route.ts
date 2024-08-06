import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (
    req: Request,
    {params} : {params : {jobId : string}}
) => {
    try {
        const {userId} = auth()
        const {jobId} = params

        if(!userId){
            return new NextResponse("Id is missing", { status : 404 })
        }

        if(!jobId){
            return new NextResponse("Unauthorized", { status : 401 })
        }

        const job = await db.job.findUnique({
            where : {
                id: jobId,
                userId
            }
        })

        if(!job){
            return new NextResponse("Job not found", { status: 404 })
        }

        const updateData = {
            savedUsers : job.savedUsers ? {push : userId} : {userId}
        }

        const updatedJob = await db.job.update({
            where : {
                id: jobId,
                userId
            },
            data : updateData
        })



        return NextResponse.json(updatedJob)
    } catch (error) {
        console.log(`[JOB_PUBLISH_PATCH] : ${error}`);
        return new NextResponse("Internal Server Error", { status : 500 })
    }
}