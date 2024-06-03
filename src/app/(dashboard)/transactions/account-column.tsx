import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

import React from 'react'

type Props = {
    account: string;
    accountId: string;
}


function AccountColumn(
    {
        account,
        accountId
    }: Props
) {
    const { onOpen: onOpenAccount } = useOpenAccount();

    const onClick = () => {
        onOpenAccount(accountId);
        console.log(accountId)
    }

  return (
    <div 
     className="flex items-center cursor-pointer hover:underline"
     onClick={onClick}
    >
        {account}
    </div>
  )
}

export default AccountColumn