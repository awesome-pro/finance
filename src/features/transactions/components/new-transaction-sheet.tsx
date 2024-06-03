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
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'
import TransactionForm from './transaction-form';
import { insertTransactionsSchema } from '@/db/schema';
import { useCreateTransaction } from '@/features/transactions/api/use-create-transaction';
import { useGetCategories } from '@/features/categories/api/use-get-categories';
import { useCreateCategory } from '@/features/categories/api/use-create-category';
import { useGetAccount } from '@/features/accounts/api/use-get-account';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { useCreateAccount } from '@/features/accounts/api/use-create-account';
import { Loader2 } from 'lucide-react';

  
const formSchema = insertTransactionsSchema.omit({
    id:true
})

type FormValues = Zod.infer<typeof formSchema>


function NewTransactionSheet() {

    const {isOpen, onClose} = useNewTransaction();
    const createMutation = useCreateTransaction();

    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory();
    const onCreateCategory = (name: string) => categoryMutation.mutate({
      name: name
    })
    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
      label: category.name,
      value: category.id
    }))

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name: string) => accountMutation.mutate({
      name: name
    })
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
      label: account.name,
      value: account.id
    }))

    const isPending = categoryMutation.isPending 
      || categoryMutation.isPending
      || accountMutation.isPending

    const isLoading = 
      categoryQuery.isLoading || accountQuery.isLoading

    const onSubmit = (values: FormValues) => {
        toast.info('Creating Transaction');
        console.log("values: " + {values});
        
        createMutation.mutate(values, {
          onSuccess: () => {
            onClose();
            toast.success('Transaction created successfully');
          },
          onError: (error) => {
            onClose();
            toast.error('Failed to create Transaction');
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
            <SheetTitle>New Transaction</SheetTitle>
            <SheetDescription>
                Add a new Transaction
            </SheetDescription>
            </SheetHeader>
            {isLoading ? (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <Loader2 size={12} className='animate-spin'/>
                </div>
            ) : (
              <TransactionForm
              onSubmit={onSubmit}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
              />
            )}
            
        </SheetContent>
    </Sheet>

  )
}

export default NewTransactionSheet