"use client";

import { toast } from 'sonner';
import React, { useEffect, useState } from 'react';
import NewAccountSheet from '@/features/accounts/components/new-account-sheet';
import EditAccountSheet from '@/features/accounts/components/edit-account-sheet';
import NewCategorySheet from '@/features/categories/components/new-category-sheet';
import EditCategorysheet from '@/features/categories/components/edit-category-sheet';
import { useMountedState } from 'react-use';

function SheetProvider() {
    const isMounted = useMountedState();

    if (!isMounted) {
        toast.error("Component is not mounted yet");
        console.log("Component is not mounted yet");

        return (
            <div className='bg-teal-600 p-8 w-1/2 h-full'>
                <h1>
                    Mounted yet null
                </h1>
            </div>
        );
    }

    console.log("Component is mounted");
    toast.info("Component is mounted");

    return (
        <>
            <NewAccountSheet />
            <EditAccountSheet/>

            <NewCategorySheet/>
            <EditCategorysheet/>
        </>
    );
}

export default SheetProvider;
