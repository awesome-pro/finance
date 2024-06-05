"use client";

import React, {useState} from 'react'
import { format, subDays } from 'date-fns'
import { DateRange } from 'react-day-picker';
import { ChevronDown } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose
} from "@/components/ui/popover"
import { Calendar } from './ui/calendar';
import { Button } from "@/components/ui/button"
  import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
  import { useGetSummary } from '@/features/summary/use-get-summary'
  import qs from "query-string"
  import { 
    usePathname,
    useRouter,
    useSearchParams
  } from "next/navigation"
import { cn, formatDateRange } from '@/lib/utils';



function DateFilter() {

    const pathName = usePathname()
    const params = useSearchParams()
    const accountId = params.get('accountId')
    const from = params.get('from') || ""
    const to = params.get('to') || ""
    const router = useRouter()

    const defaultTo = new Date()
    const defaultFrom = subDays(defaultTo, 30)

    const paramState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to) : defaultTo
    }

    const [date, setDate] = useState<DateRange | undefined>(paramState);

    const pushUrl = (dateRange: DateRange | undefined) => {
        const query = {
            from: format(dateRange?.from || defaultFrom, 'yyyy-MM-dd'),
            to: format(dateRange?.to || defaultTo, 'yyyy-MM-dd'),
            accountId: accountId
        }

        const url = qs.stringifyUrl({
            url: pathName,
            query
        }, { skipNull: true, skipEmptyString: true })

        router.push(url)
    }

    const onReset = () => {
        setDate(undefined)
        pushUrl(undefined)
    }

  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button
             disabled={false}
             size={'sm'}
             variant={'outline'}
             className='lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none outline-none focus:ring-offset-0 focus:ring-transparent text-white focus:bg-white/30 transition'
            >
                <span>{formatDateRange(paramState)}</span>
                <ChevronDown className='w-4 h-4 ml-2 opacity-50'/>
            </Button>
        </PopoverTrigger>
        <PopoverContent
         className=' lg:w-auto w-full p-0'
         align='start'
        >
            <Calendar
             disabled={false}
             initialFocus
             mode='range'
             defaultMonth={date?.from || new Date()}
             selected={date}
             onSelect={setDate}
             numberOfMonths={2}
            />

            <div className='p-4 w-full flex items-center gap-2 '>
                <PopoverClose asChild>
                    <Button
                     size={'sm'}
                     variant={'outline'}
                     onClick={onReset}
                     disabled={!date?.from && !date?.to}
                     className='w-full'
                    >
                        Reset
                    </Button>
                </PopoverClose>
                <PopoverClose asChild>
                    <Button
                     size={'sm'}
                     variant={'default'}
                     onClick={() => pushUrl(date)}
                     disabled={!date?.from && !date?.to}
                     className='w-full'
                    >
                        Apply
                    </Button>
                </PopoverClose>
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default DateFilter