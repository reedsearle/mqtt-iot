import type { ReactNode } from 'react';
import { Card } from '../Card';

interface WidgetContainerProps {
  title: string;
  children: ReactNode;
}

export function WidgetContainer({ title, children }: WidgetContainerProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">{title}</h3>
        <button className="text-gray-500 hover:text-gray-700 text-xl">
          ⋮
        </button>
      </div>
      {children}
    </Card>
  );
}
