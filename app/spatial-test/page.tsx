'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import SpatialInteraction from '@/components/assessment/SpatialInteraction';

export default function SpatialPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleSelection = (cornerId: string) => {
    setSelections([...selections, cornerId]);

    if (currentQuestion < 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 800);
    } else {
      setTimeout(() => {
        setCompleted(true);
      }, 800);
    }
  };

  return (
    <div>
      {!completed ? (
        <SpatialInteraction questionIndex={currentQuestion} onComplete={handleSelection} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-black flex flex-col items-center justify-center px-4"
        >
          {/* Back button */}
          <Link
            href="/assessment"
            className="absolute top-8 left-8 inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Volver
          </Link>

          {/* Completion screen */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 text-center max-w-xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="mb-8 text-6xl inline-block"
            >
              ✨
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Interacción Espacial Completada
            </h1>

            <div className="space-y-4 mb-8 text-left">
              {selections.map((selection, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20"
                >
                  <p className="text-gray-300">
                    <span className="font-semibold text-purple-300">Pregunta {idx + 1}:</span> {selection}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="text-gray-400 mb-8">
              Tu experiencia de interacción espacial ha sido capturada. Este es un ejemplo de interfaz premium para evaluaciones cognitivas.
            </p>

            <Link
              href="/assessment"
              className="inline-flex px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Volver a Evaluación
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
