"use client"

import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
  import { useGetSummary } from '@/features/summary/use-get-summary'
  import qs from "query-string"
  import { 
    usePathname,
    useRouter,
    useSearchParams
  } from "next/navigation"


function AccountFilter() {

    const {data:accounts , isLoading: isLoadingAccounts} = useGetAccounts()
    const {
        isLoading: isLoadingSummary,
        data: summary
    } = useGetSummary()
    const pathName = usePathname()
    const params = useSearchParams()
    const accountId = params.get('accountId') || 'all'
    const from = params.get('from') || ""
    const to = params.get('to') || ""
    const router = useRouter()

    if(isLoadingAccounts) return (
        <div>
            Loading...
        </div>
    )

    const onChange = (newValue: string) => {
        const query = {
            accountId: newValue,
            from,
            to
        }

        if(newValue === 'all'){
           query.accountId = "";
        }

        const url = qs.stringifyUrl({
            url: pathName,
            query
        }, { skipNull: true, skipEmptyString: true })

        router.push(url)
    }
    
    

  return (
    <Select
     value={accountId}
     onValueChange={onChange}
     disabled={isLoadingAccounts || isLoadingSummary}
    >
        <SelectTrigger 
         className='lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none outline-none focus:ring-offset-0 focus:ring-transparent text-white focus:bg-white/30 transition'
        >
            <SelectValue placeholder="Select Account"/>
                <SelectContent>
                    <SelectItem value='all'>
                        All Accounts
                    </SelectItem>
                    {accounts?.map(account => (
                        <SelectItem key={account.id} value={account.id}>
                            {account.name}
                        </SelectItem>
                    ))}
                </SelectContent>                
        </SelectTrigger>

    </Select>
  )
}

export default AccountFilter