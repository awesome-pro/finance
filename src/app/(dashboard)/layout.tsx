import Header from '@/components/Header'
import React from 'react'

type DashBoardLayoutProps = {
    children: React.ReactNode
    
}

function DashBoardLayout({children}: DashBoardLayoutProps) {
  return (
    <>
        <div className='px-0 lg:px-0'>
            <Header/>
            {children}
        </div>
    </>
  )
}

export default DashBoardLayout