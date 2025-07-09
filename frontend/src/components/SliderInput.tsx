import React, { useState } from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  className?: string;
}

export const SliderInput: React.FC<SliderInputProps> = ({
  label,
  value,
  onChange,
  min = 1,
  max = 5,
  step = 1,
  description,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const getImportanceText = (val: number) => {
    const labels = ['Not Important', 'Slightly Important', 'Moderately Important', 'Very Important', 'Extremely Important'];
    return labels[val - 1] || '';
  };

  const getEmoji = (val: number) => {
    const emojis = ['😐', '🙂', '😊', '😍', '🤩'];
    return emojis[val - 1] || '';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
          <span>{label}</span>
          <span className="text-lg transition-transform duration-200 hover:scale-125">
            {getEmoji(value)}
          </span>
        </label>
        <div className={`text-sm font-medium transition-all duration-300 ${
          isDragging ? 'text-blue-600 scale-110' : 'text-blue-600'
        }`}>
          {getImportanceText(value)}
        </div>
      </div>
      
      {description && (
        <p className="text-xs text-gray-500 animate-fade-in">{description}</p>
      )}
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className={`w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ${
            isHovered || isDragging ? 'h-4' : 'h-3'
          }`}
          style={{
            background: `linear-gradient(to right, 
              #3b82f6 0%, 
              #3b82f6 ${((value - min) / (max - min)) * 100}%, 
              #e5e7eb ${((value - min) / (max - min)) * 100}%, 
              #e5e7eb 100%)`
          }}
        />
        
        {/* Custom thumb indicator */}
        <div 
          className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-600 rounded-full shadow-lg transition-all duration-300 pointer-events-none ${
            isDragging ? 'scale-125 shadow-xl' : isHovered ? 'scale-110' : ''
          }`}
          style={{ 
            left: `calc(${((value - min) / (max - min)) * 100}% - 12px)`,
          }}
        >
          <div className="absolute inset-0 bg-white rounded-full scale-50 opacity-80"></div>
        </div>
        
        {/* Value indicator */}
        {(isHovered || isDragging) && (
          <div 
            className="absolute -top-10 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium animate-bounce-in"
            style={{ 
              left: `${((value - min) / (max - min)) * 100}%`,
            }}
          >
            {value}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-blue-600"></div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between text-xs text-gray-400">
        <span className="flex items-center space-x-1">
          <span>😐</span>
          <span>Not Important</span>
        </span>
        <span className="flex items-center space-x-1">
          <span>🤩</span>
          <span>Extremely Important</span>
        </span>
      </div>
    </div>
  );
};