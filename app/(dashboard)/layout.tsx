import React from 'react'

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-full'>
      {/** navbar */}
        <header className='h-20 fixed inset-y-0 w-full z-50'>
            header
        </header>

      {/** sidebar */}
      <div className="">

      </div>

      <main>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
