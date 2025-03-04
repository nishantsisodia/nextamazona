import { HelpCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='p-4'>
      <header className='bg-card mb-4 border-b'>
        <div className='max-w-6xl mx-auto flex justify-between items-center'>
            <div className='w-52 h-20  justify-center items-center flex overflow-hidden '>

          <Link href='/'>
            <Image
              src='/logo.gif'
              alt='logo'
              width={400}
              height={10}
              style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
                />
          </Link>
                </div>
          <div>
            <h1 className='text-3xl mr-36'>Checkout</h1>
          </div>
          <div>
            <Link href='/page/help'>
              <HelpCircle className='w-6 h-6' />
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}