import SearchContainer from "@/components/search-container";


interface SearchProps {
    searchParams : {
        title: string,
        categoryId : string,
        createdAtFilter: string,
        shiftTiming : string,
        workMode : string,
        yearsOfExperience : string
    }
}

const SearchPage = async ({searchParams} : SearchProps) => {




  return (
    <div className="px-6 pt-6 block md:hidden md:mb-0">
      <SearchContainer/>
    </div>
  )
};

export default SearchPage;
