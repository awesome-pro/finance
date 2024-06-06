import Image from 'next/image'
import React from 'react'

function about() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
        <div className='flex gap-7 items-center justify-start'>
                <Image
                  src="/logo.svg"
                  alt="SBI Banking App"
                  width={50}
                  height={50}
                />
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
        </div>
        <p className="text-lg mb-4">
          SBI Banking App is dedicated to providing seamless banking solutions to manage all your transactions, payments, and finances online.
        </p>
        <p className="text-lg">
          Our mission is to offer a secure, user-friendly, and efficient platform to handle all your banking needs with the highest level of professionalism and security.
        </p>
      </main>
  )
}

export default about