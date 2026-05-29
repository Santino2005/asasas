'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/lib/store';
import { PURPLE_PHRASES } from '@/lib/assessment-data';
import { ChevronLeft, Trophy } from 'lucide-react';
import Link from 'next/link';

export function PodiumSelector() {
  const store = useAssessmentStore();
  const [podium, setPodium] = useState<string[]>(store.purplePodium.length > 0 ? store.purplePodium : []);
  const [selectedForSlot, setSelectedForSlot] = useState<string | null>(null);

  const selectedPhrases = PURPLE_PHRASES.filter((p) =>
    store.purplePhrasesSelected.includes(p.id)
  );

  const usedIds = podium.filter((id) => id !== '');
  const availablePhrases = selectedPhrases.filter((p) => !usedIds.includes(p.id));

  const handleSelectForSlot = (phraseId: string, slot: number) => {
    const newPodium = [...podium];
    newPodium[slot] = phraseId;
    setPodium(newPodium);
    setSelectedForSlot(null);
  };

  const handleClearSlot = (slot: number) => {
    const newPodium = [...podium];
    newPodium[slot] = '';
    setPodium(newPodium);
  };

  const handleContinue = () => {
    store.setPurplePodium(podium.filter((p) => p !== ''));
    store.setPurplePhase('complete');
  };

  const medals = ['🥇', '🥈', '🥉'];
  const labels = ['Oro', 'Plata', 'Bronce'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-black flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="w-full max-w-4xl mb-8">
        <Link
          href="/assessment/preferences/purple"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Atrás
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-purple-300 mt-4 mb-2 flex items-center gap-3">
          <Trophy className="w-8 h-8" />
          Podio Personaje
        </h1>
        <p className="text-purple-400/70 text-sm md:text-base">
          Ordena tus top 3 características seleccionadas. Puedes dejar espacios vacíos.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Podium Slots */}
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
                  podium[slot]
                    ? 'border-purple-400/50 glow-purple'
                    : 'border-purple-500/20 hover:border-purple-500/40'
                }`}
                onClick={() =>
                  setSelectedForSlot(
                    selectedForSlot === `slot-${slot}` ? null : `slot-${slot}`
                  )
                }
              >
                <div>
                  <div className="text-5xl mb-3">{medals[slot]}</div>
                  <div className="text-sm text-purple-400/50 uppercase tracking-widest">
                    {labels[slot]}
                  </div>
                </div>

                {podium[slot] ? (
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-purple-100 mb-3">
                      {PURPLE_PHRASES.find((p) => p.id === podium[slot])
                        ?.text}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearSlot(slot);
                      }}
                      className="text-xs text-purple-400/70 hover:text-purple-300 transition-colors"
                    >
                      Limpiar
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-purple-400/40 italic">
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
        <h2 className="text-lg font-semibold text-purple-300 mb-4">
          Disponibles ({availablePhrases.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <AnimatePresence>
            {availablePhrases.map((phrase, idx) => (
              <motion.div
                key={phrase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: idx * 0.02 }}
              >
                <div
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedForSlot?.startsWith('slot-')
                      ? 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20'
                      : 'bg-purple-500/5 border-purple-500/20 hover:bg-purple-500/10'
                  }`}
                >
                  <p className="text-purple-100 text-sm mb-3">{phrase.text}</p>
                  {selectedForSlot?.startsWith('slot-') && (
                    <button
                      onClick={() => {
                        const slot = parseInt(selectedForSlot.split('-')[1]);
                        handleSelectForSlot(phrase.id, slot);
                      }}
                      className="text-xs bg-purple-500/30 hover:bg-purple-500/50 text-purple-200 px-3 py-1 rounded transition-all"
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
        className="px-8 py-3 rounded-lg bg-gradient-purple text-white font-semibold hover:shadow-lg transition-all glow-purple"
      >
        Continuar
      </button>
    </div>
  );
}
