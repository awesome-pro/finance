import Header from '@/components/Header'
import Footer from '@/components/footer'
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
            <Footer/>
        </div>
    </>
  )
}

export default DashBoardLayout