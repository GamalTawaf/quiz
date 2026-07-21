import { ReactNode } from 'react';

interface BoardProps {
  children: ReactNode;
  className?: string;
}

export default function Board({ children, className = '' }: BoardProps) {
  return (
    <div className={`board-rule relative bg-gradient-to-b from-chalk/5 to-chalk/[0.02] border border-chalk/[0.14] rounded-2xl px-[26px] overflow-hidden ${className}`}>
      {children}
    </div>
  )
}
