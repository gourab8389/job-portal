"use client"

import { Company, Job } from "@prisma/client"
import Image from "next/image";

interface CompanyDetailContentPageProps {
    userId : string | null;
    company : Company;
    jobs : Job[];
}

const CompanyDetailContentPage = ({userId, company, jobs} : CompanyDetailContentPageProps) => {
  return (
    <div className="w-full rounded-2xl bg-white p-4 z-50 -mt-8">
     <div className="flex-col w-full px-4">
        <div className="w-full flex items-center justify-between -mt-12">
            <div className="flex items-end justify-end space-x-4">
                {company?.logo && (
                    <div className="aspect-square w-auto bg-white h-32 rounded-2xl border items-center justify-center flex relative overflow-hidden p-3">
                        <Image
                        src={company?.logo}
                        alt={company?.name}
                        width={120}
                        height={120}
                        className="object-contain"
                        />
                    </div>
                )}
                <div className="flex-col space-y-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-sans font-bold text-neutral-700 capitalize">{company?.name}</h2>
                        <p className="text-muted-foreground text-sm">
                            {`(${company?.followers?.length}) following`}
                        </p>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Leveraging Technology to Provide Better Services
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                        <p className="border px-2 py-1 text-sm text-muted-foreground whitespace-nowrap rounded-lg">
                            Management Consulting
                        </p>
                        <p className="border px-2 py-1 text-sm text-muted-foreground whitespace-nowrap rounded-lg">
                            IT Servies & Consulting
                        </p>
                        <p className="border px-2 py-1 text-sm text-muted-foreground whitespace-nowrap rounded-lg">
                            Private
                        </p>
                        <p className="border px-2 py-1 text-sm text-muted-foreground whitespace-nowrap rounded-lg">
                            Corporate
                        </p>
                        <p className="border px-2 py-1 text-sm text-muted-foreground whitespace-nowrap rounded-lg">
                            B2B
                        </p>
                    </div>
                </div>
            </div>
        </div>
     </div>
    </div>
  )
}

export default CompanyDetailContentPage
