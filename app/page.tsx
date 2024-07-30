import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function Home() {
  return (
    <div>
      <Button>Hello</Button>
      <UserButton/>
    </div>
  )
}
