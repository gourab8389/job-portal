import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import JobDetailsPageContent from "./_components/job-details-page-content";


const ApplyJobPage = async ({params} : {params : {jobId : string}}) => {
    const {userId} = auth();

    const job = await db.job.findUnique({
        where : {
            id: params.jobId,
        },
        include : {
            company : true,
        },
    })

    if(!job){
        redirect('/search');
    }


    const profile = await db.userProfile.findUnique({
        where : {
            userId : userId as string
        }
    })

  return (
    <div className="flex-col p-4 md:p-8">
      <JobDetailsPageContent/>
    </div>
  )
}

export default ApplyJobPage;
