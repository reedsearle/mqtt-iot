export function ChartPlaceholder() {
  return (
    <div className="relative h-48 border-2 border-gray-300 bg-gray-50 flex items-center justify-center">
      {/* Axes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="10" y1="10" x2="10" y2="90" stroke="#999" strokeWidth="0.5" />
        <line x1="10" y1="90" x2="90" y2="90" stroke="#999" strokeWidth="0.5" />

        {/* Mock line chart */}
        <polyline
          points="15,70 25,50 35,55 45,35 55,40 65,25 75,30 85,20"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
        />
      </svg>

      <span className="relative z-10 text-gray-400 text-sm">Line Chart</span>
    </div>
  );
}
