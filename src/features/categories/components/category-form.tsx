import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { insertCategorySchema } from '../../../../db/schema'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'

const formSchema = insertCategorySchema.pick({
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

function CategoryForm(
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
        console.log("values are here from form: " + values)
        toast.info('Creating Category');
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
                            placeholder='e.g. Food, Travel...'
                            {...field}
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
                    {id ? "Save Changes" : "Create Category" }
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
                        Delete Category
                    </Button>
                )}
            </form>
        </Form>
    </div>
  )
}

export default CategoryForm