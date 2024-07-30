import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <Image
    src={'/img/logo.svg'}
    alt='logo'
    width={60}
    height={60}
    className='cursor-pointer'
    />
  )
}

export default Logo
