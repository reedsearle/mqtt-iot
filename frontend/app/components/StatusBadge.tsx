import { Badge } from 'flowbite-react';

interface StatusBadgeProps {
  status: 'online' | 'offline';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-block w-3 h-3 rounded-full border-2 border-gray-800 ${
          status === 'online' ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      <span className="capitalize">{status}</span>
    </div>
  );
}
