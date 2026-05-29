import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AssessmentState, Phase, CardData } from './types';
import { PREFERENCE_CARDS } from './assessment-data';

interface AssessmentStore extends AssessmentState {
  // Phase navigation
  moveToPhase: (phase: Phase) => void;
  goToNextCard: () => void;
  
  // Card selections
  selectCard: (cardId: string, selected: boolean) => void;
  getSelectedCards: () => string[];
  
  // Refinement stage
  setRefinementRanking: (ranking: string[]) => void;
  addToRefinement: (cardId: string) => void;
  removeFromRefinement: (cardId: string) => void;
  
  // Reset
  resetAssessment: () => void;
}

const initialState: AssessmentState = {
  currentPhase: 'context1',
  cardSelections: {},
  refinementRanking: [],
  currentGroupIndex: 0,
  currentCardIndexInGroup: 0,
  transitionProgress: 0,
};

export const useAssessmentStore = create<AssessmentStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      moveToPhase: (phase: Phase) => set({ currentPhase: phase }),
      
      goToNextCard: () => {
        const state = get();
        const isLastCard = state.currentCardIndexInGroup >= 3;
        
        if (isLastCard) {
          // Determine next phase
          if (state.currentPhase === 'group1') {
            set({ currentPhase: 'transition2', currentCardIndexInGroup: 0 });
          } else if (state.currentPhase === 'group2') {
            set({ currentPhase: 'transition3', currentCardIndexInGroup: 0 });
          } else if (state.currentPhase === 'group3') {
            set({ currentPhase: 'refinement', currentCardIndexInGroup: 0 });
          }
        } else {
          set({ currentCardIndexInGroup: state.currentCardIndexInGroup + 1 });
        }
      },
      
      selectCard: (cardId: string, selected: boolean) => {
        const state = get();
        const newSelections = { ...state.cardSelections };
        newSelections[cardId] = selected;
        set({ cardSelections: newSelections });
      },
      
      getSelectedCards: () => {
        const state = get();
        return Object.entries(state.cardSelections)
          .filter(([_, selected]) => selected)
          .map(([cardId]) => cardId);
      },
      
      setRefinementRanking: (ranking: string[]) => {
        set({ refinementRanking: ranking });
      },
      
      addToRefinement: (cardId: string) => {
        const state = get();
        if (!state.refinementRanking.includes(cardId)) {
          set({ refinementRanking: [...state.refinementRanking, cardId] });
        }
      },
      
      removeFromRefinement: (cardId: string) => {
        const state = get();
        set({ refinementRanking: state.refinementRanking.filter(id => id !== cardId) });
      },
      
      resetAssessment: () => set(initialState),
    }),
    {
      name: 'assessment-store',
    }
  )
);

import type { Quadrant } from './hbdi-modules';
import { ACTIVITY_QUESTIONS, BEHAVIOR_QUESTIONS, COGNITIVE_QUESTIONS, emptyScores } from './hbdi-modules';

export interface HbdiAnswers {
  activitySelections: Record<string, string[]>;
  cognitiveSelections: Record<string, string[]>;
  behaviorRatings: Record<string, number>;
}

export interface HbdiResults {
  rawScores: Record<Quadrant, number>;
  percentages: Record<Quadrant, number>;
  dominant: Quadrant;
}

interface HbdiStore {
  hbdiAnswers: HbdiAnswers;
  setActivitySelections: (questionId: string, selections: string[]) => void;
  setCognitiveSelections: (questionId: string, selections: string[]) => void;
  setBehaviorRating: (questionId: string, rating: number) => void;
  resetHbdi: () => void;
  calculateHbdiResults: () => HbdiResults;
}

const initialHbdiAnswers: HbdiAnswers = {
  activitySelections: {},
  cognitiveSelections: {},
  behaviorRatings: {},
};

export const useHbdiAssessmentStore = create<HbdiStore>()(
  persist(
    (set, get) => ({
      hbdiAnswers: initialHbdiAnswers,

      setActivitySelections: (questionId: string, selections: string[]) => {
        const answers = get().hbdiAnswers;
        set({
          hbdiAnswers: {
            ...answers,
            activitySelections: { ...answers.activitySelections, [questionId]: selections },
          },
        });
      },

      setCognitiveSelections: (questionId: string, selections: string[]) => {
        const answers = get().hbdiAnswers;
        set({
          hbdiAnswers: {
            ...answers,
            cognitiveSelections: { ...answers.cognitiveSelections, [questionId]: selections },
          },
        });
      },

      setBehaviorRating: (questionId: string, rating: number) => {
        const answers = get().hbdiAnswers;
        set({
          hbdiAnswers: {
            ...answers,
            behaviorRatings: { ...answers.behaviorRatings, [questionId]: rating },
          },
        });
      },

      resetHbdi: () => set({ hbdiAnswers: initialHbdiAnswers }),

      calculateHbdiResults: () => {
        const answers = get().hbdiAnswers;
        const scores = emptyScores();

        ACTIVITY_QUESTIONS.forEach((question) => {
          const selectedIds = answers.activitySelections[question.id] || [];
          selectedIds.forEach((itemId) => {
            const item = question.items.find((candidate) => candidate.id === itemId);
            if (item) scores[item.quadrant] += 2;
          });
        });

        COGNITIVE_QUESTIONS.forEach((question) => {
          const selectedIds = answers.cognitiveSelections[question.id] || [];
          selectedIds.forEach((optionId) => {
            const option = question.options.find((candidate) => candidate.id === optionId);
            if (option) scores[option.quadrant] += question.type === 'single' ? 3 : 2;
          });
        });

        BEHAVIOR_QUESTIONS.forEach((question) => {
          const rating = answers.behaviorRatings[question.id] || 0;
          scores[question.quadrant] += rating;
        });

        const total = Object.values(scores).reduce((sum, value) => sum + value, 0) || 1;
        const percentages = emptyScores();
        (Object.keys(scores) as Quadrant[]).forEach((quadrant) => {
          percentages[quadrant] = Math.round((scores[quadrant] / total) * 100);
        });

        const dominant = (Object.keys(scores) as Quadrant[]).sort((a, b) => scores[b] - scores[a])[0];
        return { rawScores: scores, percentages, dominant };
      },
    }),
    { name: 'hbdi-assessment-store' }
  )
);
