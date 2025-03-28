import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const copyToClipboard = (text: string) => navigator.clipboard.writeText(text)  

export function formatToTwoDecimals(number) {
  const num = Number(number);
  return Number.isInteger(num) ? num : parseFloat(num.toFixed(2));
}