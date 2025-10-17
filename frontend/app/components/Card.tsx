import type { ReactNode } from 'react';
import { Card as FlowbiteCard } from 'flowbite-react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <FlowbiteCard className={`border-2 border-gray-300 ${className}`}>
      {children}
    </FlowbiteCard>
  );
}

interface CardHeaderProps {
  children: ReactNode;
}

export function CardHeader({ children }: CardHeaderProps) {
  return (
    <div className="font-bold text-lg mb-2 pb-2 border-b-2 border-gray-300">
      {children}
    </div>
  );
}
