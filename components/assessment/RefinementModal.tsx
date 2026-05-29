'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/lib/store';
import { YELLOW_SLIDES } from '@/lib/assessment-data';
import { ChevronLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function RefinementModal() {
  const store = useAssessmentStore();
  const [refinement, setRefinement] = useState<string[]>(
    store.yellowFinalRefinement.length > 0 ? store.yellowFinalRefinement : []
  );
  const [selectedForSlot, setSelectedForSlot] = useState<string | null>(null);

  // Get all selected options from all slides
  const allSelections = Object.values(store.yellowSelectionsPerSlide).flat();
  const selectedOptions = YELLOW_SLIDES.flatMap((slide) =>
    slide.options.filter((opt) => allSelections.includes(opt.id))
  );

  const usedIds = refinement.filter((id) => id !== '');
  const availableOptions = selectedOptions.filter((opt) => !usedIds.includes(opt.id));

  const handleSelectForSlot = (optionId: string, slot: number) => {
    const newRefinement = [...refinement];
    newRefinement[slot] = optionId;
    setRefinement(newRefinement);
    setSelectedForSlot(null);
  };

  const handleClearSlot = (slot: number) => {
    const newRefinement = [...refinement];
    newRefinement[slot] = '';
    setRefinement(newRefinement);
  };

  const handleContinue = () => {
    store.setYellowFinalRefinement(refinement.filter((p) => p !== ''));
    store.setYellowPhase('complete');
  };

  const medals = ['🥇', '🥈', '🥉'];
  const labels = ['Top 1', 'Top 2', 'Top 3'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-950 via-black to-black flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="w-full max-w-4xl mb-8">
        <Link
          href="/assessment/preferences/yellow"
          className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Atrás
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 mt-4 mb-2 flex items-center gap-3">
          <Sparkles className="w-8 h-8" />
          Refinamiento
        </h1>
        <p className="text-yellow-400/70 text-sm md:text-base">
          De todas tus selecciones, ¿cuáles son tus TOP 3? Puedes dejar espacios vacíos.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Refinement Slots */}
        {[0, 1, 2].map((slot) => (
          <div key={slot} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: slot * 0.1 }}
              className="relative w-full mb-4"
            >
              <div
                className={`assessment-card p-6 text-center min-h-48 flex flex-col justify-between cursor-pointer transition-all ${
                  refinement[slot]
                    ? 'border-yellow-400/50 glow-yellow'
                    : 'border-yellow-500/20 hover:border-yellow-500/40'
                }`}
                onClick={() =>
                  setSelectedForSlot(
                    selectedForSlot === `slot-${slot}` ? null : `slot-${slot}`
                  )
                }
              >
                <div>
                  <div className="text-5xl mb-3">{medals[slot]}</div>
                  <div className="text-sm text-yellow-400/50 uppercase tracking-widest">
                    {labels[slot]}
                  </div>
                </div>

                {refinement[slot] ? (
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-yellow-100 mb-1">
                      {
                        selectedOptions.find((o) => o.id === refinement[slot])
                          ?.title
                      }
                    </p>
                    <p className="text-xs text-yellow-400/60 mb-3">
                      {
                        selectedOptions.find((o) => o.id === refinement[slot])
                          ?.description
                      }
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearSlot(slot);
                      }}
                      className="text-xs text-yellow-400/70 hover:text-yellow-300 transition-colors"
                    >
                      Limpiar
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-yellow-400/40 italic">
                    Haz clic para seleccionar
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Available Selections */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-lg font-semibold text-yellow-300 mb-4">
          Disponibles ({availableOptions.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {availableOptions.map((option, idx) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: idx * 0.02 }}
              >
                <div
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedForSlot?.startsWith('slot-')
                      ? 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20'
                      : 'bg-yellow-500/5 border-yellow-500/20 hover:bg-yellow-500/10'
                  }`}
                >
                  <p className="text-yellow-100 text-sm font-semibold mb-1">
                    {option.title}
                  </p>
                  <p className="text-yellow-400/60 text-xs mb-3">
                    {option.description}
                  </p>
                  {selectedForSlot?.startsWith('slot-') && (
                    <button
                      onClick={() => {
                        const slot = parseInt(selectedForSlot.split('-')[1]);
                        handleSelectForSlot(option.id, slot);
                      }}
                      className="text-xs bg-yellow-500/30 hover:bg-yellow-500/50 text-yellow-200 px-3 py-1 rounded transition-all"
                    >
                      Asignar al {labels[parseInt(selectedForSlot.split('-')[1])].toLowerCase()}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="px-8 py-3 rounded-lg bg-gradient-yellow text-black font-semibold hover:shadow-lg transition-all glow-yellow"
      >
        Continuar
      </button>
    </div>
  );
}
