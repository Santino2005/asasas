'use client';

import Link from 'next/link';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { QUADRANTS, type Quadrant } from '@/lib/hbdi-modules';
import { useHbdiAssessmentStore } from '@/lib/store';

const quadrantOrder: Quadrant[] = ['A', 'B', 'C', 'D'];

export default function ResultsPage() {
  const store = useHbdiAssessmentStore();
  const results = store.calculateHbdiResults();
  const dominant = QUADRANTS[results.dominant];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-black px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href="/assessment" className="inline-flex items-center text-purple-300 hover:text-purple-200">
            <ChevronLeft className="mr-2 h-5 w-5" /> Volver al test
          </Link>
          <button onClick={store.resetHbdi} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/10">
            <RotateCcw className="h-4 w-4" /> Reiniciar respuestas
          </button>
        </div>

        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-purple-300">Resultado final</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">Tu dominancia predominante es</h1>
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className={`mx-auto mb-4 h-5 w-28 rounded-full ${dominant.color}`} />
            <h2 className="text-3xl font-bold text-white">{dominant.name}</h2>
            <p className="mt-2 text-xl text-gray-200">{dominant.label}</p>
            <p className="mt-4 text-gray-400">{dominant.description}</p>
          </div>
        </motion.header>

        <section className="assessment-card p-6 md:p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white">Gráfico de dominancias cerebrales</h3>
            <p className="mt-2 text-gray-400">Porcentaje de representación de cada cuadrante según tus respuestas en los 3 módulos.</p>
          </div>

          <div className="space-y-6">
            {quadrantOrder.map((quadrant) => {
              const data = QUADRANTS[quadrant];
              const percentage = results.percentages[quadrant];
              return (
                <div key={quadrant}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{data.name}</p>
                      <p className="text-sm text-gray-400">{data.label}</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{percentage}%</p>
                  </div>
                  <div className="h-5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8 }}
                      className={`h-full rounded-full ${data.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          {quadrantOrder.map((quadrant) => {
            const data = QUADRANTS[quadrant];
            return (
              <div key={quadrant} className={`rounded-2xl border p-5 ${results.dominant === quadrant ? 'border-white/40 bg-white/10' : 'border-white/10 bg-white/5'}`}>
                <div className={`mb-3 h-3 w-14 rounded-full ${data.color}`} />
                <h4 className="font-bold text-white">{data.name}</h4>
                <p className="mt-2 text-sm text-gray-400">{data.description}</p>
              </div>
            );
          })}
        </section>

        <div className="mt-10 text-center">
          <Link href="/assessment" className="inline-flex rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-7 py-3 font-semibold text-white hover:shadow-xl">
            Rehacer evaluación
          </Link>
        </div>
      </div>
    </div>
  );
}
