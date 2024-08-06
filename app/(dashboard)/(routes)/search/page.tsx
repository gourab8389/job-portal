import { getJobs } from "@/actions/get-job";
import SearchContainer from "@/components/search-container";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import CategoriesList from "./_components/categories-list";
import PageContent from "./_components/page-content";


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

const SearchPage = async ({ searchParams }: SearchProps) => {


    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

    const { userId } = auth();

    const jobs = await getJobs({ ...searchParams });
    console.log(`Jobs Count : ${jobs.length}`)


    return (
        <>
            <div className="px-6 pt-6 block md:hidden md:mb-0">
                <SearchContainer />
            </div>

            <div className="p-6">
                <CategoriesList categories={categories}/>

                <PageContent
                jobs={jobs}
                userId={userId}
                />
            </div>
        </>
    )
};

export default SearchPage;