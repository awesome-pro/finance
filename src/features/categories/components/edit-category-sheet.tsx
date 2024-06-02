"use client";

import { toast } from 'sonner';
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"


import { insertCategorySchema } from '../../../db/schema';
import { useOpenCategory } from '@/features/categories/hooks/use-open-category';
import { useGetCategory } from '@/features/categories/api/use-get-category';
import { useEditCategory } from '@/features/categories/api/use-edit-category';
import { useDeleteCategory } from '@/features/categories/api/use-delete-category';
import { useConfirm } from '@/hooks/use-confirm';

import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import CategoryForm from './category-form';

  
const formSchema = insertCategorySchema.pick({
  name: true
});

type FormValues = Zod.infer<typeof formSchema>


function EditCategorysheet() {

    const { isOpen, onClose, id } = useOpenCategory();
    const [ConfirmDialog, confirm] = useConfirm(
      "Are You Confirmed?",
      "You are about to DELETE this category forever"
    )

    const categoryQuery = useGetCategory(id)
    const editMutation = useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);

    const isLoading = categoryQuery.isLoading
    const isPending = editMutation.isPending || deleteMutation.isPending

    const onSubmit = (values: FormValues) => {
        toast.info('Creating category');
        console.log("values: " + {values});
        
        editMutation.mutate(values, {
          onSuccess: () => {
            onClose();
            // toast.success('category edited successfully');
          },
          onError: (error) => {
            onClose();
            toast.error('Failed to create category');
            console.error(error);
          },
          onSettled: () => {
            console.log('onSettled')
          }
        });
    }

    const onDelete = async() => {
      const ok = await confirm()
      if(ok){
        deleteMutation.mutate(undefined, {
          onSuccess: () => {
            toast.success("category deleted successfully :)")
            onClose();
          }
        })
      }
    }

    const defaultValues = categoryQuery.data ? {
      name: categoryQuery.data?.name
    } : {
      name: ""
    }

    

  return (
    <>
    <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent className='bg-white '>
              <SheetHeader>
              <SheetTitle>Edit category</SheetTitle>
              <SheetDescription>
                  Edit an exisitng category
              </SheetDescription>
              </SheetHeader>
              {
                isLoading ? (
                  <div className='absolute inset-0 items-center flex flex-col mt-32 justify-top gap-4 p-5'>
                    <Skeleton className='w-full h-[45px] p-1 rounded-xl'/>
                    <Skeleton className='w-full h-[45px] p-1 rounded-xl'/>
                    <Skeleton className='w-full h-[45px] p-1 rounded-xl'/>
                    <Loader2 className='size-4 text-muted-foreground animate-spin'/>
                  </div>
                ) : (
                  <CategoryForm 
                  id={id}
                  onSubmit={onSubmit}
                  disabled={isPending}
                  defaultValues={defaultValues}
                  onDelete={onDelete}
                  />
                )
              }
          </SheetContent>
      </Sheet>
    </>
  )
}

export default EditCategorysheet