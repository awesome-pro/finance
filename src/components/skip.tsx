"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import copy from "copy-to-clipboard";
import { useToast } from './ui/use-toast';
import { Copy } from 'lucide-react';
import { FaExclamationTriangle } from 'react-icons/fa';

function Skip() {
    const { toast } = useToast();

    const copyToClipboard = (text: string) => {
        copy(text);
        toast({
            title: "Copied to clipboard",
            description: text,
            variant: "success",
        });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="w-32 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                    Skip Auth 😅
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-2 bg-white">
                <div className="px-2 flex flex-col items-start justify-start gap-6 ">
                    <h1 className='text-sm text-gray-700'>
                        Use these credentials to skip auth
                    </h1>
                    <div className="flex justify-around items-center gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="text"
                            value={'defenceaspirent@gmail.com'}
                            disabled={true}
                            className='w-60'
                        />
                        <Button 
                            onClick={() => copyToClipboard('defenceaspirent@gmail.com')} 
                            variant={'ghost'} 
                            className='w-fit'
                        >
                            <Copy className="size-4" />
                        </Button>
                    </div>
                    <div className="flex justify-around items-center gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="text"
                            value={'User@sbi'}
                            disabled={true}
                            className='w-52'
                        />
                        <Button 
                            onClick={() => copyToClipboard('User@sbi')} 
                            variant={'ghost'} 
                            className='w-fit'
                        >
                            <Copy className="size-4" />
                        </Button>
                    </div>
                    <div>

                    </div>

                    <div className="flex items-center gap-2 bg-rose-100 rounded-lg p-3">
                        <FaExclamationTriangle className='text-red-600' size={20}/>
                        <p className='text-sm text-red-500'>Do not use these credentials for any other purpose, Neither Share with anyone else !!</p>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default Skip;
