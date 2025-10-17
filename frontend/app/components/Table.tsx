import type { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border-2 border-gray-600">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: TableProps) {
  return <thead>{children}</thead>;
}

export function TableHeadCell({ children }: TableProps) {
  return (
    <th className="border-2 border-gray-600 bg-gray-200 px-4 py-2 text-left font-bold">
      {children}
    </th>
  );
}

export function TableBody({ children }: TableProps) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: TableProps) {
  return <tr className="bg-white">{children}</tr>;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export function TableCell({ children, className = '' }: TableCellProps) {
  return (
    <td className={`border-2 border-gray-600 px-4 py-2 ${className}`}>
      {children}
    </td>
  );
}
