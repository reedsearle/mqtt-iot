import { Button } from 'flowbite-react';

interface SwitchWidgetProps {
  value: string;
  onToggle?: () => void;
}

export function SwitchWidget({ value, onToggle }: SwitchWidgetProps) {
  const isOn = value === 'ON';

  return (
    <div className="text-center p-10">
      <div className="mb-6 text-lg">
        Current Status: <strong>{value}</strong>
      </div>
      <Button
        color={isOn ? 'success' : 'gray'}
        size="lg"
        onClick={onToggle}
        className="px-10"
      >
        Toggle LED
      </Button>
    </div>
  );
}
