'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Brain } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-black flex flex-col items-center justify-center px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-2xl"
      >
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-lg opacity-50" />
            <div className="relative bg-black p-6 rounded-2xl">
              <Brain className="w-16 h-16 text-purple-400" />
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          Evaluación de{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Dominio Cognitivo
          </span>
        </h1>

        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
          Descubre tu perfil cognitivo completo con evaluaciones interactivas basadas en el
          Modelo de Cerebro Integral de Ned Herrmann.
        </p>

        <div className="space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 text-gray-300"
          >
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span>Preferencias Cognitivas</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 text-gray-300"
          >
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <span>Estilos de Pensamiento</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 text-gray-300"
          >
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span>Competencias Conductuales</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/assessment"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:shadow-2xl transition-all group"
          >
            Comenzar Evaluación
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 text-center text-gray-500 text-sm"
      >
        <p>Basado en el Modelo de Cerebro Integral de Ned Herrmann</p>
      </motion.div>
    </div>
  );
}
