"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Loader2 } from "lucide-react";

export default function Home() {

  const accountsQuery = useGetAccounts();


  return (
    <main>
     
     {accountsQuery.isLoading 
     && <div className="flex flex-col items-center justify-center p-6 ">
       
          <Image 
          src="/logo.svg" 
          alt="logo" 
          width={30} 
          height={30} 
          className="animate-spin"
          />
          
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    }
    {
      accountsQuery.data?.map((account) => (
        <div key={account.id} className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Image src="/logo.svg" alt="logo" width={50} height={50} className="" />
            <div>
              <h2 className="text-xl font-semibold">{account.name}</h2>
              
            </div>
          </div>
          <Button>View</Button>
        </div>
      ))
    }

     
    </main>
  );
}
