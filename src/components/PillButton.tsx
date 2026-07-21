import { ButtonHTMLAttributes } from 'react';

export default function PillButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`font-body font-semibold text-sm text-ink bg-gold px-5 py-2.5 rounded-full shadow-paddle hover:-translate-y-0.5 hover:shadow-paddle-hover transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-chalk focus-visible:outline-offset-2 ${className}`}
    />
  )
}
