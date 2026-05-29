'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { YELLOW_SLIDES } from '@/lib/assessment-data';
import { useAssessmentStore } from '@/lib/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function YellowMode() {
  const store = useAssessmentStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slide = YELLOW_SLIDES[currentSlide];
  const currentSelections = store.yellowSelectionsPerSlide[currentSlide] || [];

  const handleToggleOption = (optionId: string) => {
    const isSelected = currentSelections.includes(optionId);
    const newSelections = isSelected
      ? currentSelections.filter((id) => id !== optionId)
      : [...currentSelections, optionId];
    store.setYellowSelectionsPerSlide(currentSlide, newSelections);
  };

  const handleNext = () => {
    if (currentSlide < YELLOW_SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    } else {
      store.setYellowPhase('refinement');
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const progress = ((currentSlide + 1) / YELLOW_SLIDES.length) * 100;
  const allSelections = Object.values(store.yellowSelectionsPerSlide).flat();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-950 via-black to-black flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="w-full max-w-3xl mb-8">
        <Link
          href="/assessment/preferences"
          className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Atrás
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 mt-4 mb-2">
          Diapositivas Cognitivas
        </h1>
        <p className="text-yellow-400/70 text-sm md:text-base">
          Selecciona todas las opciones que te representen en cada pregunta
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-3xl mb-8 h-1 bg-yellow-950/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-yellow"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Slide Content */}
      <div className="w-full max-w-3xl mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{
              opacity: 0,
              x: direction > 0 ? 400 : -400,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: direction > 0 ? 400 : -400,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-semibold text-yellow-100 mb-8 text-center">
              {slide.question}
            </h2>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slide.options.map((option) => {
                const isSelected = currentSelections.includes(option.id);
                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleToggleOption(option.id)}
                    className={`assessment-card p-6 text-left transition-all cursor-pointer group ${
                      isSelected
                        ? 'border-yellow-400/60 glow-yellow bg-yellow-500/10'
                        : 'border-yellow-500/20 hover:border-yellow-500/40'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'bg-yellow-500/40 border-yellow-400'
                            : 'border-yellow-500/30 group-hover:border-yellow-500/50'
                        }`}
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-yellow-100 mb-2">
                          {option.title}
                        </h3>
                        <p className="text-yellow-400/70 text-sm leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="w-full max-w-3xl flex items-center justify-between gap-4 mb-8">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className="p-3 rounded-full border border-yellow-500/30 hover:border-yellow-500/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-yellow-400" />
        </button>

        <div className="text-center">
          <p className="text-yellow-400/70 text-sm">
            Pregunta {currentSlide + 1} de {YELLOW_SLIDES.length}
          </p>
          <p className="text-yellow-300 font-semibold mt-1">
            {currentSelections.length} seleccionadas
          </p>
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-gradient-yellow text-black hover:shadow-lg transition-all glow-yellow"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Stats */}
      <div className="text-center text-yellow-400/60 text-sm">
        <p>
          Total seleccionadas:{' '}
          <span className="text-yellow-300 font-semibold">{allSelections.length}</span>
        </p>
      </div>
    </div>
  );
}
