import React, { useEffect, useRef } from 'react';
import { GeistMono } from 'geist/font/mono';

interface TimeDisplayProps {
  className?: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ className }) => {
  const timeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    // Update the time display without re-rendering the component
    const updateTime = () => {
      if (timeRef.current) {
        const now = new Date();
        timeRef.current.textContent = `[ ${now.toLocaleString()} ]`;
      }
    };
    
    // Call immediately and then set interval
    updateTime();
    
    // Update once per minute instead of every second
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={className}>
      <span 
        ref={timeRef} 
        className={`${GeistMono.className}`}
      >
        [ Loading... ]
      </span>
    </div>
  );
};

export default TimeDisplay;