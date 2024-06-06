"use client"
import { useGetSummary } from '@/features/summary/use-get-summary';
import { formatDateRange } from '@/lib/utils';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { FaPiggyBank } from "react-icons/fa"
import { FaArrowTrendDown, FaArrowTrendUp} from "react-icons/fa6"
import DataCard, { DataCardLoading } from './data-card';
import { useToast } from './ui/use-toast';

function DataGrid() {

    const params = useSearchParams();
    const to = params.get("to") || undefined;
    const from = params.get("from") || undefined;

    const { data, isLoading } = useGetSummary();

    const dateRangeLabel = formatDateRange({ to, from })

    const { toast} = useToast();

    if(isLoading){
        return (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 p-2 mb-8'>
                <DataCardLoading/>
                <DataCardLoading/>
                <DataCardLoading/>
            </div>
        )
    }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 p-2 mb-8 lg:px-10'>
        <DataCard
         title = "Remaining"
         value={data?.remainingAmount}
         percentageChange= {data?.remainingChange}
         icon={FaPiggyBank}
         variant='default'
         dateRange={dateRangeLabel}
        />
        <DataCard
         title = "Income"
         value={data?.incomeAmount}
         percentageChange= {data?.incomeChange}
         icon={FaArrowTrendUp}
         variant='success'
         dateRange={dateRangeLabel}
        />
        <DataCard
         title = "Expense"
         value={data?.expenseAmount}
         percentageChange= {data?.expensesChange}
         icon={FaArrowTrendDown}
         variant='danger'
         dateRange={dateRangeLabel}
        />
        
    </div>
  )
}

export default DataGrid