import { getJobs } from "@/actions/get-job";
import Box from "@/components/box";
import CustomBreadCrumb from "@/components/custom-bread-crumd";
import SearchContainer from "@/components/search-container";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import PageContent from "../search/_components/page-content";



interface SearchProps {
    searchParams: {
        title: string,
        categoryId: string,
        createdAtFilter: string,
        shiftTiming: string,
        workMode: string,
        yearsOfExperience: string
    }
}


const savedJobsPage = async ({searchParams} : SearchProps) => {

    const {userId} = auth();

    if(!userId){
        redirect("/")
    }

    const jobs = await getJobs({...searchParams, savedJobs : true})

  return (
    <div className="flex-col">
      <Box className="mt-4 items-center justify-start gap-2 mb-2 px-2">
        <CustomBreadCrumb breadCrumbPage="Saved Jobs"/>
      </Box>

      <Box className="w-full h-44 bg-blue-600/20 justify-center font-bold">
        Saved Jobs
      </Box>

      <div className="px-6 pt-6 md:mb-0">
        <SearchContainer/>
      </div>

      <div className="p-4">
        <PageContent jobs={jobs} userId={userId}/>
      </div>
    </div>
  )
}

export default savedJobsPage
