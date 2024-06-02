"use client";

import React from 'react'
import {  columns } from '@/app/(dashboard)/categories/columns';
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

import { useNewCategory } from '@/features/categories/hooks/use-new-category'
import { useGetCategories } from '@/features/categories/api/use-get-categories';
import { useBulkDeleteCategories } from '@/features/categories/api/use-bulk-delete-categories';


  

function CategoryPage() {

    const newcategory = useNewCategory();
    const categoriesQuery = useGetCategories();
    const deleteCategories = useBulkDeleteCategories();

    const categories = categoriesQuery.data || []

    const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;


    if(categoriesQuery.isLoading){
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
                    Category Page
                </CardTitle>
                <Button 
               className=' w-full lg:w-48' 
               size={'sm'}
               onClick={newcategory.onOpen}
               >
                <Plus size={16} className='mr-2' />
                    Add New
               </Button>
            </CardHeader>
            <CardContent className='lg:px-auto lg:mx-auto -m-4'>
              <div className="container mx-0 py-10">
                <DataTable 
                columns={columns} 
                data={categories} 
                filterKey='name'
                onDelete={(row) => {
                  const ids = row.map((r) => r.original.id);
                  deleteCategories.mutate({ids});
                }}
                disabled={isDisabled}
                />
              </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default CategoryPage