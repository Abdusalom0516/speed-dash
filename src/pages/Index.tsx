
import { useState, useEffect } from 'react';
import SpeedometerGauge from '../components/SpeedometerGauge';
import SpeedControls from '../components/SpeedControls';
import SpeedDisplay from '../components/SpeedDisplay';

const Index = () => {
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(200);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSpeedChange = (newSpeed: number) => {
    setIsAnimating(true);
    setCurrentSpeed(newSpeed);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const simulateAcceleration = () => {
    setIsAnimating(true);
    let speed = 0;
    const interval = setInterval(() => {
      speed += Math.random() * 10;
      if (speed >= maxSpeed) {
        speed = maxSpeed;
        clearInterval(interval);
        setIsAnimating(false);
      }
      setCurrentSpeed(Math.min(speed, maxSpeed));
    }, 100);
  };

  const simulateDeceleration = () => {
    setIsAnimating(true);
    let speed = currentSpeed;
    const interval = setInterval(() => {
      speed -= Math.random() * 15;
      if (speed <= 0) {
        speed = 0;
        clearInterval(interval);
        setIsAnimating(false);
      }
      setCurrentSpeed(Math.max(speed, 0));
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">
            PHANTOM SPEEDOMETER
          </h1>
          <p className="text-purple-300 text-lg">Modern Speed Dashboard</p>
        </div>

        {/* Main Dashboard */}
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-purple-800/30 p-8 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Speedometer */}
            <div className="flex justify-center">
              <SpeedometerGauge 
                currentSpeed={currentSpeed} 
                maxSpeed={maxSpeed}
                isAnimating={isAnimating}
              />
            </div>

            {/* Controls and Display */}
            <div className="space-y-8">
              <SpeedDisplay 
                currentSpeed={currentSpeed}
                maxSpeed={maxSpeed}
                isAnimating={isAnimating}
              />
              
              <SpeedControls 
                currentSpeed={currentSpeed}
                onSpeedChange={handleSpeedChange}
                onAccelerate={simulateAcceleration}
                onDecelerate={simulateDeceleration}
                maxSpeed={maxSpeed}
                onMaxSpeedChange={setMaxSpeed}
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-purple-800/30 p-6 text-center">
            <div className="text-2xl font-bold text-purple-400">{Math.round(currentSpeed * 1.609)} km/h</div>
            <div className="text-purple-300 text-sm">Kilometers per Hour</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-purple-800/30 p-6 text-center">
            <div className="text-2xl font-bold text-purple-400">{Math.round(currentSpeed)} mph</div>
            <div className="text-purple-300 text-sm">Miles per Hour</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-purple-800/30 p-6 text-center">
            <div className="text-2xl font-bold text-purple-400">{Math.round((currentSpeed / maxSpeed) * 100)}%</div>
            <div className="text-purple-300 text-sm">Max Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
