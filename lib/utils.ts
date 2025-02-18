import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumberWithDecimal = (num: number): string => {
   const [int, decimal] = num.toString().split('.');
   return decimal ? `${int}.${decimal.padEnd(2, '0')}` : int;
};


export const toSlug = (text: string): string =>
   text
       .toLowerCase()
       .replace(/[^\w\s-]/g, '') // Remove non-word, non-whitespace, non-hyphen characters
       .replace(/\s+/g, '-')     // Replace whitespace with hyphens
       .replace(/^-+|-+$/g, ''); // Trim leading and trailing hyphens


const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US',{
   currency: 'USD',
   style: 'currency',
   minimumFractionDigits: 2,
})

export function formatCurrency(amount: number) {
return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US')

export function formatNumber(number: number){
   return NUMBER_FORMATTER.format(number)
}