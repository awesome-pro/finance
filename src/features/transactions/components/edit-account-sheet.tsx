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

import AccountForm from './transaction-form';
import { insertAccountsSchema } from '../../../db/schema';
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account';
import { useGetAccount } from '@/features/accounts/api/use-get-account';
import { useEditAccount } from '@/features/accounts/api/use-edit-account';
import { useDeleteAccount } from '@/features/accounts/api/use-delete-account';
import { useConfirm } from '@/hooks/use-confirm';

import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

  
const formSchema = insertAccountsSchema.pick({
  name: true
});

type FormValues = Zod.infer<typeof formSchema>


function EditAccountSheet() {

    const { isOpen, onClose, id } = useOpenAccount();
    const [ConfirmDialog, confirm] = useConfirm(
      "Are You Confirmed?",
      "You are about to DELETE this transaction forever"
    )

    const accountQuery = useGetAccount(id)
    const editMutation = useEditAccount(id);
    const deleteMutation = useDeleteAccount(id);

    const isLoading = accountQuery.isLoading
    const isPending = editMutation.isPending || deleteMutation.isPending

    const onSubmit = (values: FormValues) => {
        toast.info('Creating Account');
        console.log("values: " + {values});
        
        editMutation.mutate(values, {
          onSuccess: () => {
            onClose();
            // toast.success('Account edited successfully');
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

    const onDelete = async() => {
      const ok = await confirm()
      if(ok){
        deleteMutation.mutate(undefined, {
          onSuccess: () => {
            toast.success("Account deleted successfully :)")
            onClose();
          }
        })
      }
    }

    const defaultValues = accountQuery.data ? {
      name: accountQuery.data?.name
    } : {
      name: ""
    }

    

  return (
    <>
    <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent className='bg-white '>
              <SheetHeader>
              <SheetTitle>Edit Account</SheetTitle>
              <SheetDescription>
                  Edit an exisitng account
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
                  <AccountForm 
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

export default EditAccountSheet