"use client"
import React from 'react'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Edit, MoreHorizontal } from 'lucide-react';
  

type Props = {
    id: string;
}

function Actions({ id }: Props) {
    const { onOpen } = useOpenAccount();
  return (
    <>
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
                >
                    <Edit className='size-4'/>
                    Edit
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default Actions