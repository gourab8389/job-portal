import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const JobsPageOverview = async () => {
  return (
    <div className='p-6'>
      <div className="flex items-end justify-end">
        <Link href={'/admin/create'}>
          <Button><Plus className='w-5 h-5 mr-2'/>New Job</Button>
        </Link>
      </div>

      {/* datatable */}
      
    </div>
  )
}

export default JobsPageOverview
