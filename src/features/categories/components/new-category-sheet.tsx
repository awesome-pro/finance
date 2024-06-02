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
import { useNewCategory } from '../hooks/use-new-category'
import CategoryForm from './category-form';
import { insertCategorySchema } from '../../../../db/schema';
import { useCreateCategory } from '../api/use-create-category';

  
const formSchema = insertCategorySchema.pick({
  name: true
});

type FormValues = Zod.infer<typeof formSchema>


function NewCategorySheet() {

    const {isOpen, onClose} = useNewCategory();
    const mutation = useCreateCategory();

    const onSubmit = (values: FormValues) => {
        toast.info('Creating Category');
        console.log("values: " + {values});
        
        mutation.mutate(values, {
          onSuccess: () => {
            onClose();
            toast.success('Category created successfully');
          },
          onError: (error) => {
            onClose();
            toast.error('Failed to create Category');
            console.error(error);
          },
          onSettled: () => {
            console.log('onSettled')
          }
        });
        
    }

    

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
        
        <SheetContent className='bg-white '>
            <SheetHeader>
            <SheetTitle>New Category</SheetTitle>
            <SheetDescription>
                Create a new Category to organise your transactions
            </SheetDescription>
            </SheetHeader>
            <CategoryForm 
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={{
              name: ''
            }}
            />
        </SheetContent>
    </Sheet>

  )
}

export default NewCategorySheet