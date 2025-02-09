import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currencyFormat = (value: number, style?: "decimal" | "currency" | "percent" | "unit", currency: string = "BRL") => new Intl.NumberFormat('pt-BR', {
  style,
  currency,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(value)

export const MASKS = {
  PLATE: "###-####",
  CPF: "###.###.###-##",
  PHONE: "(##)#########",
  CELL_PHONE: "(##) #####-####"
}

export const isToday = (date: Date) => {
  const today = new Date();
  return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
}

export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  const validateDigit = (index: number) => {
      const sum = cpf.substring(0, index).split('').map(Number).reduce((acc, value, idx) => acc + value * (index + 1 - idx), 0);
      let remainder = sum % 11;
      return parseInt(cpf[index]) === (remainder < 2 ? 0 : 11 - remainder);
  };
  return validateDigit(9) && validateDigit(10);
}