'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

import { formUrlQuery } from '@/lib/utils'

import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  page: number | string
  totalPages: number
  urlParamName?: string
}

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onClick = (btnType: string) => {
    const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString(),
    })

    router.push(newUrl, { scroll: true })
  }
  return (
    <div className='flex items-center  gap-2'>
      <Button
        size='icon'
        variant='default'
        className='w-28 flex justify-center'
        onClick={() => onClick('prev')}
        disabled={Number(page) <= 1}
      >
        <ChevronLeft /> Previous

      </Button>
     <span className='text-sm'>Page {page} of {totalPages}</span>
      <Button
        size='icon'
        variant='default'
        className='w-24 flex justify-center items-center text-center'
        onClick={() => onClick('next')}
        disabled={Number(page) >= totalPages}
      >
           Next <ChevronRight />
      </Button>
    </div>
  )
}

export default Pagination