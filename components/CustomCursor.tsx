'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isPointerType, setIsPointerType] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handlePointerEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the element or its parent is clickable
      const isTargetClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer' ||
        (target.parentElement && window.getComputedStyle(target.parentElement).cursor === 'pointer');
      
      setIsClickable(isTargetClickable);
      setIsHovering(isTargetClickable);
      
      // Check pointer type cursor
      const computedStyle = window.getComputedStyle(target).cursor;
      setIsPointerType(computedStyle === 'pointer');
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handlePointerEvent);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handlePointerEvent);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // If cursor is outside the window, don't render
  if (isHidden) return null;

  return (
    <>
      {/* Hide the default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>

      {/* Custom cursor dot */}
      <motion.div
        className="hidden md:block fixed pointer-events-none z-[9999] rounded-full"
        style={{
          left: position.x,
          top: position.y,
          backgroundColor: '#000',
        }}
        animate={{
          width: isClickable ? 30 : 10,
          height: isClickable ? 30 : 10,
          x: isClickable ? -15 : -5,
          y: isClickable ? -15 : -5,
          opacity: 0.7,
        }}
        transition={{
          type: "spring",
          stiffness: 600, 
          damping: 30,
          mass: 0.5
        }}
      />

      {/* Cursor ring - only visible on hoverable elements */}
      {isPointerType && (
        <motion.div
          className="hidden md:block fixed pointer-events-none z-[9999] rounded-full"
          style={{
            left: position.x,
            top: position.y,
            border: '1px solid black',
            backgroundColor: 'transparent',
          }}
          animate={{
            width: 25,
            height: 25,
            x: -12.5,
            y: -12.5,
            opacity: isHovering ? 0.6 : 0,
            scale: isHovering ? 1.1 : 1
          }}
          transition={{
            type: "spring",
            stiffness: 400, 
            damping: 25
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
