'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PURPLE_PHRASES } from '@/lib/assessment-data';
import { useAssessmentStore } from '@/lib/store';
import { ChevronLeft, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

export function PurpleMode() {
  const store = useAssessmentStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showActions, setShowActions] = useState(true);

  const current = PURPLE_PHRASES[currentIndex];
  const isSelected = store.purplePhrasesSelected.includes(current.id);

  const handleSwipe = (accepted: boolean) => {
    setShowActions(false);
    setDirection(accepted ? 1 : -1);

    setTimeout(() => {
      if (accepted) {
        store.addPurpleSelection(current.id);
      }

      if (currentIndex < PURPLE_PHRASES.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowActions(true);
      } else {
        // Check if 3+ selected to show podium
        if (store.purplePhrasesSelected.length >= 3) {
          store.setPurplePhase('podium');
        } else {
          store.setPurplePhase('complete');
        }
      }
    }, 300);
  };

  const handleSkip = () => {
    setShowActions(false);
    setDirection(-1);

    setTimeout(() => {
      if (currentIndex < PURPLE_PHRASES.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowActions(true);
      } else {
        if (store.purplePhrasesSelected.length >= 3) {
          store.setPurplePhase('podium');
        } else {
          store.setPurplePhase('complete');
        }
      }
    }, 300);
  };

  const progress = ((currentIndex + 1) / PURPLE_PHRASES.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-black flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="w-full max-w-2xl mb-8">
        <Link
          href="/assessment/preferences"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Atrás
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-purple-300 mt-4 mb-2">
          Resonancia Púrpura
        </h1>
        <p className="text-purple-400/70 text-sm md:text-base">
          Desliza derecha o izquierda para indicar si te representa
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-8 h-1 bg-purple-950/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-purple"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Card Stack */}
      <div className="relative w-full max-w-md h-96 mb-12">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{
                opacity: 0,
                x: direction > 0 ? 400 : -400,
                rotateZ: direction > 0 ? 20 : -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotateZ: 0,
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? 400 : -400,
                rotateZ: direction > 0 ? 20 : -20,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <div className="assessment-card h-full flex flex-col justify-center items-center text-center p-8 glow-purple group cursor-grab active:cursor-grabbing">
                <div className="text-5xl md:text-6xl mb-6 text-purple-300">💭</div>
                <p className="text-xl md:text-2xl font-semibold text-purple-100 leading-relaxed">
                  {current.text}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-2xl flex gap-4 justify-center mb-8">
        {showActions && (
          <>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => handleSwipe(false)}
              className="p-4 rounded-full bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-all group"
            >
              <XCircle className="w-8 h-8 text-red-400 group-hover:text-red-300" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => handleSkip()}
              className="px-6 py-3 rounded-lg bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 transition-all text-purple-300 font-medium"
            >
              Saltar
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => handleSwipe(true)}
              className="p-4 rounded-full bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 transition-all group"
            >
              <CheckCircle2 className="w-8 h-8 text-green-400 group-hover:text-green-300" />
            </motion.button>
          </>
        )}
      </div>

      {/* Stats */}
      <div className="text-center text-purple-400/60 text-sm">
        <p>
          {currentIndex + 1} de {PURPLE_PHRASES.length} • Seleccionadas:{' '}
          <span className="text-purple-300 font-semibold">
            {store.purplePhrasesSelected.length}
          </span>
        </p>
      </div>
    </div>
  );
}
