import DataChart from '@/components/data-chart'
import DataGrid from '@/components/data-grid'
import React from 'react'

function DashboardPage() {
  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24 '>
      <DataGrid/>
      <DataChart/>
    </div>
  )
}

export default DashboardPage