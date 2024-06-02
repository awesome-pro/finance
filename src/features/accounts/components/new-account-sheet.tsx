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
import { useNewAccount } from '../hooks/use-new-account'
import AccountForm from './account-form';
import { insertAccountsSchema } from '../../../db/schema';
import { useCreateAccount } from '../api/use-create-account';

  
const formSchema = insertAccountsSchema.pick({
  name: true
});

type FormValues = Zod.infer<typeof formSchema>


function NewAccountSheet() {

    const {isOpen, onClose} = useNewAccount();
    const mutation = useCreateAccount();

    const onSubmit = (values: FormValues) => {
        toast.info('Creating Account');
        console.log("values: " + {values});
        
        mutation.mutate(values, {
          onSuccess: () => {
            onClose();
            toast.success('Account created successfully');
          },
          onError: (error) => {
            onClose();
            toast.error('Failed to create account');
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
            <SheetTitle>New Account</SheetTitle>
            <SheetDescription>
                Create a new Account to track your transactions.
            </SheetDescription>
            </SheetHeader>
            <AccountForm 
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

export default NewAccountSheet