"use client"

import Box from "@/components/box"
import { Card } from "@/components/ui/card"
import { iconMapping, IconName } from "@/lib/utils"
import { Category } from "@prisma/client"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import qs from "query-string"


interface HomeScreenCategoriesProps {
    categories : Category[]
}


export const Icon = ({name} : {name : IconName}) => {
    const IconComponent = iconMapping[name]

    return IconComponent ? <IconComponent className="w-5 h-5"/> : null;
}

export const CategoryListItemCard = ({data} : {data : Category}) => {

    const router = useRouter()
    const handleClick = (categoryId : string) =>{
       const href = qs.stringifyUrl({
        url: "/search",
        query : {
            categoryId : categoryId || undefined
        },
       })
       router.push(href)
    }


    return (
        <Card className="flex items-center gap-2 p-2 text-muted-foreground hover:text-blue-500 hover:shadow-md hover:border-blue-500 cursor-pointer" onClick={() => handleClick(data.id)}>
            <Icon name={data.name as IconName}/>
            <span className="w-28 truncate whitespace-nowrap">{data.name}</span>
            <ChevronRight className="w-4 h-4"/>
        </Card>
    )
}

const HomeScreenCategories = ({categories}: HomeScreenCategoriesProps) => {
  return (
    <Box className="flex-col mt-12">
        <div className="w-full flex flex-wrap items-center justify-center gap-4">
            {categories.map(item => (
                <CategoryListItemCard key={item.id} data={item}/>
            ))}
        </div>
    </Box>
  )
}

export default HomeScreenCategories
