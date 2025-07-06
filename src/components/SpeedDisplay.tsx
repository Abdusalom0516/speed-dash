
interface SpeedDisplayProps {
  currentSpeed: number;
  maxSpeed: number;
  isAnimating: boolean;
}

const SpeedDisplay = ({ currentSpeed, maxSpeed, isAnimating }: SpeedDisplayProps) => {
  const speedPercentage = (currentSpeed / maxSpeed) * 100;
  
  const getSpeedColor = () => {
    if (speedPercentage < 33) return 'text-green-400';
    if (speedPercentage < 66) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSpeedStatus = () => {
    if (speedPercentage < 33) return 'SAFE';
    if (speedPercentage < 66) return 'CAUTION';
    return 'DANGER';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className={`text-6xl font-mono font-bold ${getSpeedColor()} ${isAnimating ? 'animate-pulse' : ''}`}>
          {Math.round(currentSpeed)}
        </div>
        <div className="text-purple-300 text-xl font-medium">MPH</div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-purple-300">Speed Status</span>
          <span className={`font-bold ${getSpeedColor()}`}>{getSpeedStatus()}</span>
        </div>
        
        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out ${
              speedPercentage < 33 ? 'bg-gradient-to-r from-green-500 to-green-400' :
              speedPercentage < 66 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
              'bg-gradient-to-r from-red-500 to-red-400'
            }`}
            style={{ width: `${speedPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-purple-400">
          <span>0</span>
          <span>{Math.round(maxSpeed / 2)}</span>
          <span>{maxSpeed}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-black/60 rounded-lg p-3">
          <div className="text-purple-400">Acceleration</div>
          <div className="text-white font-mono">{isAnimating ? '•••' : '---'}</div>
        </div>
        <div className="bg-black/60 rounded-lg p-3">
          <div className="text-purple-400">RPM</div>
          <div className="text-white font-mono">{Math.round(currentSpeed * 45)}</div>
        </div>
      </div>
    </div>
  );
};

export default SpeedDisplay;
