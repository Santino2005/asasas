'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Brain, Check, ChevronLeft, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { ACTIVITY_QUESTIONS, BEHAVIOR_QUESTIONS, COGNITIVE_QUESTIONS, QUADRANTS } from '@/lib/hbdi-modules';
import { useHbdiAssessmentStore } from '@/lib/store';

type ModuleId = 0 | 1 | 2;
type Screen = 'menu' | 'module';

const moduleInfo = [
  {
    title: 'Módulo 1: Situaciones preferidas',
    subtitle: 'Escenarios breves con 4 caminos posibles. Elegí cuál te representa más en cada situación.',
    badge: 'Situaciones de elección rápida',
    cta: 'Iniciar módulo 1',
  },
  {
    title: 'Módulo 2: Enfoque cognitivo',
    subtitle: 'Preguntas de procesamiento mental. Aparecen de a una para evitar sobrecarga.',
    badge: 'Preguntas una por una',
    cta: 'Iniciar módulo 2',
  },
  {
    title: 'Módulo 3: Autoevaluación conductual',
    subtitle: 'Escala del 1 al 5 en 4 páginas de 5 afirmaciones cada una.',
    badge: 'Likert paginado',
    cta: 'Iniciar módulo 3',
  },
];

const behaviorPageSize = 5;

