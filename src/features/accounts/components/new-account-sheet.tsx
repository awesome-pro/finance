import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useNewAccount } from '../hooks/use-new-account'

  
function NewAccountSheet() {

    const {isOpen, onClose} = useNewAccount();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
            <SheetHeader>
            <SheetTitle>New Account</SheetTitle>
            <SheetDescription>
                Create a new Account to track your transactions.
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>

  )
}

export default NewAccountSheet