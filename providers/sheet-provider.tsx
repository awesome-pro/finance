"use client"

import NewAccountSheet from '@/features/accounts/components/new-account-sheet'
import React from 'react'
import { useMountedState } from 'react-use'

function SheetProvider() {
    const isMounted = useMountedState();

    if(!isMounted()){
        return null;
    }
    
  return (
   
    <NewAccountSheet />
   
  )
}

export default SheetProvider