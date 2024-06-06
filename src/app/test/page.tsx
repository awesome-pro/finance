"use client"

import Skip from '@/components/skip';
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import React from 'react'
import { Footer } from 'react-day-picker';

function Test() {

  const { toast } = useToast();
  return (
    <div>
      
     <Skip/>
     
    </div>
  )
}

export default Test