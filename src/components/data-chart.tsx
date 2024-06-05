"use client"

import { useGetSummary } from '@/features/summary/use-get-summary'
import { Loader2 } from 'lucide-react';
import React from 'react'
import Chart from './chart';


function DataChart() {
   const { isLoading, data} = useGetSummary()

    if(isLoading){
        return (
            <div>
                <Loader2 className=' animate-spin'/>
            </div>
        )
    }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
        <div className=' col-span-1 lg:col-span-3 xl:col-span-4'>
            <Chart
             data={data?.days}
            />
        </div>
    </div>
  )
}

export default DataChart