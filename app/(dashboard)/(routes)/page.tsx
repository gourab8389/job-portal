import { getJobs } from "@/actions/get-job"
import Box from "@/components/box"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import HomeSearchContainer from "../_components/home-search-container"


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
    </div>
  )
}

export default DashboardHomePage
