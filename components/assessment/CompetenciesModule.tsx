'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPETENCY_SCENARIOS } from '@/lib/assessment-data';
import { useAssessmentStore } from '@/lib/store';
import { ChevronLeft, ChevronRight, GripVertical } from 'lucide-react';
import Link from 'next/link';

export function CompetenciesModule() {
  const store = useAssessmentStore();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [direction, setDirection] = useState(0);

  const scenario = COMPETENCY_SCENARIOS[currentScenario];
  const currentOrder =
    (store.competenciesSelections[scenario.id] as string[]) || [];

  const handleReorderItem = (fromIndex: number, toIndex: number) => {
    if (currentOrder.length === 0) {
      // Initialize with default order
      const newOrder = scenario.options.map((opt) => opt.id);
      const [movedItem] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, movedItem);
      store.setCompetenciesSelection(scenario.id, newOrder);
    } else {
      const newOrder = [...currentOrder];
      const [movedItem] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, movedItem);
      store.setCompetenciesSelection(scenario.id, newOrder);
    }
  };

  const displayOrder =
    currentOrder.length > 0
      ? currentOrder
      : scenario.options.map((opt) => opt.id);

  const handleNext = () => {
    if (currentScenario < COMPETENCY_SCENARIOS.length - 1) {
      setDirection(1);
      setCurrentScenario(currentScenario + 1);
    }
  };

  const handlePrev = () => {
    if (currentScenario > 0) {
      setDirection(-1);
      setCurrentScenario(currentScenario - 1);
    }
  };

  const progress = ((currentScenario + 1) / COMPETENCY_SCENARIOS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-black flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="w-full max-w-3xl mb-8">
        <Link
          href="/assessment"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Atrás
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-300 mt-4 mb-2">
          Competencias
        </h1>
        <p className="text-blue-400/70 text-sm md:text-base">
          Ordena por prioridad o preferencia en cada escenario
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-3xl mb-8 h-1 bg-blue-950/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-blue"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Scenario Content */}
      <div className="w-full max-w-3xl mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
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
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-100 mb-8">
              {scenario.scenario}
            </h2>

            {/* Reorderable List */}
            <div className="space-y-3">
              {displayOrder.map((optionId, index) => {
                const option = scenario.options.find((o) => o.id === optionId);
                if (!option) return null;

                return (
                  <motion.div
                    key={optionId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    draggable
                    onDragStart={() => {}}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const sourceIndex = parseInt(
                        e.dataTransfer?.getData('text/plain') || '-1'
                      );
                      if (sourceIndex >= 0) {
                        handleReorderItem(sourceIndex, index);
                      }
                    }}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', index.toString());
                    }}
                    className="group assessment-card p-4 cursor-move transition-all border-blue-500/20 hover:border-blue-500/40"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 group-hover:border-blue-500/50 transition-all">
                        <GripVertical className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-2xl font-bold text-blue-400">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-blue-100 font-semibold">
                          {option.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-blue-300 text-sm">
                💡 Arrastra los elementos para reorganizar tu orden de preferencia
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="w-full max-w-3xl flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentScenario === 0}
          className="p-3 rounded-full border border-blue-500/30 hover:border-blue-500/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-blue-400" />
        </button>

        <div className="text-center">
          <p className="text-blue-400/70 text-sm">
            Escenario {currentScenario + 1} de {COMPETENCY_SCENARIOS.length}
          </p>
        </div>

        <button
          onClick={handleNext}
          disabled={currentScenario >= COMPETENCY_SCENARIOS.length - 1}
          className="p-3 rounded-full bg-gradient-blue text-black hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
