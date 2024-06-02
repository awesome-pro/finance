"use client";

import React from 'react'
import { Payment, columns } from '@/app/(dashboard)/accounts/columns';
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
import { Plus } from 'lucide-react'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
  

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    
    // ...
  ]
}

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52g",
    amount: 50,
    status: "success",
    email: "a@example.com",
  },
  // ...
]

function AccountPage() {

    const newAccount = useNewAccount();
    // const data =  getData();

  return (
    <div className='max-w-screen-2xl lg:mx-32 mx-3 pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                <CardTitle className='text-xl line-clamp-1'>
                    Accounts Page
                </CardTitle>
                <Button 
               className=' w-full lg:w-48' 
               size={'sm'}
               onClick={newAccount.onOpen}
               >
                <Plus size={16} className='mr-2' />
                    Add New
               </Button>
            </CardHeader>
            <CardContent className='lg:px-auto lg:mx-auto -m-4'>
              <div className="container mx-0 py-10">
                <DataTable 
                columns={columns} 
                data={data} 
                filterKey='email'
                />
              </div>
            </CardContent>
        </Card>

        
    </div>
  )
}

export default AccountPage