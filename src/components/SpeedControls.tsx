
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Play, Square, Zap, Gauge } from 'lucide-react';

interface SpeedControlsProps {
  currentSpeed: number;
  onSpeedChange: (speed: number) => void;
  onAccelerate: () => void;
  onDecelerate: () => void;
  maxSpeed: number;
  onMaxSpeedChange: (maxSpeed: number) => void;
}

const SpeedControls = ({ 
  currentSpeed, 
  onSpeedChange, 
  onAccelerate, 
  onDecelerate,
  maxSpeed,
  onMaxSpeedChange
}: SpeedControlsProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-black/60 border-purple-800/30 p-6">
        <h3 className="text-purple-300 font-semibold mb-4 flex items-center gap-2">
          <Gauge className="w-5 h-5" />
          Manual Speed Control
        </h3>
        
        <div className="space-y-4">
          <Slider
            value={[currentSpeed]}
            onValueChange={(value) => onSpeedChange(value[0])}
            max={maxSpeed}
            step={1}
            className="w-full"
          />
          
          <div className="flex justify-between text-sm text-purple-400">
            <span>Current: {Math.round(currentSpeed)} mph</span>
            <span>Max: {maxSpeed} mph</span>
          </div>
        </div>
      </Card>

      <Card className="bg-black/60 border-purple-800/30 p-6">
        <h3 className="text-purple-300 font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={onAccelerate}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3"
          >
            <Play className="w-4 h-4 mr-2" />
            Accelerate
          </Button>
          
          <Button 
            onClick={onDecelerate}
            variant="outline"
            className="border-purple-600 text-purple-300 hover:bg-purple-600/10 font-semibold py-3"
          >
            <Square className="w-4 h-4 mr-2" />
            Brake
          </Button>
        </div>
      </Card>

      <Card className="bg-black/60 border-purple-800/30 p-6">
        <h3 className="text-purple-300 font-semibold mb-4">Max Speed Setting</h3>
        
        <div className="space-y-4">
          <Slider
            value={[maxSpeed]}
            onValueChange={(value) => onMaxSpeedChange(value[0])}
            min={100}
            max={300}
            step={10}
            className="w-full"
          />
          
          <div className="flex justify-between text-sm text-purple-400">
            <span>100 mph</span>
            <span>{maxSpeed} mph</span>
            <span>300 mph</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={() => onSpeedChange(0)}
          className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
        >
          0 mph
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={() => onSpeedChange(maxSpeed / 2)}
          className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
        >
          {maxSpeed / 2} mph
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={() => onSpeedChange(maxSpeed)}
          className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
        >
          Max
        </Button>
      </div>
    </div>
  );
};

export default SpeedControls;
