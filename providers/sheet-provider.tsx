"use client";

import { toast } from 'sonner';
import React from 'react';
import { useMountedState } from 'react-use';
import NewAccountSheet from '@/features/accounts/components/new-account-sheet';

function SheetProvider() {
    
    const isMounted = useMountedState();

    if (!isMounted() || isMounted === null) {

        toast.error("Mounted is null");
        console.log("Mounted is null ")

        return (
            <div className='bg-blue-600 p-8 w-1/2 h-full'>
                
            </div>
        )
    }

    console.log("Mounted is not null")
    toast.info("Mounted is not null");

    return (
        <>
            <NewAccountSheet />
        </>
    );
}

export default SheetProvider;
