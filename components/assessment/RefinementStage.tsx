'use client';

import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/lib/store';
import { CardData } from '@/lib/types';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface RefinementStageProps {
  selectedCards: CardData[];
  onComplete: () => void;
}

export default function RefinementStage({ selectedCards, onComplete }: RefinementStageProps) {
  const store = useAssessmentStore();
  const [ranking, setRanking] = useState<string[]>(store.refinementRanking);

  const moveUp = (index: number) => {
    if (index > 0) {
      const newRanking = [...ranking];
      [newRanking[index], newRanking[index - 1]] = [newRanking[index - 1], newRanking[index]];
      setRanking(newRanking);
    }
  };

  const moveDown = (index: number) => {
    if (index < ranking.length - 1) {
      const newRanking = [...ranking];
      [newRanking[index], newRanking[index + 1]] = [newRanking[index + 1], newRanking[index]];
      setRanking(newRanking);
    }
  };

  const toggleInRanking = (cardId: string) => {
    if (ranking.includes(cardId)) {
      setRanking(ranking.filter(id => id !== cardId));
    } else if (ranking.length < 3) {
      setRanking([...ranking, cardId]);
    }
  };

  const handleComplete = () => {
    store.setRefinementRanking(ranking);
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-black px-4 py-12 flex flex-col"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Tus Situaciones Más Representativas
          </h1>
          <p className="text-lg text-gray-400">
            De todas las situaciones que sentiste cercanas a vos, ¿cuáles representan más profundamente tu forma de pensar?
          </p>
        </motion.div>

        {/* Instructions */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-500 text-center mb-8"
        >
          Selecciona hasta 3 situaciones. Puedes reordenarlas por importancia.
        </motion.p>

        {/* Main layout - flex with selected on left, available on right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Selected rankings */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/40 border border-purple-500/20 rounded-2xl p-6"
          >
            <h2 className="text-lg font-medium text-purple-300 mb-4">Tu Podio</h2>
            {ranking.length === 0 ? (
              <p className="text-gray-500 text-sm py-8 text-center">Selecciona situaciones para crear tu podio</p>
            ) : (
              <div className="space-y-3">
                {ranking.map((cardId, index) => {
                  const card = selectedCards.find(c => c.id === cardId);
                  return (
                    <motion.div
                      key={cardId}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-black/50 border border-purple-500/40 rounded-lg p-4 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-2xl font-bold text-purple-400 w-8 flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-white text-sm flex-1 leading-relaxed">{card?.text}</p>
                        <div className="flex gap-1 flex-shrink-0">
                          <button
                            onClick={() => moveUp(index)}
                            disabled={index === 0}
                            className="p-1 hover:bg-purple-500/20 rounded disabled:opacity-30"
                          >
                            <ChevronUp className="w-4 h-4 text-purple-400" />
                          </button>
                          <button
                            onClick={() => moveDown(index)}
                            disabled={index === ranking.length - 1}
                            className="p-1 hover:bg-purple-500/20 rounded disabled:opacity-30"
                          >
                            <ChevronDown className="w-4 h-4 text-purple-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Available selections */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/40 border border-purple-500/20 rounded-2xl p-6"
          >
            <h2 className="text-lg font-medium text-purple-300 mb-4">Todas Tus Selecciones</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {selectedCards.map((card) => {
                const isSelected = ranking.includes(card.id);
                return (
                  <motion.button
                    key={card.id}
                    onClick={() => toggleInRanking(card.id)}
                    whileHover={{ scale: 1.02 }}
                    className={`w-full text-left p-3 rounded-lg transition-all border ${
                      isSelected
                        ? 'bg-purple-500/20 border-purple-500/60 text-white'
                        : 'bg-black/30 border-gray-700/50 text-gray-400 hover:bg-gray-800/40'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{card.text}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Complete button */}
        <motion.button
          onClick={handleComplete}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          Completar Evaluación
        </motion.button>
      </div>
    </motion.div>
  );
}
