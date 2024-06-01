import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function HeaderLogo() {
  return (
    <Link href={'/'}>
        <div className='items-center hidden  lg:flex'>
            <Image
            src={'/complete-logo.svg'}
            alt='logo'
            width={100}
            height={100}
            />
            
        </div>
    </Link>
  )
}

export default HeaderLogo