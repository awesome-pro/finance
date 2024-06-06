"use client"

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import React from 'react'

function Test() {

  const { toast } = useToast();
  return (
    <div>
      
      <Button
       onClick={() => {
          toast({
            title: "Success",
            description: "This is a success toast",
            variant: "success",
          })
        }
       }
      >
        Click me
      </Button>
    </div>
  )
}

export default Test