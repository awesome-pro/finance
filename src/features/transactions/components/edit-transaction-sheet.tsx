"use client";

import { toast } from 'sonner';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import TransactionForm from '@/features/transactions/components/transaction-form';
import { insertTransactionsSchema } from '../../../db/schema';
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction';
import { useGetTransaction } from '@/features/transactions/api/use-get-transaction';
import { useEditTransaction } from '@/features/transactions/api/use-edit-transaction';
import { useDeleteTransaction } from '@/features/transactions/api/use-delete-transaction';
import { useConfirm } from '@/hooks/use-confirm';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';

const formSchema = insertTransactionsSchema.omit({
  id: true
});

type FormValues = z.infer<typeof formSchema>;

function EditTransactionSheet() {
  const { isOpen, onClose, id } = useOpenTransaction();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are You Confirmed?",
    "You are about to DELETE this transaction forever"
  );

  const transactionQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const isLoading = transactionQuery.isLoading;
  const isPending = editMutation.isPending || deleteMutation.isPending;

  const onSubmit = (values: FormValues) => {
    toast.info('Editing Transaction');
    console.log("values: ", values);
    
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        toast.success('Transaction edited successfully');
      },
      onError: (error) => {
        onClose();
        toast.error('Failed to edit transaction');
        console.error(error);
      },
      onSettled: () => {
        console.log('onSettled');
      }
    });
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          toast.success("Transaction deleted successfully :)");
          onClose();
        }
      });
    }
  };

  const defaultValues = transactionQuery.data ? {
    accountId: transactionQuery.data.accountId,
    categoryId: transactionQuery.data.categoryId,
    amount: transactionQuery.data.amount.toString(),
    date: transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
    payee: transactionQuery.data.payee,
    notes: transactionQuery.data.notes
  } : {
    accountId: "",
    categoryId: "",
    amount: "",
    date: new Date(),
    payee: "",
    notes: ""
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className='bg-white'>
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>
              Edit an existing transaction
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
              <TransactionForm 
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
  );
}

export default EditTransactionSheet;
