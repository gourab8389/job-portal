import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const JobAppliantsPage = () => {
  return (
    <div className='w-full p-6'>
    <Link href={"/admin/jobs"}>
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <ArrowLeft className="w-4 h-4" />
          Back
        </div>
      </Link>
    <div className='flex flex-col items-center justify-start'>
      <h1 className='text-2xl'>This is applicatants page</h1>
      <p>This is made for future use </p>
    </div>
    </div>
  )
}

export default JobAppliantsPage
