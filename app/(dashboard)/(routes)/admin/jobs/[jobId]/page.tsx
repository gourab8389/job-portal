import React from 'react'

const JobDetailsPage = async ({params}: {params: {jobId: string}}) => {
  return (
    <div>
      job id : {params.jobId}
    </div>
  )
}

export default JobDetailsPage;
