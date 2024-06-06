"use client"

import React from 'react'
import NavButton from './NavButton'
import { usePathname, useRouter } from 'next/navigation'
import { useMedia } from 'react-use'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { CrossIcon, Menu } from 'lucide-react'
import { CardHeader, CardTitle, Card } from './ui/card'
import Image from 'next/image'

const routes = [
  {
    href: '/',
    label: "Overview"
  },
  {
    href: '/transactions',
    label: "Transactions"
  },
  {
    href: '/accounts',
    label: "Accounts"
  },
  {
    href: '/categories',
    label: "Categories"
  },
  {
    href: '/settings',
    label: "Settings"
  }
]


function  Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);
  const router = useRouter();

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  }

  if(isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
          variant={'outline'}
          size={'sm'}
          className='font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition ' 
          >
            <Menu className='size-4'/>
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className='px-2 bg-white'>
          <Card className='bg-blue-600 px-2 items-center justify-normal flex mt-6'>
            <CardHeader>
              <Image
                src={'/complete-logo.svg'}
                alt='logo'
                width={100}
                height={100}
              />
            </CardHeader>
          </Card>
          <nav className='flex flex-col gap-y-2 pt-6'>
            {routes.map((route) => (
              <Button
              variant={route.href === pathname ? 'default' : 'secondary'}
              key={route.href}
              onClick={() => onClick(route.href)}
              className='w-full text-left px-2'
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <nav className='hidden lg:flex items-center gap-x-2 overflow-x-auto'>
        {routes.map((route) => (
          <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
          />
        ))}
    </nav>
  )
}

export default Navbar