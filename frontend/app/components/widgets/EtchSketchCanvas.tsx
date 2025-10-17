import { useRef, useEffect } from 'react';

interface EtchSketchCanvasProps {
  width?: number;
  height?: number;
}

export function EtchSketchCanvas({ width = 400, height = 300 }: EtchSketchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw border
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, width, height);

    // Draw placeholder text
    ctx.fillStyle = '#ccc';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Etch-a-Sketch Canvas', width / 2, height / 2);
    ctx.fillText('(Drawing will appear here)', width / 2, height / 2 + 25);
  }, [width, height]);

  return (
    <div className="flex justify-center items-center p-4 bg-gray-50">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border-2 border-gray-400 bg-white"
      />
    </div>
  );
}
