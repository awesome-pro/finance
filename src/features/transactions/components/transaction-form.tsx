import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { insertTransactionsSchema } from '../../../db/schema'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import Select from '@/components/select'

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.string(),
    notes: z.string().nullable().optional()
})

const apiSchema = insertTransactionsSchema.omit({
    id:true
})

type FormValues = z.infer<typeof formSchema>
type ApiFormValues = z.infer<typeof apiSchema>

type Props = {
    id?: string
    defaultValues?: FormValues;
    onSubmit: (values: ApiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    accountOptions: { label: string; value: string}[];
    categoryOptions: { label: string; value: string}[];
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
}

function TransactionForm(
    {
        id,
        defaultValues,
        onSubmit,
        onDelete,
        disabled,
        accountOptions,
        categoryOptions,
        onCreateAccount,
        onCreateCategory 
    } : Props
) {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    });

    const handleSubmit = (values: FormValues) => {
        console.log("values are here from form: " + values)
        toast.info('Creating Transaction');
       
    }

    const handleDelete = () => {
        console.log('delete')
        onDelete?.();
    }
  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 pt-4'>
                <FormField
                name='accountId'
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Account
                        </FormLabel>
                        <FormControl>
                            <Select
                            placeholder='Select an Account'
                            options={accountOptions}
                            onCreate={onCreateAccount}
                            value={field.value}
                            onChange={field.onChange}
                            disabled={disabled}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />

                <FormField
                name='categoryId'
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Category
                        </FormLabel>
                        <FormControl>
                            <Select
                            placeholder='Select a Category'
                            options={categoryOptions}
                            onCreate={onCreateCategory}
                            value={field.value}
                            onChange={field.onChange}
                            disabled={disabled}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />

                <Button 
                className='w-full bg-blue-600 text-white hover:bg-blue-700' 
                disabled={disabled}
                type='submit'
                onClick={form.handleSubmit(handleSubmit)}
                >
                    {id ? "Save Changes" : "Create Transaction" }
                </Button>
                
                {!!id && (
                    <Button
                    disabled={disabled}
                    onClick={() => handleDelete()}
                    className='w-full text-red-600 border-red-600 hover:text-white hover:bg-red-600'
                    variant={'outline'}
                    type='button'
                    >
                        <Trash className='size-4 mr-2'/>
                        Delete Transaction
                    </Button>
                )}
            </form>
        </Form>
    </div>
  )
}

export default TransactionForm