"use client";

import React from 'react'
import {  columns } from '@/app/(dashboard)/transactions/columns';
import { DataTable } from '@/components/data-table';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Plus } from 'lucide-react'

import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions';
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions';


function TransactionPage() {

    const newtransaction = useNewTransaction()
    const transactionsQuery = useGetTransactions();
    const deletetransactions = useBulkDeleteTransactions();

    const transactions = transactionsQuery.data || []

    const isDisabled = transactionsQuery.isLoading || deletetransactions.isPending;


    if(transactionsQuery.isLoading){
      return (
        <div className='max-w-screen-2xl lg:mx-32 mx-3 pb-10 -mt-24'>
          <Card className='border-none drop-shadow-sm'>
            <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                <Skeleton className='h-8 w-48'/>
                <Skeleton className='w-48 h-10'/>
            </CardHeader>
            <CardContent className='lg:px-auto lg:mx-auto -m-4'>
              <div className='h-[500px] w-full flex items-center justify-center'>
                <Loader2 className='animate-spin size-6 text-slate-300'/>
              </div>
            </CardContent>
        </Card>
        </div>
      )
    }

  return (
    <div className='max-w-screen-2xl lg:mx-32 mx-3 pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                <CardTitle className='text-xl line-clamp-1'>
                    Transactions History
                </CardTitle>
                <Button 
               className=' w-full lg:w-48' 
               size={'sm'}
               onClick={newtransaction.onOpen}
               >
                <Plus size={16} className='mr-2' />
                    Add New
               </Button>
            </CardHeader>
            <CardContent className='lg:px-auto lg:mx-auto -m-4'>
              <div className="container mx-0 py-10">
                <DataTable 
                columns={columns} 
                data={transactions} 
                filterKey='name'
                onDelete={(row) => {
                  const ids = row.map((r) => r.original.id);
                  deletetransactions.mutate({ids});
                }}
                disabled={isDisabled}
                />
              </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default TransactionPage