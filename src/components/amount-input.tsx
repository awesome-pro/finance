import React from 'react'
import CurrencyInput from "react-currency-input-field"
import { Info, MinusCircle, PlusCircle } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from './ui/button'

type Props = {
    value: string;
    onChange: (value: string | undefined) => void;
    placeholder?: string;
    disabled?: boolean
}
  

function AmountInput(
    {
        value,
        onChange,
        placeholder,
        disabled
    } : Props
) {

    const parsedValue = parseFloat(value);
    //console.log("parsedValue: ", parsedValue)
    const isIncome = parsedValue >  0;
    const isExpense = parsedValue < 0;

    const onReverseValue = () => {
        if(!value) return;
        const newValue = parseFloat(value) * -1
        onChange( newValue.toString());
    };



  return (
    <div className='relative'>
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                     type='button'
                     onClick={onReverseValue}
                     className={cn(
                        "bg-slate-300 hover:bg-slate-200 absolute rounded-md p-1 px-2 flex items-center justify-center transition mx-1 mb-2 bg-clip-padding",
                        isIncome && "bg-emerald-500 text-white hover:bg-emerald-600",
                        isExpense && "bg-destructive text-white hover:bg-red-600"
                     )}
                    >
                        {!parsedValue && <Info size={16} className='text-black'/>}
                        {isIncome && <PlusCircle size={16} className=''/>}
                        {isExpense && <MinusCircle size={16} className=''/>}

                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Use [+] for income and [-] for expenses
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <CurrencyInput
         prefix='$'
         className='pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
         placeholder={placeholder}
         value={value}
         disabled={disabled}
         onValueChange={onChange}
        />
        <p className='text-xs text-muted-foreground mt-2'>
            {isIncome && "This will count as income"}
            {isExpense && "This will count as expense"}
        </p>
        <p>
            {isIncome}
        </p>
    </div>
  )
}

export default AmountInput