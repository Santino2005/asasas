'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPATIAL_QUESTIONS, SpatialQuestion } from '@/lib/assessment-data';

interface SpatialInteractionProps {
  questionIndex: number;
  onComplete: (cornerKey: string) => void;
  isLoading?: boolean;
}

export default function SpatialInteraction({
  questionIndex,
  onComplete,
  isLoading = false,
}: SpatialInteractionProps) {
  const question = SPATIAL_QUESTIONS[questionIndex];
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCorner, setSelectedCorner] = useState<string | null>(null);
  const [hoveredCorner, setHoveredCorner] = useState<string | null>(null);
  const [orbPosition, setOrbPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const corners = {
    topLeft: question.corners.topLeft,
    topRight: question.corners.topRight,
    bottomLeft: question.corners.bottomLeft,
    bottomRight: question.corners.bottomRight,
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (event: any, info: any) => {
    setOrbPosition({
      x: info.point.x - (containerRef.current?.getBoundingClientRect().left || 0),
      y: info.point.y - (containerRef.current?.getBoundingClientRect().top || 0),
    });

    // Detect which corner the orb is closest to
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = info.point.x - rect.left;
    const y = info.point.y - rect.top;

    // Calculate distances to each corner
    const distances = {
      topLeft: Math.sqrt(x * x + y * y),
      topRight: Math.sqrt((x - rect.width) ** 2 + y ** 2),
      bottomLeft: Math.sqrt(x ** 2 + (y - rect.height) ** 2),
      bottomRight: Math.sqrt((x - rect.width) ** 2 + (y - rect.height) ** 2),
    };

    // Find closest corner
    let closest: string | null = null;
    let minDistance = Infinity;

    Object.entries(distances).forEach(([corner, distance]) => {
      if (distance < minDistance) {
        minDistance = distance;
        closest = corner;
      }
    });

    // Set hovered only if within magnetic range (300px)
    if (minDistance < 300) {
      setHoveredCorner(closest);
    } else {
      setHoveredCorner(null);
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);

    if (hoveredCorner) {
      const cornerKey = Object.keys(corners)[Object.keys(corners).indexOf(hoveredCorner)] as keyof typeof corners;
      const corner = corners[cornerKey];
      setSelectedCorner(hoveredCorner);

      // Animate orb to corner
      setTimeout(() => {
        onComplete(corner.id);
      }, 600);
    } else {
      // Reset position if not dropped on corner
      setOrbPosition({ x: 0, y: 0 });
      setHoveredCorner(null);
    }
  };

  const CornerCard = ({
    corner,
    position,
    isHovered,
    isSelected,
  }: {
    corner: typeof corners.topLeft;
    position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    isHovered: boolean;
    isSelected: boolean;
  }) => {
    const positionClass = {
      topLeft: 'top-0 left-0',
      topRight: 'top-0 right-0',
      bottomLeft: 'bottom-0 left-0',
      bottomRight: 'bottom-0 right-0',
    }[position];

    const glowClass = {
      topLeft: 'hover:shadow-[0_0_40px_rgba(147,51,234,0.6)]',
      topRight: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]',
      bottomLeft: 'hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]',
      bottomRight: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]',
    }[position];

    const borderGradient = {
      topLeft: 'from-purple-500/30 to-purple-500/10',
      topRight: 'from-blue-500/30 to-blue-500/10',
      bottomLeft: 'from-green-500/30 to-green-500/10',
      bottomRight: 'from-violet-500/30 to-violet-500/10',
    }[position];

    return (
      <motion.div
        className={`absolute ${positionClass} w-40 h-32 md:w-48 md:h-40`}
        onMouseEnter={() => setHoveredCorner(position)}
        onMouseLeave={() => setHoveredCorner(null)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: isHovered || isSelected ? 1.05 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`relative w-full h-full rounded-2xl border-2 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl ${borderGradient} transition-all duration-300 ${glowClass} ${
            isSelected ? 'ring-2 ring-white/50' : ''
          } cursor-pointer overflow-hidden`}
        >
          {/* Ambient glow */}
          {(isHovered || isSelected) && (
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${
                position === 'topLeft'
                  ? 'from-purple-500/20 to-transparent'
                  : position === 'topRight'
                  ? 'from-blue-500/20 to-transparent'
                  : position === 'bottomLeft'
                  ? 'from-green-500/20 to-transparent'
                  : 'from-violet-500/20 to-transparent'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
            <motion.h3
              className="text-lg md:text-2xl font-bold text-white mb-2"
              animate={{ scale: isHovered || isSelected ? 1.05 : 1 }}
            >
              {corner.label}
            </motion.h3>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              {corner.definition}
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-black overflow-hidden" ref={containerRef}>
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="absolute top-12 left-0 right-0 text-center z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-light text-white mb-2"
        >
          {question.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-sm md:text-base"
        >
          {question.subtitle}
        </motion.p>
      </div>

      {/* Corner Cards */}
      <div className="absolute inset-0 w-full h-full">
        <CornerCard
          corner={corners.topLeft}
          position="topLeft"
          isHovered={hoveredCorner === 'topLeft'}
          isSelected={selectedCorner === 'topLeft'}
        />
        <CornerCard
          corner={corners.topRight}
          position="topRight"
          isHovered={hoveredCorner === 'topRight'}
          isSelected={selectedCorner === 'topRight'}
        />
        <CornerCard
          corner={corners.bottomLeft}
          position="bottomLeft"
          isHovered={hoveredCorner === 'bottomLeft'}
          isSelected={selectedCorner === 'bottomLeft'}
        />
        <CornerCard
          corner={corners.bottomRight}
          position="bottomRight"
          isHovered={hoveredCorner === 'bottomRight'}
          isSelected={selectedCorner === 'bottomRight'}
        />
      </div>

      {/* Center VOS Orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 z-50"
        style={{ x: orbPosition.x, y: orbPosition.y }}
        drag
        dragElastic={0.2}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        initial={{ x: '-50%', y: '-50%' }}
        animate={selectedCorner ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <div className="relative w-20 h-20 md:w-28 md:h-28 cursor-grab active:cursor-grabbing">
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 blur-xl"
            animate={{
              scale: isDragging ? 1.2 : hoveredCorner ? 1.15 : 1,
              opacity: isDragging ? 0.8 : hoveredCorner ? 0.7 : 0.5,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />

          {/* Inner orb */}
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 shadow-2xl flex items-center justify-center text-white font-bold text-lg md:text-2xl"
            animate={{
              scale: isDragging ? 1.05 : 1,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <motion.div
              animate={{
                textShadow: isDragging
                  ? '0 0 20px rgba(168, 85, 247, 0.8)'
                  : hoveredCorner
                  ? '0 0 10px rgba(168, 85, 247, 0.6)'
                  : '0 0 5px rgba(168, 85, 247, 0.4)',
              }}
            >
              VOS
            </motion.div>
          </motion.div>

          {/* Breathing pulse */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-purple-400/30"
            animate={{
              scale: [0.8, 1.2],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </div>
      </motion.div>

      {/* Loading state */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-3 border-purple-500/20 border-t-purple-500 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
