"use client"

import { useGetSummary } from '@/features/summary/use-get-summary'
import { Loader2 } from 'lucide-react';
import React from 'react'
import Chart, { ChartLoading } from './chart';
import SpendingPie, { SpendingPieLoading } from './spending-pie';


function DataChart() {
   const { isLoading, data, isPending, isError} = useGetSummary()

    if(isLoading || isPending){
        return (
            <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
                <div className=' col-span-1 lg:col-span-3 xl:col-span-4'>
                    <SpendingPieLoading/>
                </div>
                <div>
                   <ChartLoading/>
                </div>
            </div>
        )
    }
    if(isError){
        return (
            <div>
                Oops! Something unexpected happened
            </div>
        )
    }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className=' col-span-1 lg:col-span-3 xl:col-span-4'>
            <Chart
             data={data?.days}
            />
        </div>
        <div className=' col-span-1 lg:col-span-3 xl:col-span-4'>
            <SpendingPie
             data={data?.categories}
            />
        </div>
    </div>
  )
}

export default DataChart