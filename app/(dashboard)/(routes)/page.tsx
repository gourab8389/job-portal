import { getJobs } from "@/actions/get-job"
import Box from "@/components/box"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import HomeSearchContainer from "../_components/home-search-container"
import Image from "next/image"
import HomeScreenCategories from "../_components/home-screen-categories-container"
import HomeCompanyList from "../_components/home-companies-list"
import RecommendedJobList from "../_components/recommended-jobs"


const DashboardHomePage = async () => {

  const { userId } = auth()
  const jobs = await getJobs({})

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  })

  const companies = await db.company.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="flex-col py-6 px-4 space-y-24">
      <Box className="flex-col justify-center w-full space-y-4 mt-12">
        <h2 className="text-2xl md:text-4xl font-sans font-bold tracking-wide text-neutral-600">
          Find your favourite jobs here
        </h2>

        <p className="text-2xl text-primary-foreground">
          {jobs.length} + jobs for you to explore{" "}
        </p>
      </Box>
      <HomeSearchContainer/>

      <Box className="relative overflow-hidden h-[22rem] justify-center rounded-lg mt-12">
        <Image
        src="/img/job-portal-banner.jpg"
        alt="Home Banner"
        fill
        className="object-cover w-full h-full"
        />
      </Box>

      <HomeScreenCategories categories={categories}/>

      <HomeCompanyList  companies={companies}/>

      <RecommendedJobList jobs={jobs.splice(0,6)} userId={userId}/>
    </div>
  )
}

export default DashboardHomePage
