'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '@/lib/store';
import { PREFERENCE_CARDS, CONTEXT_SCREENS, getCardsByGroup } from '@/lib/assessment-data';
import { Phase } from '@/lib/types';
import ContextScreen from '@/components/assessment/ContextScreen';
import SwipeCard from '@/components/assessment/SwipeCard';
import RefinementStage from '@/components/assessment/RefinementStage';
import { ChevronLeft } from 'lucide-react';
import { useEffect } from 'react';

export default function PreferencesPage() {
  const router = useRouter();
  const store = useAssessmentStore();
  const { currentPhase, currentCardIndexInGroup, cardSelections } = store;

  // Handle phase transitions
  const handleContextContinue = () => {
    if (currentPhase === 'context1') {
      store.moveToPhase('group1');
    } else if (currentPhase === 'context2') {
      store.moveToPhase('group2');
    } else if (currentPhase === 'context3') {
      store.moveToPhase('group3');
    }
  };

  const handleCardSwipe = (direction: 'left' | 'right') => {
    const group = currentPhase === 'group1' ? 1 : currentPhase === 'group2' ? 2 : 3;
    const cards = getCardsByGroup(group as 1 | 2 | 3);
    const currentCard = cards[currentCardIndexInGroup];

    // Record selection if right swipe (me representa)
    if (direction === 'right') {
      store.selectCard(currentCard.id, true);
    }

    // Move to next card or phase
    store.goToNextCard();
  };

  const handleTransitionContinue = () => {
    if (currentPhase === 'transition2') {
      store.moveToPhase('context2');
    } else if (currentPhase === 'transition3') {
      store.moveToPhase('context3');
    }
  };

  // Get selected cards for refinement
  const selectedCardIds = store.getSelectedCards();
  const selectedCards = PREFERENCE_CARDS.filter(card => selectedCardIds.includes(card.id));

  const handleRefinementComplete = () => {
    store.moveToPhase('complete');
    // Navigate to results page after a brief delay for animation
    setTimeout(() => {
      router.push('/results');
    }, 500);
  };

  return (
    <AnimatePresence mode="wait">
      {/* Context Screens */}
      {(currentPhase === 'context1' || currentPhase === 'context2' || currentPhase === 'context3') && (
        <ContextScreen
          key={currentPhase}
          phase={currentPhase}
          onContinue={handleContextContinue}
        />
      )}

      {/* Card Swipe Stages */}
      {(currentPhase === 'group1' || currentPhase === 'group2' || currentPhase === 'group3') && (
        <motion.div key={currentPhase}>
          {(() => {
            const group = currentPhase === 'group1' ? 1 : currentPhase === 'group2' ? 2 : 3;
            const cards = getCardsByGroup(group as 1 | 2 | 3);
            const currentCard = cards[currentCardIndexInGroup];

            return (
              <SwipeCard
                card={currentCard}
                onSwipe={handleCardSwipe}
                cardIndex={currentCardIndexInGroup}
                totalCards={cards.length}
              />
            );
          })()}
        </motion.div>
      )}

      {/* Transition Screens */}
      {(currentPhase === 'transition2' || currentPhase === 'transition3') && (
        <motion.div
          key={currentPhase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative"
        >
          {/* Atmospheric gradient */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          </div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center max-w-xl"
          >
            <div className="mb-6 text-5xl">✨</div>
            <h2 className="text-4xl font-light text-white mb-4">
              Excelente progreso
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              {currentPhase === 'transition2'
                ? 'Completaste el primer grupo. Preparémonos para el siguiente.'
                : 'Casi terminamos. Un último grupo para completar tu perfil.'}
            </p>

            <motion.button
              onClick={handleTransitionContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Continuar
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Refinement Stage */}
      {currentPhase === 'refinement' && (
        <RefinementStage
          key="refinement"
          selectedCards={selectedCards}
          onComplete={handleRefinementComplete}
        />
      )}

      {/* Complete Screen */}
      {currentPhase === 'complete' && (
        <motion.div
          key="complete"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-black flex flex-col items-center justify-center px-4"
        >
          {/* Celebration gradient */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center max-w-xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="mb-6 text-6xl inline-block"
            >
              🎉
            </motion.div>

            <h1 className="text-5xl font-light text-white mb-4">
              ¡Evaluación Completada!
            </h1>

            <p className="text-lg text-gray-400 mb-8">
              Hemos capturado tu perfil de preferencias cognitivas. Tus resultados están siendo procesados.
            </p>

            <motion.button
              onClick={() => router.push('/assessment')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Ver Resultados
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
