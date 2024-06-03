import React from 'react'
import { format } from 'date-fns'
import { Calendar as CalenderIcon } from 'lucide-react'
import { SelectSingleEventHandler } from 'react-day-picker'

import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'


type Props = {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabled?: boolean;
}



function DatePicker(
  {
    value,
    onChange,
    disabled
  } : Props
) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
        type='button'
        disabled={disabled}
        variant={'outline'}
        className={cn(
          "w-full justify-start text-left font-normal",
          !value && "text-muted-foreground",
        )}
        >
          <CalenderIcon className='mr-4' size={12}/>
          {value ? format(value,"PPP" ) : <span>Pick a Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode='single'
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker