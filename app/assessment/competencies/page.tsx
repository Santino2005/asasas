'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Lock } from 'lucide-react';

export default function CompetenciesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-black flex flex-col items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Back button */}
      <div className="absolute top-8 left-8">
        <Link
          href="/assessment"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Volver
        </Link>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-xl"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-block"
        >
          <div className="p-4 rounded-full bg-blue-500/20 border border-blue-500/40">
            <Lock className="w-12 h-12 text-blue-400" />
          </div>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
          Módulo de Competencias
        </h1>

        <p className="text-lg text-gray-400 mb-6">
          Este módulo está siendo preparado. En futuras versiones, explora escenarios conductuales y situaciones complejas para evaluar tus competencias interpersonales y de liderazgo.
        </p>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mb-8">
          <p className="text-blue-300 text-sm">
            Por ahora, enfócate en completar el módulo de Preferencias Cognitivas para obtener tu perfil base.
          </p>
        </div>

        <Link
          href="/assessment"
          className="inline-flex px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          Volver a Evaluación
        </Link>
      </motion.div>
    </div>
  );
}
