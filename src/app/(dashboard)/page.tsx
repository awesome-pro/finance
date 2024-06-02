"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Loader2 } from "lucide-react";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

export default function Home() {

  const accountsQuery = useGetAccounts();
  const { onOpen } = useNewAccount();

  return (
    <div>
     
      <Button 
      onClick={() => {
        toast.success("Button was clicked")
        //console.log("isOpen: ", isOpen)
        onOpen();
        //console.log("isOpen: ", isOpen)
        //toast.info("isOpen: " + isOpen)
      }}
      variant={'secondary'}
      >
        Add an Account
      </Button>
    </div>
  );
}
