'use client';

import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/lib/store';
import { CONTEXT_SCREENS } from '@/lib/assessment-data';
import { Phase } from '@/lib/types';

interface ContextScreenProps {
  phase: 'context1' | 'context2' | 'context3';
  onContinue: () => void;
}

export default function ContextScreen({ phase, onContinue }: ContextScreenProps) {
  const context = CONTEXT_SCREENS[phase];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Atmospheric gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 max-w-3xl text-center"
      >
        {/* Message */}
        <h1 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-6">
          {context.message}
        </h1>

        {/* Subtitle */}
        {context.subtitle && (
          <p className="text-xl text-gray-400 font-light mb-12 leading-relaxed">
            {context.subtitle}
          </p>
        )}

        {/* Continue button */}
        <motion.button
          onClick={onContinue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          Continuar
        </motion.button>
      </motion.div>

      {/* Bottom indicator */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 text-gray-500 text-sm"
      >
        ↓ Presiona continuar cuando estés listo
      </motion.div>
    </motion.div>
  );
}
