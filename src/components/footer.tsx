import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'


const footerLinks = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Contact Us",
    href: "/contact"
  },
  {
    label: "Privacy Policy",
    href: "/privacypolicy"
  },
  {
    label: "Terms of Service",
    href: "/tnc"
  },
  {
    label: "Support Us",
    href: "/support-us"
  }
]
function Footer() {
  return (
    <footer className="text-gray-800 bg-gray-100 py-4">
      <div className='flex flex-col lg:flex-row items-center justify-center lg:gap-10 bg-white/20 p'>
          {footerLinks.map((link, index) => (
            <Link key={index} href={
              link.href
            }>
              <Button variant='link' className='text-gray-800 hover:text-blue-600'>
                {link.label}
              </Button>
            </Link>
          ))}
      </div>
          <Separator className='w-full'/>
      <div className="flex items-center justify-center gap-5 py-5">
        <Image src="/logo.svg" alt="logo" width={20} height={20} />
          <p className='text-xl font-serif m-0 -ml-4'>
            SBI
          </p>
        <p>&copy; 2024 All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer