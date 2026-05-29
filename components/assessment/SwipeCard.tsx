'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/lib/store';
import { CardData } from '@/lib/types';
import { ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { useState } from 'react';

interface SwipeCardProps {
  card: CardData;
  onSwipe: (direction: 'left' | 'right') => void;
  cardIndex: number;
  totalCards: number;
}

export default function SwipeCard({ card, onSwipe, cardIndex, totalCards }: SwipeCardProps) {
  const [rotation, setRotation] = useState(0);
  const [xOffset, setXOffset] = useState(0);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;

    // Safely access the offset with fallback
    const xOffset = info?.offset?.x ?? 0;

    if (xOffset > swipeThreshold) {
      onSwipe('right');
    } else if (xOffset < -swipeThreshold) {
      onSwipe('left');
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-950 via-black to-black flex flex-col items-center justify-center px-4 md:px-0">
      {/* Atmospheric gradient - purple based */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Progress indicator */}
      <div className="absolute top-8 left-8 flex items-center gap-2 z-20">
        <div className="flex gap-1">
          {Array.from({ length: totalCards }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i < cardIndex ? 'w-8 bg-purple-500' : i === cardIndex ? 'w-8 bg-purple-400' : 'w-2 bg-gray-700'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-2">
          {cardIndex + 1}/{totalCards}
        </span>
      </div>

      {/* Main card */}
      <motion.div
        drag="x"
        dragElastic={0.2}
        dragConstraints={{ left: -100, right: 100 }}
        onDragEnd={handleDragEnd}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md mb-16 cursor-grab active:cursor-grabbing"
      >
        <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-8 md:p-12 shadow-2xl">
          {/* Card glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-transparent pointer-events-none" />

          {/* Card content */}
          <div className="relative z-10">
            <p className="text-xl md:text-2xl font-light text-white leading-relaxed text-pretty">
              {card.text}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Swipe indicators */}
      <div className="absolute bottom-32 left-0 right-0 flex justify-between px-6 md:px-12 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.5, x: 0 }}
          className="flex flex-col items-center gap-2"
        >
          <X className="w-8 h-8 text-red-500" />
          <span className="text-sm text-red-500 font-medium">No me representa</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.5, x: 0 }}
          className="flex flex-col items-center gap-2"
        >
          <Check className="w-8 h-8 text-green-500" />
          <span className="text-sm text-green-500 font-medium">Me representa</span>
        </motion.div>
      </div>

      {/* Button controls */}
      <div className="absolute bottom-6 md:bottom-12 left-0 right-0 flex justify-center gap-4 z-20">
        <motion.button
          onClick={() => onSwipe('left')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-full bg-red-500/20 border border-red-500/50 text-red-500 hover:bg-red-500/30 hover:border-red-500 transition-all"
        >
          <X className="w-6 h-6" />
        </motion.button>

        <motion.button
          onClick={() => onSwipe('right')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-full bg-green-500/20 border border-green-500/50 text-green-500 hover:bg-green-500/30 hover:border-green-500 transition-all"
        >
          <Check className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}
