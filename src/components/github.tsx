import Link from 'next/link'
import React from 'react'
import { FaChevronRight, FaGithub } from 'react-icons/fa6'
import { Button } from './ui/button'
import { ChevronRight, Link2, Link2Icon } from 'lucide-react'

function GithubLink() {
  return (
    <Link href={'https://github.com/abhinandan-verma/finance'} target='_blank' rel='noopener '>
        <Button
         variant={'outline'}
         className='flex items-center justify-center gap-2 p-2 border-black'
        >
            <FaGithub size={22}/>
            <h1 className='text-lg font-sans font-bold'>
                Visit Repo
            </h1>
            <div className='flex items-center gap-0'>
                <FaChevronRight size={20}/>
                <FaChevronRight size={20}/>
            </div>
        </Button>
    </Link>
  )
}

export default GithubLink