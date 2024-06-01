import React from 'react'
import HeaderLogo from './HeaderLogo'
import Navbar from './Navbar'
import { UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import WelcomeMsg from './WelcomeMsg'

function Header() {
  return (
   <header className='bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36'>
        <div className='max-w-screen-2xl mx-auto'>
            <div className='w-full flex items-center justify-between mb-14'>
                <div className='flex items-center lg:gap-x-16'>
                    <HeaderLogo/>
                    <Navbar/>
                </div>
               <ClerkLoaded>
                    <UserButton afterSignOutUrl='/' />
               </ClerkLoaded>
               <ClerkLoading>
                    <Loader2 className='animate-spin'/>
               </ClerkLoading>
               
            </div>
            <WelcomeMsg/>
        </div>
   </header>
  )
}

export default Header