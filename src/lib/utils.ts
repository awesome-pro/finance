import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { number } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountFromMilliUnits(amount: number){
  return amount/1000;
}

export function convertAmountToMilliUnits(amount: number){
  return Math.round(amount * 1000)
}

export function formatCurrency(value: number){
 // const finalValue = convertAmountFromMilliUnits(value)

  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(value);
}


export function calculatePercentageChange(
  current: number,
  previous: number
){
  if(previous === 0){
    return previous == current ? 0 : 100
  }

  return ((current - previous)/previous ) * 100;
}