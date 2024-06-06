"use client"

import React, { useState } from 'react';
import { columns } from '@/app/(dashboard)/transactions/columns';
import { DataTable } from '@/components/data-table';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';

import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction';
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions';
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions';
import UploadButton from './upload-button';
import ImportCard from './import-card';
import { transactions as transactionSchema } from '@/db/schema';
import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';
import { toast as sonner } from 'sonner';
import { useBulkCreateTransactions } from '@/features/transactions/api/use-bulk-create-transactions';
import { useToast } from '@/components/ui/use-toast';

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT"
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {}
};

function TransactionPage() {
  const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS)

  const { toast } = useToast();

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    console.log({ results })
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  }

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST)
  }

  const newtransaction = useNewTransaction()
  const transactionsQuery = useGetTransactions();
  const deletetransactions = useBulkDeleteTransactions();
  const bulkCreateTransactions = useBulkCreateTransactions();

  const transactions = transactionsQuery.data || []


  const isDisabled = transactionsQuery.isLoading || transactionsQuery.isPending || deletetransactions.isPending || bulkCreateTransactions.isPending
    const onSubmitImport = async (values: typeof transactionSchema.$inferInsert[]) => {
      const accountId = await confirm();

      if (!accountId) {
        return sonner.error("Please select an account to continue.");
      }

      const data = values.map((value) => ({
        ...value,
        accountId: accountId as string
      }));

      bulkCreateTransactions.mutate(data, {
        onSuccess: () => {
          toast({
            title: "Transactions created successfully",
            variant: "success"
          });
          onCancelImport();
        },
        onError: (error) => {
          console.log(error);
          toast({
            title: "Failed to create transactions",
            description: "error: " + error.message,
            variant: "destructive"
          });
        }
      });
    };

    if (transactionsQuery.isLoading || transactionsQuery.isPending) {
      return (
        <div className='max-w-screen-2xl lg:mx-32 mx-3 pb-10 -mt-24'>
          <Card className='border-none drop-shadow-sm'>
            <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                <Skeleton className='h-8 w-48'/>
                <Skeleton className='w-48 h-8'/>
            </CardHeader>
            <CardContent className='lg:px-auto lg:mx-auto mt-10 '>
              <div className='h-[500px] w-full flex flex-col items-start justify-start gap-4'>
                <Skeleton className='h-8 w-1/2 px-5'/>
                <Skeleton className='h-8 w-full px-5'/>
                <Skeleton className='h-8 w-full px-5'/>
                <Skeleton className='h-8 w-full px-5'/>
              </div>
            </CardContent>
        </Card>
        </div>
      );
    }

    if (transactions.length === 0 && !transactionsQuery.isLoading) {
      return (
        <div className='max-w-screen-2xl lg:mx-32 mx-3 pb-10 -mt-24'>
          <Card className='border-none drop-shadow-sm'>
            <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
              <CardTitle className='text-xl line-clamp-1'>
                Transactions History
              </CardTitle>
              <div className='flex gap-2 flex-col lg:flex-row items-center justify-center'>
                <Button
                  className=' w-full lg:w-32'
                  size={'sm'}
                  onClick={newtransaction.onOpen}
                >
                  <Plus size={16} className='mr-2' />
                  Add New
                </Button>
                <UploadButton onUpload={onUpload} />
              </div>
            </CardHeader>
            <CardContent className='lg:px-auto lg:mx-auto -m-4'>
              <p>
                No transactions available
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (variant === VARIANTS.IMPORT) {
      return (
        <>
          <AccountDialog />
          <ImportCard
            data={importResults.data}
            onCancel={onCancelImport}
            onSubmit={onSubmitImport}
          />
        </>
      );
    }

    return (
      <div className='max-w-screen-2xl lg:mx-32 mx-3 pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
            <CardTitle className='text-xl line-clamp-1'>
              Transactions History
            </CardTitle>
            <div className='flex gap-2 flex-col lg:flex-row items-center justify-center'>
              <Button
                className=' w-full lg:w-32'
                size={'sm'}
                onClick={newtransaction.onOpen}
              >
                <Plus size={16} className='mr-2' />
                Add New
              </Button>
              <UploadButton onUpload={onUpload} />
            </div>
          </CardHeader>
          <CardContent className='lg:px-auto lg:mx-auto -m-4'>
            <p>
              {transactions.length} transactions
            </p>
            <div className="container mx-0 py-10">
              <DataTable
                columns={columns}
                data={transactions}
                filterKey='payee'
                onDelete={(row) => {
                  const ids = row.map((r) => r.original.id);
                  deletetransactions.mutate({ ids });
                }}
                disabled={isDisabled}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
}

export default TransactionPage;
