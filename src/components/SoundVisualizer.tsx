import type React from "react";
import { useEffect, useRef } from "react";

const SoundVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const bars = 40;
    const barHeights: number[] = Array(bars).fill(0);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const barWidth = canvas.offsetWidth / bars;
      const maxHeight = canvas.offsetHeight * 0.8;

      for (let i = 0; i < bars; i++) {
        // Simulate audio data with random values
        const targetHeight = Math.random() * maxHeight;
        barHeights[i] = barHeights[i] * 0.8 + targetHeight * 0.2;

        // Draw bar
        const hue = (i / bars) * 360;
        ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
        const x = i * barWidth;
        const y = canvas.offsetHeight - barHeights[i];
        const height = barHeights[i];
        const radius = 3;

        // Draw rounded rectangle
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + barWidth - radius, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
        ctx.lineTo(x + barWidth, y + height - radius);
        ctx.quadraticCurveTo(
          x + barWidth,
          y + height,
          x + barWidth - radius,
          y + height
        );
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-32 overflow-hidden bg-transparent">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default SoundVisualizer;
