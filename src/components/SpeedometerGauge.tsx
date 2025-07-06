
import { useEffect, useRef } from 'react';

interface SpeedometerGaugeProps {
  currentSpeed: number;
  maxSpeed: number;
  isAnimating: boolean;
}

const SpeedometerGauge = ({ currentSpeed, maxSpeed, isAnimating }: SpeedometerGaugeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for high DPI displays
    const rect = canvas.getBoundingClientRect();
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw outer glow
    const glowGradient = ctx.createRadialGradient(centerX, centerY, radius - 10, centerX, centerY, radius + 20);
    glowGradient.addColorStop(0, 'rgba(147, 51, 234, 0.1)');
    glowGradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 20, 0, 2 * Math.PI);
    ctx.fill();

    // Draw outer ring
    ctx.strokeStyle = '#4c1d95';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw speed arc background
    ctx.strokeStyle = '#1f1f23';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 15, Math.PI * 0.75, Math.PI * 2.25);
    ctx.stroke();

    // Draw speed arc
    const speedAngle = Math.PI * 0.75 + (currentSpeed / maxSpeed) * Math.PI * 1.5;
    const speedGradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
    speedGradient.addColorStop(0, '#7c3aed');
    speedGradient.addColorStop(0.5, '#a855f7');
    speedGradient.addColorStop(1, '#c084fc');
    
    ctx.strokeStyle = speedGradient;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 15, Math.PI * 0.75, speedAngle);
    ctx.stroke();

    // Draw tick marks
    for (let i = 0; i <= 10; i++) {
      const angle = Math.PI * 0.75 + (i / 10) * Math.PI * 1.5;
      const startRadius = radius - 30;
      const endRadius = i % 2 === 0 ? radius - 40 : radius - 35;
      
      ctx.strokeStyle = i <= (currentSpeed / maxSpeed) * 10 ? '#a855f7' : '#374151';
      ctx.lineWidth = i % 2 === 0 ? 3 : 2;
      ctx.beginPath();
      ctx.moveTo(
        centerX + Math.cos(angle) * startRadius,
        centerY + Math.sin(angle) * startRadius
      );
      ctx.lineTo(
        centerX + Math.cos(angle) * endRadius,
        centerY + Math.sin(angle) * endRadius
      );
      ctx.stroke();

      // Draw numbers
      if (i % 2 === 0) {
        const number = Math.round((i / 10) * maxSpeed);
        const textRadius = radius - 55;
        const textX = centerX + Math.cos(angle) * textRadius;
        const textY = centerY + Math.sin(angle) * textRadius;
        
        ctx.fillStyle = i <= (currentSpeed / maxSpeed) * 10 ? '#a855f7' : '#6b7280';
        ctx.font = 'bold 14px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(number.toString(), textX, textY);
      }
    }

    // Draw needle
    const needleAngle = Math.PI * 0.75 + (currentSpeed / maxSpeed) * Math.PI * 1.5;
    
    // Needle shadow
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX + 2, centerY + 2);
    ctx.lineTo(
      centerX + Math.cos(needleAngle) * (radius - 25) + 2,
      centerY + Math.sin(needleAngle) * (radius - 25) + 2
    );
    ctx.stroke();

    // Needle
    const needleGradient = ctx.createLinearGradient(centerX, centerY, 
      centerX + Math.cos(needleAngle) * (radius - 25),
      centerY + Math.sin(needleAngle) * (radius - 25)
    );
    needleGradient.addColorStop(0, '#dc2626');
    needleGradient.addColorStop(1, '#ef4444');
    
    ctx.strokeStyle = needleGradient;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(needleAngle) * (radius - 25),
      centerY + Math.sin(needleAngle) * (radius - 25)
    );
    ctx.stroke();

    // Center dot
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 12);
    centerGradient.addColorStop(0, '#dc2626');
    centerGradient.addColorStop(1, '#7f1d1d');
    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
    ctx.fill();

    // Center dot border
    ctx.strokeStyle = '#fca5a5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
    ctx.stroke();

  }, [currentSpeed, maxSpeed]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className={`w-80 h-80 transition-transform duration-300 ${isAnimating ? 'scale-105' : 'scale-100'}`}
        style={{ width: '320px', height: '320px' }}
      />
      <div className="absolute inset-0 rounded-full border-4 border-purple-600/20 animate-pulse"></div>
    </div>
  );
};

export default SpeedometerGauge;
