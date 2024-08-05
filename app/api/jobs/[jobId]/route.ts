import { storage } from "@/config/firebase.config";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { deleteObject, ref } from "firebase/storage";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, { params }: { params: { jobId: string } }) => {
  try {
    const { userId } = auth();
    const { jobId } = params;

    const { title, categoryId, category, imageUrl, jobLink, short_description, description, tags, savedUsers, shiftTiming, hourlyRate, yearsOfExperience, workMode, isPublished, companyId, company} = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!jobId) {
      return new NextResponse("Id is missing", { status: 401 });
    }

    const job = await db.job.update({
      where: {
        id: jobId,
        userId,
      },
      data: { title, categoryId, category, imageUrl, jobLink, short_description, description, isPublished, tags, savedUsers, shiftTiming, hourlyRate, yearsOfExperience, workMode, companyId, company},
    });

    return NextResponse.json(job);

  } catch (error) {
    console.log(`[JOB_PATCH] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};



export const DELETE = async (req: Request, { params }: { params: { jobId: string } }) => {
  try {
    const { userId } = auth();
    const { jobId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!jobId) {
      return new NextResponse("Id is missing", { status: 401 });
    }

    const job = await db.job.findUnique({
      where : {
        id: jobId,
        userId
      },
    })

    if (!jobId) {
      return new NextResponse("Job not found", { status: 404 });
    }

    if(job?.imageUrl){

      const storageRef = ref(storage, job.imageUrl)
      await deleteObject(storageRef)
    }

    const deleteJob = await db.job.delete({
      where : {
        id: jobId,
        userId
      },
    })

    return NextResponse.json(deleteJob)

  } catch (error) {
    console.log(`[JOB_DELETE] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

