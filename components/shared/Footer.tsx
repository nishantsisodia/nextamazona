'use client'
import { ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { Button } from '../ui/button';

/**
 * Footer component with a "Back to Top" button and useful links.
 * @returns {JSX.Element} The rendered footer component.
 */
export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='bg-black text-white underline-link'>
      <div className='w-full'>
        <Button
          variant='ghost'
          className='bg-gray-800 w-full rounded-none'
          onClick={handleBackToTop}
        >
          <ChevronUp className='mr-2 h-4 w-4' />
          Back to top
        </Button>
      </div>
      <div className='p-4'>
        <div className='flex justify-center gap-3 text-sm'>
          <Link href='/page/conditions-of-use'>Conditions of Use</Link>
          <Link href='/page/privacy-policy'>Privacy Notice</Link>
          <Link href='/page/help'>Help</Link>
        </div>
        <div className='flex justify-center text-sm'>
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

