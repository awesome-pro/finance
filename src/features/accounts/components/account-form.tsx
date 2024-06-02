import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { insertAccountsSchema } from '../../../../db/schema'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'

const formSchema = insertAccountsSchema.pick({
    name: true
});

type FormValues = z.infer<typeof formSchema>

type Props = {
    id?: string
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
}

function AccountForm(
    {
        id,
        defaultValues,
        onSubmit,
        onDelete,
        disabled 
    } : Props
) {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    });

    const handleSubmit = (values: FormValues) => {
        console.log("values are here: " + values)
        toast.info('Creating Account');
        onSubmit(values);
        
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
                name='name'
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input
                            disabled={disabled}
                            placeholder='e.g. Cash'
                            {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />

                <Button 
                className='w-full' 
                disabled={disabled}
                type='submit'
                onClick={form.handleSubmit(handleSubmit)}
                >
                    {id ? "Save Changes" : "Create Account" }
                </Button>
                
                {!!id && (
                    <Button
                    disabled={disabled}
                    onClick={handleDelete}
                    className='w-full bg-red-600 text-white hover:bg-red-700'
                    variant={'destructive'}
                    >
                        <Trash className='size-4 mr-2'/>
                        Delete Account
                    </Button>
                )}
            </form>
        </Form>
    </div>
  )
}

export default AccountForm