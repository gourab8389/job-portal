import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formattedString = (input : string) => {
  const parts = input.split("-");

  const captialized  = parts.map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  })

  return captialized.join(" ");
}