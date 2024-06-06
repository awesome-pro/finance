import Image from 'next/image'
import React from 'react'

function Settings() {
  return (
    <div className='flex flex-col items-center justify-center  bg-blue-200 rounded-xl p-6 m-8'>
        
        <h1 className='my-10 text-4xl text-blue-600'>
            Development in progress, Diverse to other pages
        </h1>
        <Image
         src={'/settings.png'}
         width={400}
         height={400}
         alt="Under construction"
        />
    </div>
  )
}

export default Settings