export default function AssessmentPage() {
  const router = useRouter();
  const store = useHbdiAssessmentStore();
  const [screen, setScreen] = useState<Screen>('menu');
  const [moduleIndex, setModuleIndex] = useState<ModuleId>(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const [cognitiveIndex, setCognitiveIndex] = useState(0);
  const [behaviorPage, setBehaviorPage] = useState(0);

  const completedModules = useMemo(() => [isActivityComplete(), isCognitiveComplete(), isBehaviorComplete()], [store.hbdiAnswers]);
  const allComplete = completedModules.every(Boolean);

  function toggleSelection(current: string[], id: string, limit: number) {
    if (current.includes(id)) return current.filter((item) => item !== id);
    if (current.length >= limit) return current;
    return [...current, id];
  }

  function isActivityComplete() {
    return ACTIVITY_QUESTIONS.every((question) => (store.hbdiAnswers.activitySelections[question.id] || []).length > 0);
  }

  function isCognitiveComplete() {
    return COGNITIVE_QUESTIONS.every((question) => {
      const selected = store.hbdiAnswers.cognitiveSelections[question.id] || [];
      if (question.type === 'multi') return selected.length === (question.maxSelections || 1);
      return selected.length > 0;
    });
  }

  function isBehaviorComplete() {
    return BEHAVIOR_QUESTIONS.every((question) => (store.hbdiAnswers.behaviorRatings[question.id] || 0) > 0);
  }

  function startModule(index: ModuleId) {
    setModuleIndex(index);
    setScreen('module');
    setActivityIndex(firstUnansweredActivity());
    setCognitiveIndex(firstUnansweredCognitive());
    setBehaviorPage(firstIncompleteBehaviorPage());
  }

  function firstUnansweredActivity() {
    const index = ACTIVITY_QUESTIONS.findIndex((question) => (store.hbdiAnswers.activitySelections[question.id] || []).length === 0);
    return index === -1 ? 0 : index;
  }

  function firstUnansweredCognitive() {
    const index = COGNITIVE_QUESTIONS.findIndex((question) => (store.hbdiAnswers.cognitiveSelections[question.id] || []).length === 0);
    return index === -1 ? 0 : index;
  }

  function firstIncompleteBehaviorPage() {
    const index = BEHAVIOR_QUESTIONS.findIndex((question) => (store.hbdiAnswers.behaviorRatings[question.id] || 0) === 0);
    return index === -1 ? 0 : Math.floor(index / behaviorPageSize);
  }

  function backToMenu() {
    setScreen('menu');
  }

  function renderMenu() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-black px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center text-purple-300 hover:text-purple-200">
              <ChevronLeft className="mr-2 h-5 w-5" /> Inicio
            </Link>
            <button onClick={store.resetHbdi} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/10">
              <RotateCcw className="h-4 w-4" /> Reiniciar
            </button>
          </div>

          <header className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
              <Brain className="h-4 w-4" /> Test de dominancia cerebral
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">Elegí por dónde empezar</h1>
            <p className="mx-auto max-w-3xl text-gray-400">
              Los módulos son independientes: podés arrancar por situaciones, preguntas cognitivas o Likert. El resultado aparece cuando completás los 3.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {moduleInfo.map((module, index) => (
              <button key={module.title} type="button" onClick={() => startModule(index as ModuleId)} className="assessment-card p-6 text-left hover:-translate-y-1">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">{module.badge}</span>
                  {completedModules[index] && <span className="rounded-full bg-green-400/20 px-3 py-1 text-xs text-green-200">Completo</span>}
                </div>
                <h2 className="mb-3 text-2xl font-bold text-white">{module.title}</h2>
                <p className="mb-6 text-sm text-gray-400">{module.subtitle}</p>
                <span className="inline-flex items-center gap-2 font-semibold text-purple-200">
                  {completedModules[index] ? 'Revisar módulo' : module.cta} <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="mb-4 text-gray-300">Progreso general: {completedModules.filter(Boolean).length}/3 módulos completos</p>
            <div className="mx-auto mb-6 h-2 max-w-xl overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all" style={{ width: `${(completedModules.filter(Boolean).length / 3) * 100}%` }} />
            </div>
            <button
              type="button"
              disabled={!allComplete}
              onClick={() => router.push('/results')}
              className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-7 py-3 font-semibold text-white transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
            >
              Ver resultado final <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderActivities() {
    const question = ACTIVITY_QUESTIONS[activityIndex];
    const selected = store.hbdiAnswers.activitySelections[question.id] || [];
    const progress = ((activityIndex + 1) / ACTIVITY_QUESTIONS.length) * 100;

    return (
      <section className="assessment-card p-6 md:p-8">
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm text-gray-400">
            <span>Escenario {activityIndex + 1}/{ACTIVITY_QUESTIONS.length}</span>
            <span>Elegí 1 de 4</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-purple-300">Situación</p>
        <h3 className="mb-3 text-2xl font-bold text-white">{question.context}</h3>
        <p className="mb-6 text-gray-300">{question.prompt}</p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {question.items.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => store.setActivitySelections(question.id, [item.id])}
                className={`rounded-xl border p-5 text-left transition-all ${isSelected ? 'border-purple-400 bg-purple-500/20 text-white' : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'}`}
              >
                <span className="mb-2 flex items-start gap-3">
                  <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isSelected ? 'bg-purple-400 text-black' : 'bg-white/10'}`}>
                    {isSelected && <Check className="h-3 w-3" />}
                  </span>
                  <span className="font-medium">{item.text}</span>
                </span>
                <span className="ml-8 text-xs text-gray-500">Integra: {item.sourceWords}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between gap-3">
          <button type="button" onClick={() => setActivityIndex(Math.max(0, activityIndex - 1))} disabled={activityIndex === 0} className="rounded-lg border border-white/10 px-5 py-3 text-gray-300 disabled:opacity-30">
            Anterior
          </button>
          <button
            type="button"
            disabled={selected.length === 0}
            onClick={() => (activityIndex === ACTIVITY_QUESTIONS.length - 1 ? backToMenu() : setActivityIndex(activityIndex + 1))}
            className="rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 font-semibold text-white disabled:opacity-40"
          >
            {activityIndex === ACTIVITY_QUESTIONS.length - 1 ? 'Finalizar módulo' : 'Siguiente'}
          </button>
        </div>
      </section>
    );
  }

  function renderCognitive() {
    const question = COGNITIVE_QUESTIONS[cognitiveIndex];
    const selected = store.hbdiAnswers.cognitiveSelections[question.id] || [];
    const limit = question.type === 'single' ? 1 : question.maxSelections || 1;
    const progress = ((cognitiveIndex + 1) / COGNITIVE_QUESTIONS.length) * 100;
    const canMove = question.type === 'single' ? selected.length > 0 : selected.length === limit;

    return (
      <section className="assessment-card p-6 md:p-8">
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm text-gray-400">
            <span>Pregunta {cognitiveIndex + 1}/{COGNITIVE_QUESTIONS.length}</span>
            <span>{question.type === 'single' ? 'Elegí una' : `Elegí ${limit}: ${selected.length}/${limit}`}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h3 className="mb-6 text-2xl font-bold text-white">{question.prompt}</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {question.options.map((option) => {
            const isSelected = selected.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  const next = question.type === 'single' ? [option.id] : toggleSelection(selected, option.id, limit);
                  store.setCognitiveSelections(question.id, next);
                }}
                className={`rounded-xl border p-5 text-left transition-all ${isSelected ? 'border-blue-400 bg-blue-500/20 text-white' : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'}`}
              >
                <span className="flex items-start gap-3">
                  <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isSelected ? 'bg-blue-400 text-black' : 'bg-white/10'}`}>
                    {isSelected && <Check className="h-3 w-3" />}
                  </span>
                  <span>{option.text}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between gap-3">
          <button type="button" onClick={() => setCognitiveIndex(Math.max(0, cognitiveIndex - 1))} disabled={cognitiveIndex === 0} className="rounded-lg border border-white/10 px-5 py-3 text-gray-300 disabled:opacity-30">
            Anterior
          </button>
          <button
            type="button"
            disabled={!canMove}
            onClick={() => (cognitiveIndex === COGNITIVE_QUESTIONS.length - 1 ? backToMenu() : setCognitiveIndex(cognitiveIndex + 1))}
            className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 font-semibold text-white disabled:opacity-40"
          >
            {cognitiveIndex === COGNITIVE_QUESTIONS.length - 1 ? 'Finalizar módulo' : 'Siguiente'}
          </button>
        </div>
      </section>
    );
  }

  function renderBehaviors() {
    const start = behaviorPage * behaviorPageSize;
    const questions = BEHAVIOR_QUESTIONS.slice(start, start + behaviorPageSize);
    const totalPages = Math.ceil(BEHAVIOR_QUESTIONS.length / behaviorPageSize);
    const pageComplete = questions.every((question) => (store.hbdiAnswers.behaviorRatings[question.id] || 0) > 0);
    const progress = ((behaviorPage + 1) / totalPages) * 100;

    return (
      <section className="assessment-card p-6 md:p-8">
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm text-gray-400">
            <span>Página {behaviorPage + 1}/{totalPages}</span>
            <span>5 afirmaciones por página</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white">¿Cuánto te representa cada afirmación?</h3>
        <p className="mb-6 text-sm text-gray-400">1 = nada parecido a mí · 5 = muy parecido a mí</p>

        <div className="space-y-4">
          {questions.map((question) => {
            const value = store.hbdiAnswers.behaviorRatings[question.id] || 0;
            return (
              <div key={question.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <p className="text-gray-100">{question.text}</p>
                  <span className="text-xs text-gray-500">{QUADRANTS[question.quadrant].label}</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => store.setBehaviorRating(question.id, rating)}
                      className={`rounded-lg py-2 text-sm font-semibold transition-all ${value === rating ? 'bg-green-400 text-black' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between gap-3">
          <button type="button" onClick={() => setBehaviorPage(Math.max(0, behaviorPage - 1))} disabled={behaviorPage === 0} className="rounded-lg border border-white/10 px-5 py-3 text-gray-300 disabled:opacity-30">
            Anterior
          </button>
          <button
            type="button"
            disabled={!pageComplete}
            onClick={() => (behaviorPage === totalPages - 1 ? backToMenu() : setBehaviorPage(behaviorPage + 1))}
            className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-3 font-semibold text-white disabled:opacity-40"
          >
            {behaviorPage === totalPages - 1 ? 'Finalizar módulo' : 'Siguiente'}
          </button>
        </div>
      </section>
    );
  }

  if (screen === 'menu') return renderMenu();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-black px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <button onClick={backToMenu} className="inline-flex items-center text-purple-300 hover:text-purple-200">
            <ChevronLeft className="mr-2 h-5 w-5" /> Módulos
          </button>
          <button onClick={store.resetHbdi} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/10">
            <RotateCcw className="h-4 w-4" /> Reiniciar
          </button>
        </div>

        <header className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
            <Brain className="h-4 w-4" /> {moduleInfo[moduleIndex].badge}
          </div>
          <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">{moduleInfo[moduleIndex].title}</h1>
          <p className="mx-auto max-w-3xl text-gray-400">{moduleInfo[moduleIndex].subtitle}</p>
        </header>

        <motion.div key={`${moduleIndex}-${activityIndex}-${cognitiveIndex}-${behaviorPage}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          {moduleIndex === 0 && renderActivities()}
          {moduleIndex === 1 && renderCognitive()}
          {moduleIndex === 2 && renderBehaviors()}
        </motion.div>
      </div>
    </div>
  );
}
