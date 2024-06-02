"use client"
import React from 'react'
import { useOpenCategory } from '@/features/categories/hooks/use-open-category';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Delete, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useDeleteCategory } from '@/features/categories/api/use-delete-category';
import { useConfirm } from '@/hooks/use-confirm';
import { toast } from 'sonner';

type Props = {
    id: string;
}



function Actions({ id }: Props) {
    const { onOpen } = useOpenCategory();
    const deleteMutation = useDeleteCategory(id);
    const [ConfirmationDialog, confirm] = useConfirm(
        "Are You Confirmed ?",
        "You are about to DELETE this transaction"
    );

    const handleDelete = async() => {
        const ok = await confirm();

        if(ok){
            deleteMutation.mutate()
            toast.success("Transaction deleted successfully")
        }
    }
  return (
    <>
        <ConfirmationDialog/>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className='size-8 p-0'>
                    <MoreHorizontal className='size-4'/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem
                disabled={false}
                onClick={() => onOpen(id)}
                className='flex gap-1'
                >
                    <Edit className='size-4'/>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                disabled={deleteMutation.isPending}
                onClick={handleDelete}
                className='hover:bg-red-600 hover:text-white text-red-600 flex gap-1'
                >
                   <Trash size={14}/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default Actions