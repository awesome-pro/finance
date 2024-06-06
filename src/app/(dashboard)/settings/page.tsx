import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import React from 'react'

function Settings() {
  return (
    <div className='flex flex-col items-center justify-center  bg-blue-200 rounded-xl p-6 m-8'>
        
        <h1 className='my-10 text-4xl text-blue-600'>
            Development in progress, Diverse to other pages
        </h1>
        <Image
         src={'/settings.png'}
         width={500}
         height={500}
         alt="Under construction"
         className=" animate-pulse"
        />
        

    </div>
  )
}

export default Settings