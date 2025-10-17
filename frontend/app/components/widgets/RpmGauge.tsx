interface RpmGaugeProps {
  value: number;
  max?: number;
  unit?: string;
}

export function RpmGauge({ value, max = 100, unit = '%' }: RpmGaugeProps) {
  const percentage = (value / max) * 100;
  const rotation = (percentage / 100) * 180 - 90; // -90 to 90 degrees

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-48 h-48">
        {/* Gauge background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
            strokeDasharray="125.6 125.6"
            strokeDashoffset="62.8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeDasharray="125.6 125.6"
            strokeDashoffset={62.8 - (percentage / 100) * 125.6}
            className="transition-all duration-300"
          />
        </svg>

        {/* Center value display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold">{value}{unit}</div>
          <div className="text-sm text-gray-500 mt-1">{unit === '%' ? 'Humidity' : 'RPM'}</div>
        </div>
      </div>
    </div>
  );
}
