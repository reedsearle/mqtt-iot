interface DigitalReadoutProps {
  value: string | number;
  label?: string;
  lastUpdate?: string;
}

export function DigitalReadout({ value, label, lastUpdate }: DigitalReadoutProps) {
  return (
    <div className="text-center p-10">
      <div className="text-5xl font-bold mb-2">{value}</div>
      {label && <div className="text-gray-600 text-sm mb-2">{label}</div>}
      {lastUpdate && (
        <div className="text-gray-500 text-xs">Last updated: {lastUpdate}</div>
      )}
    </div>
  );
}
